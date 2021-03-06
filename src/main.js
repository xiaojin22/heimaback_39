import Vue from 'vue'
import App from './App.vue'

// 引入样式重定向和字体图片样式
import './styles/index.less'

// 引入全局Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入路由模块router
import router from './routers/index.js'
// 使用element-ui
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  // 注入
  router,
  render: h => h(App)
}).$mount('#app')
