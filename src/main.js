import 'babel-polyfill'
import 'common/js/hack'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import store from './store/index'

import 'common/css/reset.css'
import 'common/css/border.css'

fastclick.attach(document.body)

Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: require('common/image/logo.png'),
  attempt: 1
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
