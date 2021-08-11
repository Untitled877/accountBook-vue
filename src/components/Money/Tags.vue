<template>
  <div>
    <van-swipe v-if="type==='-'" class="my-swipe" indicator-color="#333333">
      <van-swipe-item  v-for="i in getExpendItemNum()" :key="i">
        <ol class="tagList">
          <li v-for="item in sliceArray(expend_tagList,8)[i-1]"
              :key="item.id"
              :class="item.id === selectedTag.id ? 'selected' : ''"
              @click="toggle(item)">
            <div class="icon-wrapper">
              <Icon :name="item.name" class="icon"/>
            </div>
            <span>{{ item.text }}</span>
          </li>
          <li v-show="i === getExpendItemNum()" @click="createTag">
            <div class="icon-wrapper">
              <Icon name="add" class="icon"/>
            </div>
            <span>新增标签</span>
          </li>
        </ol>
      </van-swipe-item>
    </van-swipe>
    <van-swipe v-else class="my-swipe" indicator-color="#333333">
      <van-swipe-item  v-for="i in getIncomeItemNum()" :key="i">
        <ol class="tagList">
          <li v-for="item in sliceArray(income_tagList,8)[i-1]"
              :key="item.id"
              :class="item.id === selectedTag.id ? 'selected' : ''"
              @click="toggle(item)">
            <div class="icon-wrapper">
              <Icon :name="item.name" class="icon"/>
            </div>
            <span>{{ item.text }}</span>
          </li>
          <li v-show="i === getIncomeItemNum()" @click="createTag">
            <div class="icon-wrapper">
              <Icon name="add" class="icon"/>
            </div>
            <span>新增标签</span>
          </li>
        </ol>
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';

@Component({
  components: {Icon}
})
export default class Tags extends Vue {
  @Prop(String) readonly type !: string;
  get selectedTag() {
    return this.$store.state.selectedTag;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  get expend_tagList() {
    return this.$store.state.expend_tagList;
  }

  get income_tagList() {
    return this.$store.state.income_tagList;
  }

  toggle(tag: Tag) {
    if(this.selectedTag.id !== tag.id) {
      this.$store.commit('setSelectedTag', tag);
    }
    this.$emit('update:value', this.selectedTag);
  }

  getExpendItemNum() {
    return Math.ceil((this.expend_tagList.length + 1) / 8);
  }
  getIncomeItemNum() {
    return Math.ceil((this.income_tagList.length + 1) / 8);
  }

  sliceArray = function (array: Array<unknown>, size: number) {
    let result = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      let start = i * size;
      let end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  };
  map: { [key: string]: string } = {
    'tag name duplicated': '标签重复'
  };

  createTag() {
    const text = window.prompt('请输入标签名（最多四个字）');
    if (!text) { return window.alert('标签名不能为空！'); }
    this.$store.commit('createTag', {type: this.type, text});
    if (this.$store.state.createTagError) {
      window.alert(this.map[this.$store.state.createTagError.message]
          || '未知错误');
    } else {
      window.alert('添加成功！');
    }
  }
}

</script>

<style lang="scss" scoped>
.tagList {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 10px;

  > li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    width: 25%;
    font-size: 12px;

    &.selected {
      .icon-wrapper {
        background: #DCDCDC;
      }
    }

    > .icon-wrapper {
      display: inline-block;
      background: #f6f6f6;
      border-radius: 50%;

      .icon {
        vertical-align: middle;
        height: 40px;
        width: 40px;
        margin: 10px;
      }
    }
  }
}

</style>