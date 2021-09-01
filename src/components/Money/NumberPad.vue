<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="showDatetimePicker = true">
        {{createAt}}
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="remove">
        <Icon name="delete"/>
      </button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">.</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="ok" class="ok">确定</button>
    </div>
    <van-popup v-model="showDatetimePicker" round position="bottom">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="showDatetimePicker = false"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';
import dayjs from 'dayjs';

@Component({
  components: {Icon}
})
export default class NumberPad extends Vue {
  @Prop(Number) readonly value !: number;
  output = this.value.toString();
  createAt = dayjs().format('YYYY/MM/DD');

  showDatetimePicker = false;
  minDate =  new Date(2020, 0, 1);
  maxDate = new Date(2025, 10, 1);
  currentDate = new Date();

  inputContent(event:MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent!;
    if(this.output.length === 16) { return; }
    if(this.output === '0') {
      if('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if(this.output.indexOf('.') >= 0 && input === '.') { return; }
    this.output += input;
  }

  remove() {
    if(this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  onConfirm(value:string) {
    this.createAt = dayjs(value).format('YYYY/MM/DD');
    this.showDatetimePicker = false;
  }

  ok() {
    const number = parseFloat(this.output);
    this.$emit('update:value', number);
    this.$emit('update',this.createAt);
    this.$emit('submit', number);
    if(!this.$store.state.createRecordError) {
      this.output = '0';
      this.createAt = dayjs().format('YYYY/MM/DD');
      this.currentDate = new Date();
    }
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    font-size: 30px;
    font-family: Consolas, monospace;
    padding: 3px 16px;
    text-align: right;
    border-top: 1px solid rgba(187, 187, 187, 0.7);
  }
  @media (max-height: 600px) {
    .output {
      font-size: 25px;
    }
  }

  .buttons {
    @extend %clearFix;
    border-top: 1px solid rgba(187, 187, 187, 0.7);

    > button {
      width: 25%;
      font-size: 20px;
      padding: 10px 0;
      line-height: 30px;
      float: left;
      background: transparent;
      border: none;

      &.ok {
        float: right;
      }

      &.zero {
        width: 25*2%;
      }

      &:nth-child(1), &:nth-child(2), &:nth-child(3),
      &:nth-child(4), &:nth-child(5), &:nth-child(6),
      &:nth-child(7), &:nth-child(8), &:nth-child(9),
      &:nth-child(10), &:nth-child(11), &:nth-child(12) {
        border-bottom: 1px solid rgba(187, 187, 187, 0.7);
      }

      &:nth-child(1), &:nth-child(2), &:nth-child(3),
      &:nth-child(5), &:nth-child(6), &:nth-child(7),
      &:nth-child(9), &:nth-child(10), &:nth-child(11),
      &:nth-child(13), &:nth-child(14) {
        border-right: 1px solid rgba(187, 187, 187, 0.7);
      }
      &:nth-child(15) {
        background: #333333;
        color: white;
      }
      &:nth-child(4), &:nth-child(12),&:nth-child(15) {
        font-size: 16px;
      }
      &:nth-child(4) {
        background: #f6f6f6;
      }
    }
    @media (max-height: 600px) {
      > button {
        line-height: 20px;
      }
    }
  }
}
</style>