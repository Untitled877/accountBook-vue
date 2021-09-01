import Component from 'vue-class-component';
import Vue from 'vue';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签重复'
};

@Component
export class TagHelper extends Vue {
  createTag(type:string) {
    let text = window.prompt('请输入标签名（不超过四个字）');
    if (!text) { return window.alert('标签名不能为空！'); }
    if(text.length > 4) { return window.alert('标签名不可超过四个字'); }
    text = text.substr(0, 4);
    this.$store.commit('createTag', {type: type, text});
    if (this.$store.state.createTagError) {
      window.alert(map[this.$store.state.createTagError.message]
        || '未知错误');
    } else {
      window.alert('添加成功！');
    }
  }
}

export default TagHelper;