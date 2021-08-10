<template>
  <div>
    <van-swipe class="my-swipe" indicator-color="#333333">
      <van-swipe-item v-for="i in getItemNum()" :key="i">
        <ol class="tagList">
          <li v-for="item in sliceArray(expend_tagList,8)[i-1]" :key="item.id">
            <div class="icon-wrapper">
              <Icon :name="item.name" class="icon"/>
            </div>
            <span>{{ item.text }}</span>
          </li>
          <li v-show="i === getItemNum()" @click="createTag">
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
  get expend_tagList() {
    return this.$store.state.expend_tagList;
  }

  get income_tagList() {
    return this.$store.state.income_tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  getItemNum() {
    return Math.ceil(this.expend_tagList.length / 8);
  }

  sliceArray = function (array:Array<unknown>, size:number) {
    let result = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      let start = i * size;
      let end = start + size;
      result.push(array.slice(start, end));
    }
    return result;
  }
   map:{ [key:string]:string} = {
    'tag name duplicated' : '标签重复'
  }
   // 传入type
  createTag() {
    const name = window.prompt('请输入标签名（最多四个字）');
    if (!name) { return window.alert('标签名不能为空！'); }
    this.$store.commit('createTag', {type:this.type, name});
    if (this.$store.state.createTagError) {
      window.alert(this.map[this.$store.state.createTagError.message]
          || '未知错误');
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