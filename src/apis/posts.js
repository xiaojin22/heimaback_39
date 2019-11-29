// 引入封装好的axios
import axios from '../utils/axios.js'

// 获取文章列表的posts的数据
export const getPostslist = (params) => {
  return axios({
    url: '/post',
    params
  })
}
