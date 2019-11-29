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
    method: 'post',
    url: '/post',
    data
  })
}
// 获取栏目列表数据；后台数据中没有热点和关注
export const getCateList = () => {
  return axios({
    url: '/category'
  })
}
