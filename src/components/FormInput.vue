<template>
<div>
  <label class="formItem">
    <span class="name">备注：</span>
    <input type="text" placeholder="在这里输入备注~">
  </label>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class FormInput extends Vue {

}

</script>

<style lang="scss" scoped>
.formItem {
  font-size: 20px;
  padding-left: 16px;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid rgba(187, 187, 187, 0.7);
  .name {
    padding-right: 16px;
  }
  input {
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>