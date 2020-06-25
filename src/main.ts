import Vue from 'vue';
// @ts-ignore
import Vuelidate from 'vuelidate';
import { IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;

Vue.use(IconsPlugin);
Vue.use(Vuelidate);

new Vue({
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
