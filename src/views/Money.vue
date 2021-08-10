<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"/>
    <Types :value.sync="record.type"/>
    <FormInput label-name="备注："
               placeholder="在这里输入备注~"
               :value.sync="record.notes"/>
    <Tags class="tagDiv" type="record.type"/>
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
  record: RecordItem = {
    tag: {id: '0', name: 'default', text:' '},
    notes:' ',
    type: '-',
    amount: 0
  };


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