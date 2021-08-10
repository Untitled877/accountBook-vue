<template>
  <Layout>
    <nav class="title">账单详情</nav>
    <AccountInfo/>

    <div class="tabs-wrapper">
      <Tabs/>
    </div>
    <ol v-show="hasRecordList === true" class="records">
      <li>
        <div class="topBar">
          今天
          <span>支出：0.00 收入：0.00</span>
        </div>
        <ol>
          <li class="record">
            <span>餐饮</span>
            <span class="notes">外卖</span>
            <span class="amount">-20</span>
          </li>
        </ol>
      </li>

    </ol>
    <div class="empty" v-show="hasRecordList === false">
      本月还没有账单记录哦~
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';

import AccountInfo from '@/components/AccountInfo.vue';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {AccountInfo, Layout, Tabs}
})
export default class Statistics extends Vue {
  hasRecordList = true;

}

</script>

<style lang="scss" scoped>
nav{
  background: #f6f6f6;
  font-size: 24px;
  font-family: 'haibao';
  font-weight:bold;
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

</style>