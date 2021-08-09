<template>
  <Layout class-prefix="layout">
    <NumberPad/>
    <Types/>
    <FormInput/>
    <Tags/>
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

}

</script>

<style lang="scss" scoped>
::v-deep .layout-content{
  display: flex;
  flex-direction: column-reverse;
}


</style>