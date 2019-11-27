// 1,引入axios
import axios from 'axios'

// 2.创建基准路径
axios.defaults.baseURL = 'http://localhost:3000'
// 3,暴露
export default axios
