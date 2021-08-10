<template>
  <Layout>
    <nav>
      <p class="title">标签管理</p>
      <Tabs/>
    </nav>
    <div class="labels">
      <router-link
          class="label"
          v-for="item in tagNames"
          :key="item.id"
          :to="`/labels/edit/${item.id}`">
        <span>{{ item.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createLabel-wrapper">
      <Button class="createLabel">添加标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import Tabs from '@/components/Tabs.vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Icon, Layout, Tabs}
})
export default class Tags extends Vue {
  tagNames = [
    {
      id: 1,
      name: '餐饮'
    },
    {
      id: 2,
      name: '娱乐'
    },
    {
      id: 3,
      name: '住房'
    },
    {
      id: 4,
      name: '购物'
    },
    {
      id: 5,
      name: '服装'
    },
  ];
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

nav {
  background: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 10px;

  > .title {
    font-size: 24px;
    font-family: 'haibao', $font-kai;
    font-weight: bold;
    margin: 5px 0;
  }
}

.labels {
  background: white;
  font-size: 16px;

  > .label {
    padding-left: 16px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(187, 187, 187, 0.7);

    svg {
      width: 18px;
      height: 18px;
      margin-right: 16px;
    }
  }
}

.createLabel-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>