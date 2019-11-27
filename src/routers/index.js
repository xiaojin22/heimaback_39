// 1,引入vue
import Vue from 'vue'

// 2.引入vue-router
import VueRouter from 'vue-router'

// 引入组件
import Login from '../views/login.vue'
import Index from '../views/index.vue'
// 3.vue.use管理
Vue.use(VueRouter)
// 4.创建vue实例对象
var router = new VueRouter({
  routes: [
    {
      // 这是登录页面
      name: 'Login',
      path: '/login',
      component: Login
    },
    {
      // 这是index后台系统管理页面
      name: 'Index',
      path: '/index',
      component: Index
    }
  ]
})
// 5.暴露router
export default router
