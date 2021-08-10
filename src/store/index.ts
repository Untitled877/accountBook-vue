import Vue from 'vue';
import Vuex from 'vuex';
import createId from '@/lib/createId';
import expend_tagList from '@/constants/expend_tagList';
import income_tagList from '@/constants/income_tagList';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    expend_tagList: [],
    income_tagList: [],
    createTagError: null,
    currentTag: undefined,
    default_expend_tags: [],
    default_income_tags: []
  } as RootState,
  mutations: {

    // 将支出和收入的标签都获取到
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
      store.commit('saveTags','-');
    },
    initIncomeTagList(state) {
      for (let i = 0; i < income_tagList.length; i++) {
        state.income_tagList.push({
          id: createId().toString(),
          name: income_tagList[i].iconName,
          text: income_tagList[i].tagName
        });
      }
      store.commit('saveTags','+');
    },
    createTag(state, payload: { type: string, name: string }) {
      state.createTagError = null;
      const {type, name} = payload;
      if(type === '-') {
        console.log('-----');
        const names = state.expend_tagList.map(item => item.name);
          if(names.indexOf(name) >= 0) {
            state.createTagError = new Error('tag name duplicated');
            return;
          }
          const id = createId().toString();
          state.expend_tagList.push({id:id, name:'default',text:name});
          store.commit('saveTags');
        } else if(type === '+') {
        const names = state.income_tagList.map(item => item.name);
        if(names.indexOf(name) >= 0) {
          state.createTagError = new Error('tag name duplicated');
          return;
        }
        const id = createId().toString();
        state.income_tagList.push({id:id, name:'default',text:name});
        store.commit('saveTags');
      }
    },
    saveTags(state, type: string) {
      if (type === '-') {
        window.localStorage.setItem('expend_tagList',
          JSON.stringify(state.expend_tagList));
      } else {
        window.localStorage.setItem('income_tagList',
          JSON.stringify(state.income_tagList));
      }
    }

  },
  actions: {},
  modules: {}
});

export default store;
