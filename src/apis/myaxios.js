// 1,引入封装好的axios
import axios from '../utils/axios.js'
// 2，设置登录api的方法
export const getloginData = (data) => {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}
