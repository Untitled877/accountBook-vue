<template>
  <div class="info-wrapper">
    <div class="dateSelector" @click="show = true">
      <span class="textUp">2021年</span>
      <span class="textDown">8月&nbsp;<Icon name="down"/></span>
    </div>
    <div class="expend">
      <span class="textUp">支出（元）</span>
      <span class="textDown">0.00</span>
    </div>
    <div class="income">
      <span class="textUp">收入（元）</span>
      <span class="textDown">0.00</span>
    </div>
    <van-popup v-model="show">
      <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          title="选择年月"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({
  components: { Icon }
})
export default class AccountInfo extends Vue {
  show = false;
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 10, 1);
  currentDate = new Date();

  formatter(type:string, val:number) {
    if (type === 'year') {
      return `${val}年`;
    } else if (type === 'month') {
      return `${val}月`;
    }
    return val;
  }
}

</script>

<style lang="scss" scoped>
.info-wrapper {
  background: #333333;
  color:white;
  display: flex;
  justify-content: space-evenly;
  padding: 25px 0;
  >.dateSelector {
    display: flex;
    flex-direction: column;
    border-right: 1px solid white;
    padding-right: 30px;
  }
  >.expend, .income{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .textUp{
    font-size: 14px;
  }
  .textDown {
    font-size: 20px;
  }
}
</style>