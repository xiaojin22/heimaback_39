// 引入封装好的axios
import axios from '../utils/myaxios.js'

// 获取文章列表的posts的数据
export const getPostslist = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 追加一篇文章;发布文章
export const addpost = (data) => {
  return axios({
    mothod: 'post',
    url: '/post',
    data
  })
}
