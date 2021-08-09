<template>
  <div class="numberPad">

    <div class="output">0</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="getCalendar">
        <Icon name="calendar"/>&nbsp;今天
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon}
})
export default class NumberPad extends Vue {
  inputContent() {
    window.alert('click');
  }

  getCalendar() {
    window.alert('click');
  }

  remove() {
    window.alert('click');
  }

  clear() {
    window.alert('click');
  }

  ok() {
    window.alert('click');
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

  .buttons {
    @extend %clearFix;
    border-top: 1px solid rgba(187, 187, 187, 0.7);

    > button {
      width: 25%;
      font-size: 20px;
      padding: 10px 0;
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
    }
  }
}
</style>