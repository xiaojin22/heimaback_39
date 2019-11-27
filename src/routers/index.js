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
// 5,添加导航守卫；；判断用户是否有登陆状态保持，如果有token则可以进行跳转，否则重定向到登陆
// to:到哪去；next（）下一个，from：从哪来
router.beforeEach((to, from, next) => {
  // 不是在登录login页面
  if (to.path !== '/login') {
    // 先获取token值，进行判断
    let token = localStorage.getItem('heima_back_39_token')
    if (token) {
      next()// 有token，可以下一次跳转
    } else {
      next({ path: '/login' })// 无token。到登录页面登录
    }
  } else {
    next()// 继续当前的跳转
  }
})
// 6.暴露router
export default router
