<template>
  <Layout :style="{height:h+'px'}">
    <div class="middleContent">
      <nav>
        <Icon name="left" class="leftIcon" @click="goBack"/>
        <span class="title">编辑标签</span>
        <span class="rightIcon"></span>
      </nav>
      <div class="form-wrapper">
        <FormInput :value="currentTag.text"
                   @update:value="update"
                   label-name="标签名："
                   placeholder="最好不要超过四个字哦~"/>
      </div>
      <div class="button-wrapper">
        <Button @click="remove">删除标签</Button>
      </div>
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
  h = document.documentElement.clientHeight;
  get currentTag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    const type = this.$route.params.type;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', {type: type, id: id});
    if (!this.currentTag) {
      this.$router.replace('/404');
    }
  }

  update(text: string) {
    if (this.currentTag) {
      this.$store.commit('updateTag',
          {type: this.$route.params.type, id: this.currentTag.id, text: text});
    }
  }

  remove() {
    if (this.currentTag) {
      if(window.confirm('确定删除该标签吗？')) {
        this.$store.commit('removeTag',
            {id: this.currentTag.id, type: this.$route.params.type});
      }
    }
  }

  goBack() {
    this.$router.back();
  }
}

</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.middleContent {
  flex-grow: 1;
  overflow: auto;
}

nav {
  background: #f6f6f6;
  font-size: 24px;
  font-family: 'haibao', $font-hei;
  text-align: center;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    width: 24px;
    height: 24px;
  }

  .rightIcon {
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