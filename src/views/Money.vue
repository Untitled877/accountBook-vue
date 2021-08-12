<template>
  <Layout>
    <div class="header">
      <p class="title">记一笔账</p>
      <Tabs :data-source="recordTypeList" :value.sync="record.type"
            class-prefix="type"/>
    </div>
    <div class="middleContent">
      <NumberPad :value.sync="record.amount"
                 @update="getDate"
                 @submit="saveRecord"/>
      <FormInput label-name="备注："
                 placeholder="在这里输入备注~"
                 :value.sync="record.notes"/>
      <Tags class="tagDiv" :type="record.type"
            @update:value="record.tag = $event"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormInput from '@/components/FormInput.vue';
import Tags from '@/components/Money/Tags.vue';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';

@Component({
  components: {Tags, FormInput, Tabs, NumberPad, Layout}
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  record: RecordItem = {
    tag: {id: '', name: '', text: ''},
    notes: '',
    type: '-',
    amount: 0,
    createAt: '',
  };

  get selectedTag() {
    return this.$store.state.selectedTag;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  saveRecord() {
    if (!this.selectedTag.text) {
      return window.alert('请至少选择一个标签！');
    } else if (this.record.amount === 0) {
      return window.alert('金额不能为0！');
    }
    this.$store.commit('createRecord', this.record);
    if (!this.$store.state.createRecordError) {
      this.$store.commit('resetSelectedTag');
      this.record.notes = '';
    }
  }

  getDate(value: string) {
    this.record.createAt = value;
  }
}

</script>

<style lang="scss" scoped>

@import "~@/assets/style/helper.scss";

.header {
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

.middleContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;

  .tagDiv {
    flex-grow: 1;
  }
}


</style>