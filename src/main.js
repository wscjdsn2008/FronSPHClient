import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import '@/mock/mockServer.js'
import SlideLoop from "@/components/SlideLoop";
import "swiper/css/swiper.css";
import Pagination from "@/components/Pagination";
Vue.config.productionTip = false
Vue.component('TypeNav', TypeNav);
Vue.component('SlideLoop', SlideLoop);
Vue.component('Pagination', Pagination);
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this //安装总线
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
