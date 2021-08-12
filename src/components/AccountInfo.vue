<template>
  <div class="info-wrapper">
    <div class="dateSelector" @click="show = true">
      <span class="textUp">{{year}}年</span>
      <span class="textDown">{{month}}月&nbsp;<Icon name="down"/></span>
    </div>
    <div class="expend">
      <span class="textUp">支出（元）</span>
      <span class="textDown">{{ totalExpend }}</span>
    </div>
    <div class="income">
      <span class="textUp">收入（元）</span>
      <span class="textDown">{{ totalIncome }}</span>
    </div>
    <van-popup v-model="show">
      <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onConfirm"
          @cancel="show = false"
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
  components: { Icon }
})
export default class AccountInfo extends Vue {
  @Prop({required:true, type: Number}) year !:number;
  @Prop({required:true, type: Number}) month !:number;
  @Prop({required:true, type:Number}) totalExpend!: number;
  @Prop({required:true, type:Number}) totalIncome!:number;
  show = false;
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 10, 1);
  currentDate = new Date();

  onConfirm(value:string) {
    this.show = false;
    let newYear = dayjs(value).year();
    let newMonth = dayjs(value).month()+1;
    this.$emit('update:year', newYear);
    this.$emit('update:month', newMonth);
    this.$store.commit('fetchRecords');
  }

}

</script>

<style lang="scss" scoped>
.info-wrapper {
  background: #333333;
  color:white;
  display: flex;
  padding: 25px 0;
  >.dateSelector {
    display: flex;
    flex-direction: column;
    border-right: 1px solid white;
    width: 33.3333%;
    text-align: center;

  }
  >.expend, .income{
    display: flex;
    flex-direction: column;
    text-align: center;
    width: 33.3333%;
  }
  .textUp{
    font-size: 14px;
  }
  .textDown {
    font-size: 20px;
  }
}
</style>