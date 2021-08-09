<template>
  <Layout>
    标签页
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
@Component({
  components: {Layout}
})
export default class Tags extends Vue {

}

</script>

<style lang="scss" scoped>

</style>