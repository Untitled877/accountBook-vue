<template>
<div class="header">
  <p>记一笔帐</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class MoneyHeader extends Vue {

}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.header{
  font-size: 30px;
  font-family: 'haibao';
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  background: #f6f6f6;
}
</style>