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
          <li v-show="i === getExpendItemNum()" @click="createTag(type)">
            <div class="icon-wrapper">
              <Icon name="add" class="icon"/>
            </div>
            <span>自定义</span>
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
          <li v-show="i === getIncomeItemNum()" @click="createTag(type)">
            <div class="icon-wrapper">
              <Icon name="add" class="icon"/>
            </div>
            <span>自定义</span>
          </li>
        </ol>
      </van-swipe-item>
    </van-swipe>

  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/tagHelper';

@Component({
  components: {Icon}
})
export default class Tags extends mixins(TagHelper) {
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
    > span{
      white-space: nowrap;
    }

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
      @media (max-height: 600px) {
        .icon {
          height: 35px;
          width: 35px;
        }
      }
    }
  }
}

</style>