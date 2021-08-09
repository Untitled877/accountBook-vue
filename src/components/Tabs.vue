<template>
  <ul class="tabs">
    <li class="tabs-item selected">支出</li>
    <li class="tabs-item">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Tabs extends Vue {

}

</script>

<style lang="scss" scoped>
.tabs{
  display: flex;
  text-align: center;
  justify-content: center;
  > li {
    background: white;
    font-size: 16px;
    color: #333333;
    display: flex;
    padding: 2px 50px;
    border: 1px solid rgba(187, 187, 187, 0.7);
    border-radius: 2px;
    &.selected {
      background: #333;
      color: white;
    }
  }
}
</style>