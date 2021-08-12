import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue/es';
import 'ant-design-vue/dist/antd.less';
import Vant from 'vant';
import 'vant/lib/index.less';
import './assets/font/font.css';

Vue.use(Vant);
Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.onload = function () {
  setTimeout(function () {
    window.scroll(0, 200);
  }, 0);
};
