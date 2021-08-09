<template>
  <Layout>
    <nav>
      <Icon name="left" class="leftIcon"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </nav>
    <div class="form-wrapper">
      <FormInput></FormInput>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import FormInput from '@/components/FormInput.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormInput, Icon, Layout}
})
export default class EditTag extends Vue {

}

</script>

<style lang="scss" scoped>
nav {
  background: #f6f6f6;
  font-size: 24px;
  font-family: 'haibao';
  text-align: center;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  svg {
    width: 24px;
    height: 24px;
  }
  .rightIcon{
    width: 24px;
    height: 24px;
  }
}
.form-wrapper ::v-deep label {
  border: none;
  border-bottom: 1px solid rgba(187, 187, 187, 0.7);
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>