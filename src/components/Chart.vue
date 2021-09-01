<template>
  <div class="wrapper">
    <ul class="tabs">
      <li v-for="c in categoryList"
          :key="c"
          :class="liClass(c)"
          @click="select(c)">
        {{ categoryMap[c] }}
      </li>
    </ul>
    <div class="chartContainer" ref="container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {EChartOption, ECharts} from 'echarts';

@Component
export default class Chart extends Vue {
  @Prop() options ?: EChartOption;
  @Prop(String) readonly value !: string;
  @Prop(Number) readonly componentKey !: number;

  categoryMap = {'-':'支出', '+':'收入'};
  categoryList = ['+', '-'];
  chart ?: ECharts;
  liClass(item: string) {
    return {
      selected: item === this.value
    };
  }

  select(item:string) {
    this.$emit('update:value', item);
  }

  mounted(){
    if(this.options === undefined) {
      return console.log('options 为空');
    }
    this.chart = echarts.init(this.$refs.container as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('componentKey')
  onKeyChange() {
    if(this.options === undefined) {
      return console.log('options 为空');
    }
    this.chart!.setOption(this.options);
  }
}

</script>

<style lang="scss" scoped>
.wrapper {
  > .chartContainer {
    height: 400px;
  }

  > .tabs {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 20px;
    margin-top: 10px;

    > li {
      background: white;
      font-size: 12px;
      padding: 3px;
      display: flex;
      justify-content: center;
      color: #333;
      border: 1px solid #999;

      &.selected {
        background: #999;
        color: white;
      }
    }
  }
}
</style>