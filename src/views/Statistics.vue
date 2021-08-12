<template>
  <Layout>
    <nav class="title">账单详情</nav>
    <AccountInfo :year.sync="year"
                 :month.sync="month"
                 :totalExpend="monthTotalExpend"
                 :totalIncome="monthTotalIncome"/>
    <div class="tabs-wrapper">
      <Tabs :data-source="accountTypeList" :value.sync="type"
            class-prefix="type"/>
    </div>
    <div class="items">
      <ol v-show="type==='details' && groupedRecords.length > 0" class="records">
        <li v-for="(group, index) in groupedRecords" :key="index">
          <div class="topBar">
            {{ beautify(group.title) }}
            <span>支出：{{ group.totalExpend }} 收入：{{ group.totalIncome }}</span>
          </div>
          <ol>
            <li class="record" v-for="item in group.items" :key="item.id">
              <span>{{ item.tag.text }}</span>
              <span class="notes">{{ item.notes }}</span>
              <span class="amount">{{ item.type }}{{ item.amount }}</span>
            </li>
          </ol>
        </li>
      </ol>
      <div class="charts" v-show="type === 'chart' && groupedRecords.length > 0"></div>
      <div class="empty" v-show="groupedRecords.length === 0">
        本月还没有账单记录哦~
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';

import AccountInfo from '@/components/AccountInfo.vue';
import Tabs from '@/components/Tabs.vue';
import accountTypeList from '@/constants/accountTypeList';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {AccountInfo, Layout, Tabs}
})
export default class Statistics extends Vue {
  accountTypeList = accountTypeList;
  type = 'details';
  year = dayjs().year();
  month = dayjs().month() + 1;
  monthTotalExpend = 0.00;
  monthTotalIncome = 0.00;

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
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  background: #f6f6f6;
  font-size: 24px;
  font-family: 'haibao', $font-kai;
  font-weight: bold;
  text-align: center;
  padding: 5px 0;
}

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
.items{
  flex-grow: 1;
  overflow: auto;

  .topBar {
    @extend %item;
    font-weight: bold;
  }

  .record {
    @extend %item;
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