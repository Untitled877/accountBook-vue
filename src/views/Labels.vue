<template>
  <Layout>
    <nav>
      <p class="title">标签管理</p>
      <Tabs :data-source="recordTypeList" :value.sync="type"
       class-prefix="type"/>
    </nav>
    <div class="middleContent">
      <div class="labels">
        <router-link
            class="label"
            v-for="item in tagList"
            :key="item.id"
            :to="`/labels/edit/${type}/${item.id}`">
          <span>{{ item.text }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createLabel-wrapper">
        <Button class="createLabel" @click="createTag(type)">添加标签</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import Tabs from '@/components/Tabs.vue';
import Icon from '@/components/Icon.vue';
import Button from '@/components/Button.vue';
import recordTypeList from '@/constants/recordTypeList';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/tagHelper';

@Component({
  components: {Button, Icon, Layout, Tabs}
})
export default class Tags extends mixins(TagHelper) {
  recordTypeList = recordTypeList;
  type = '-';
  get tagList() {
    return this.type === '-' ? this.expend_tagList : this.income_tagList;
  }

  get expend_tagList() {
    return this.$store.state.expend_tagList;
  }

  get income_tagList() {
    return this.$store.state.income_tagList;
  }

  beforeCreate() {
    this.$store.commit('fetchTags');
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.middleContent{
    flex-grow: 1;
    overflow: auto;
  }

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