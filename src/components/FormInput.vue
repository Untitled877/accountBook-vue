<template>
  <div>
    <label class="formItem">
      <span class="name">{{labelName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class FormInput extends Vue {
  @Prop({default: ''})  readonly value !: string;
  @Prop({require: true}) labelName !: string;
  @Prop() placeholder ?: string;

  onValueChanged(value:string) {
    this.$emit('update:value', value);
  }
}

</script>

<style lang="scss" scoped>
.formItem {
  font-size: 16px;
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