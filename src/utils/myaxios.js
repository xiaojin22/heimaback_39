// 1,引入axios
import axios from 'axios'

// 2.创建基准路径
axios.defaults.baseURL = 'http://localhost:3000'
// 将服务器的基准路径存储到本地存储中
localStorage.setItem('heima_back_39_baseURL', 'http://localhost:3000')
// 在发送请求之前。添加请求拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
//   判断有误token值；有就追加
  let token = localStorage.getItem('heima_back_39_token')
  if (token) {
    console.log('添加拦截器')
    //
    config.headers.Authorization = token
  }
  // `config` 是为请求提供的配置信息
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 3,暴露
export default axios
