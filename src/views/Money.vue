<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"
               @update="getDate"
               @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <FormInput label-name="备注："
               placeholder="在这里输入备注~"
               :value.sync="record.notes"/>
    <Tags class="tagDiv" :type="record.type"
          @update:value="record.tag = $event"/>
    <MoneyHeader/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import FormInput from '@/components/FormInput.vue';
import MoneyHeader from '@/components/Money/MoneyHeader.vue';
import Tags from '@/components/Money/Tags.vue';

@Component({
  components: {Tags, MoneyHeader, FormInput, Types, NumberPad, Layout}
})
export default class Money extends Vue {
  record:RecordItem = {
    tag: {id:'', name:'', text:''},
    notes: '',
    type: '-',
    amount: 0,
    createAt: '',
  }

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
    if(!this.selectedTag.text) {
      return window.alert('请至少选择一个标签！');
    } else if(this.record.amount === 0) {
      return window.alert('金额不能为0！');
    }
    this.$store.commit('createRecord', this.record);
    if(!this.$store.state.createRecordError) {
      this.$store.commit('resetSelectedTag');
      this.record.notes = '';
    }
  }
  getDate(value:string){
    this.record.createAt = value;
  }
}

</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;

  .tagDiv {
    flex-grow: 1;
  }
}
</style>