<template>
  <Layout :style="{height:h+'px'}">
    <AccountInfo :year.sync="year"
                 :month.sync="month"
                 :totalExpend="monthTotalExpend"
                 :totalIncome="monthTotalIncome"/>
    <div class="tabs-wrapper">
      <Tabs :data-source="accountTypeList" :value.sync="type"
            class-prefix="type"/>
    </div>
    <div  class="items">
      <div v-if="type==='details'">
        <ol class="records">
          <li v-for="(group, index) in groupedRecords" :key="index">
            <div class="topBar">
              {{ beautify(group.title) }}
              <span>支出：{{ group.totalExpend }} 收入：{{ group.totalIncome }}</span>
            </div>
            <ol>
              <li class="record" v-for="item in group.items" :key="item.id">
                <span class="tagName">{{ item.tag.text }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span class="amount">{{ item.type }}{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
        <div class="empty" v-show="groupedRecords.length === 0">
          本月还没有账单记录哦~
        </div>
      </div>
      <div class="charts" v-else>
        <Chart :componentKey="componentKey" :options="chartOptions" :value.sync="category"/>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';

import AccountInfo from '@/components/AccountInfo.vue';
import Tabs from '@/components/Tabs.vue';
import accountTypeList from '@/constants/accountTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import Chart from '@/components/Chart.vue';

@Component({
  components: {Chart, AccountInfo, Layout, Tabs}
})
export default class Statistics extends Vue {
  h = document.documentElement.clientHeight;
  accountTypeList = accountTypeList;
  type = 'details';
  year = dayjs().year();
  month = dayjs().month() + 1;
  monthTotalExpend = 0.00;
  monthTotalIncome = 0.00;
  category = '-';
  componentKey = 0;

  forceRerender() {
    this.componentKey += 1;
  }

  get changeDate() {
    const {category, type, year, month} = this;
    return {
      category,
      type,
      year,
      month,
    };
  }

  @Watch('changeDate')
  update() {
    this.forceRerender();
  }

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  get groupedRecords() {
    const {recordList} = this;
    this.monthTotalExpend = 0.00;
    this.monthTotalIncome = 0.00;
    const newList = clone(recordList)
        .filter(r => parseInt(r.createAt.split('/')[0]) === this.year
            && parseInt(r.createAt.split('/')[1]) === this.month)
        .sort((a, b) => parseInt(b.createAt.split('/')[2])
            - parseInt(a.createAt.split('/')[2]));
    if (newList.length === 0) {
      return [];
    }
    type Result = {
      title: string,
      totalExpend: number,
      totalIncome: number,
      items: RecordItem[]
    }[];
    const result: Result = [{title: newList[0].createAt, totalExpend: 0.00, totalIncome: 0.00, items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (last.title.split('/')[2] === current.createAt.split('/')[2]) {
        last.items.push(current);
      } else {
        result.push({title: current.createAt, totalExpend: 0.00, totalIncome: 0.00, items: [current]});
      }
    }
    result.map(group => {
      group.totalExpend = group.items.reduce((sum, item) => {
        return sum + (item.type === '-' ? item.amount : 0);
      }, 0);
      group.totalIncome = group.items.reduce((sum, item) => {
        return sum + (item.type === '+' ? item.amount : 0);
      }, 0);
    });

    for (let i = 0; i < result.length; i++) {
      this.monthTotalExpend += (result as Result)[i].totalExpend;
      this.monthTotalIncome += (result as Result)[i].totalIncome;
    }

    return result;
  }

  beautify(string: string) {
    const year = string.split('/')[0];
    const month = string.split('/')[1];
    const day = string.split('/')[2];
    const today = dayjs().format('YYYY/MM/DD');
    if (string === today) {
      return '今天';
    } else if (year === today.split('/')[0]) {
      return month + '/' + day;
    } else {
      return string;
    }
  }

  get keyValueList() {
    const {recordList} = this;
    const hash: { [K: string]: number } = {};
    const newList = clone(recordList);
    const classifiedList = newList.filter(r => parseInt(r.createAt.split('/')[0]) === this.year
        && parseInt(r.createAt.split('/')[1]) === this.month && r.type === this.category);
    classifiedList.forEach(r => {
      const key = r.tag.text;
      if (key in hash) {
        hash[key] += r.amount;
      } else {
        hash[key] = r.amount;
      }
    });
    return hash;
  }

  get chartOptions() {
    const keys = Object.keys(this.keyValueList);
    const values = Object.values(this.keyValueList);
    return {
      color: '#999',
      grid: {
        top: 20,
        bottom: 45
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisLabel: {
          interval: 0,
          rotate: 22
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: values,
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
      }],
    };
  }

  @Watch('type')
  onTypeChange() {
    this.keyValueList;
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.tabs-wrapper {
  margin: 10px 0;
}

%item {
  padding: 5px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(187, 187, 187, 0.7);
}

.items {
  flex-grow: 1;
  overflow: auto;

  .topBar {
    @extend %item;
    font-weight: bold;
  }

  .record {
    @extend %item;
  }

  .tagName {
    white-space: nowrap;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }

  .empty {
    text-align: center;
    font-size: 18px;
    margin-top: 40px;
  }
}


</style>