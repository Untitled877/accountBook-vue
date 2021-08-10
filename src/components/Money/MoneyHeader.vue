<template>
<div class="header">
  记一笔账
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
  font-size: 24px;
  font-family: 'haibao';
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  padding: 5px 0;
}
</style>