<template>
  <ul class="types">
    <li :class="value === '-' && 'selected'"
    @click="selectType('-')">支出</li>
    <li :class="value === '+' && 'selected'"
    @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop(String) readonly value !: string;

  selectType(type:string){
    if(type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}

</script>

<style lang="scss" scoped>
.types {
  display: flex;
  text-align: center;
  font-size: 20px;
  > li {
    width: 50%;
    padding:10px;
    border-top: 1px solid rgba(187, 187, 187, 0.7);
    justify-content: center;
    align-items: center;
    &.selected {
      background: #DCDCDC;
    }
  }
}
</style>