<template>
  <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <slot/>
    <BottomNav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import BottomNav from '@/components/BottomNav.vue';

@Component({
  components: {BottomNav}
})
export default class Layout extends Vue {
  @Prop(String) classPrefix!: string;
}

</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>