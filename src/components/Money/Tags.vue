<template>
  <carousel :per-page="1" :mouse-drag="false">
    <slide>
      <ol class="tagList">
        <li v-for="item in tagList" :key="item.iconName">
          <div class="icon-wrapper">
            <Icon :name="item.iconName" class="icon"/>
          </div>
          <span>{{ item.tagName }}</span>
        </li>
      </ol>
    </slide>
    <slide>
      <ol class="tagList">
        <li v-for="item in tagList" :key="item.iconName">
          <div class="icon-wrapper">
            <Icon :name="item.iconName" class="icon"/>
          </div>
          <span>{{ item.tagName }}</span>
        </li>
      </ol>
    </slide>
  </carousel>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Icon from '@/components/Icon.vue';
import {Carousel, Slide} from 'vue-carousel';

@Component({
  components: {Icon,Carousel, Slide}
})
export default class Tags extends Vue {
  tagList = [
    {
      iconName: 'food',
      tagName: '餐饮'
    },
    {
      iconName: 'clothes',
      tagName: '服饰'
    },
    {
      iconName: 'house',
      tagName: '住房'
    },
    {
      iconName: 'shopping',
      tagName: '购物'
    },
    {
      iconName: 'travel',
      tagName: '旅游'
    },
    {
      iconName: 'transportation',
      tagName: '交通'
    },
    {
      iconName: 'study',
      tagName: '学习'
    },
    {
      iconName: 'entertainment',
      tagName: '娱乐'
    },
  ];

}

</script>

<style lang="scss" scoped>
.tagList {
  border: 1px solid red;
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
  flex-grow: 1;
}

</style>