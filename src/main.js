import Vue from 'vue'
import App from './App.vue'

// 引入路由模块router
import router from './routers/index.js'
Vue.config.productionTip = false

new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
