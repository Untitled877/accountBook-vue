import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId';
import expend_tagList from '@/constants/expend_tagList';
import income_tagList from '@/constants/income_tagList';
import clone from '@/lib/clone';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    expend_tagList: [],
    income_tagList: [],
    createTagError: null,
    createRecordError: null,
    currentTag: undefined,
    selectedTag:{id: '', name: '', text: ''}
  } as RootState,
  mutations: {
    setSelectedTag(state, tag:Tag) {
      state.selectedTag = tag;
    },
    resetSelectedTag(state) {
      state.selectedTag = {id: '', name: '', text: ''};
    },
    setCurrentTag(state, payload:{type:string, id:string}) {
      const {type, id} = payload;
      const tagList: Tag[] = type === '-' ? state
        .expend_tagList : state.income_tagList;
      state.currentTag = tagList.filter(t => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage
        .getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record:RecordItem) {
      state.createRecordError = null;
      if (record.amount === 0) {
        store.state.createRecordError = new Error('金额不能为0');
      } else {
        const record2: RecordItem = clone(record);
        state.recordList.push(record2);
        store.commit('saveRecords');
        window.alert('添加成功！');
      }
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList',
        JSON.stringify(state.recordList));
    },
    fetchTags(state) {
      state.expend_tagList = JSON.parse(window.localStorage
        .getItem('expend_tagList') || '[]');
      if (!state.expend_tagList || state.expend_tagList.length === 0) {
        store.commit('initExpendTagList');
      }
      state.income_tagList = JSON.parse(window.localStorage
        .getItem('income_tagList') || '[]');
      if (!state.income_tagList || state.income_tagList.length === 0) {
        store.commit('initIncomeTagList');
      }
    },
    initExpendTagList(state) {
      for (let i = 0; i < expend_tagList.length; i++) {
        state.expend_tagList.push({
          id: createId().toString(),
          name: expend_tagList[i].iconName,
          text: expend_tagList[i].tagName
        });
      }
      store.commit('saveTags', '-');
    },
    initIncomeTagList(state) {
      for (let i = 0; i < income_tagList.length; i++) {
        state.income_tagList.push({
          id: createId().toString(),
          name: income_tagList[i].iconName,
          text: income_tagList[i].tagName
        });
      }
      store.commit('saveTags', '+');
    },
    createTag(state, payload: { type: string, text: string }) {
      state.createTagError = null;
      const {type, text} = payload;
      const tagList: Tag[] = type === '-' ? state
        .expend_tagList : state.income_tagList;
      const texts = tagList.map(item => item.text);
      if (texts.indexOf(text) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      }
      const id = createId().toString();
      tagList.push({id: id, name: 'default', text: text});
      store.commit('saveTags', type);
    },
    saveTags(state, type: string) {
      if (type === '-') {
        window.localStorage.setItem('expend_tagList',
          JSON.stringify(state.expend_tagList));
      } else {
        window.localStorage.setItem('income_tagList',
          JSON.stringify(state.income_tagList));
      }
    },
    // 应该对标签的字数限制 substr 并且对用户提示
    updateTag(state, payload: { type: string, id: string, text: string }) {
      const {type, id, text} = payload;
      const tagList: Tag[] = type === '-' ? state
        .expend_tagList : state.income_tagList;
      const idList = tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const texts = tagList.map(item => item.text);
        if (texts.indexOf(text) >= 0) {
          return window.alert('标签名重复！');
        } else {
          const tag = tagList.filter(item => item.id === id)[0];
          tag.text = text;
          store.commit('saveTags', type);
        }
      }
    },
    removeTag(state, payload: { id: string, type: string }) {
      const {id, type} = payload;
      const tagList: Tag[] = type === '-' ? state
        .expend_tagList : state.income_tagList;
      let index = -1;
      for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        tagList.splice(index, 1);
        store.commit('saveTags', type);
        window.alert('删除成功！')
        router.back();
      } else {
        window.alert('删除失败！');
      }
    },
  },
  actions: {},
  modules: {}
});

export default store;
