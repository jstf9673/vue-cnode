// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './vuex/store'
// import axios from 'axios'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'

Vue.config.productionTip = false

Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(VueResource)
// Vue.use(axios)
// console.log(App)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
