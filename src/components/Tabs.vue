<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs'] : classPrefix}">
    <li v-for="item in dataSource"
        :key="item.value"
        class="tabs-item"
        :class="liClass(item)"
        @click="select(item)">
      {{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = { text:string, value:string }

@Component
export default class Tabs extends Vue {
  @Prop({required:true, type:Array}) dataSource !: DataSourceItem[];
  @Prop(String) readonly value !: string;
  @Prop(String) classPrefix ?: string;

  liClass(item: DataSourceItem) {
    return {
      [this.classPrefix + '-tabs-item']:this.classPrefix,
      selected: item.value === this.value
    };
  }

  select(item:DataSourceItem) {
    this.$emit('update:value', item.value);
  }
}

</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  text-align: center;
  justify-content: center;

  > li {
    background: white;
    font-size: 16px;
    color: #333333;
    display: flex;
    padding: 2px 0;
    width: 130px;
    justify-content: center;
    border: 1px solid rgba(187, 187, 187, 0.7);
    border-radius: 2px;

    &.selected {
      background: #333;
      color: white;
    }
  }
}
</style>