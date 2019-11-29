<template>
  <div class="postslits">
    <!-- //面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- //表格 data;指定数据源-->
    <el-table :data="postsList" border style="width: 94% ;margin:30px 0px;">
      <!-- //自定义索引 -->
      <el-table-column type="index"  width="56"></el-table-column>
      <el-table-column prop="user.nickname" label="作者" width="100"></el-table-column>
      <el-table-column prop="title" label="文章标题" width="480"></el-table-column>
      <el-table-column label="日期" width="280">
        <!-- //日期,使用插入值的方法  slot-scope="scope";scope.row；一行数据-->
        <template  slot-scope="scope">
          {{scope.row.create_date|dateFormat}}
        </template>
      </el-table-column>
      <el-table-column prop="type" label="文章类型" width="80">
        <!-- 文章类型 -->
        <template slot-scope="scope">
          {{scope.row.type|postType}}
        </template>
      </el-table-column>
      <!-- //操作；重点。删除，编辑 -->
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据；scope.row；一行的数据 -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="分享" placement="top-start">
            <el-button type="primary" icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="primary" icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- //分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { getPostslist } from '../apis/posts.js'
export default {
  data () {
    return {
      // 定义pageindex和pagesize；
      pageIndex: 1,
      pageSize: 2,
      total: 100, // 当前总页数
      // 文章列表数据
      postsList: []
    }
  },
  // 操作中的方法
  methods: {
    // 将获取列表数据封装成init方法。
    async init () {
      let res = await getPostslist({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      })
      this.postsList = res.data.data
      // 当前文章列表的总页数
      this.total = res.data.total
      console.log(this.total)
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    // 分页中的方法
    // 1, 切换每页显示记录数时触发
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      // 重置pageSize
      this.pageSize = val
      // 使用重置后的pageSize重新获取数据
      this.init()
    },
    // 2,切换当前页码时触发
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      // 重置pageIndex
      this.pageIndex = val
      // 使用重置后的pageSize重新获取数据
      this.init()
    }
  },
  // 获取文章列表数据;
  async mounted () {
    this.init()// 调用封装好的获取文章列表数据的方法
  },
  // 添加局部过滤器；由于页面中的日期和类型显示格式不对
  filters: {
    // 1，添加时间过滤器；a)定义过滤器
    dateFormat (data, spe) {
      data = new Date(data)
      spe = spe || '/'
      var year = data.getFullYear()
      var month = data.getMonth() + 1
      var day = data.getDate()
      return year + spe + month + spe + day
    },
    // 2,添加文章类型过滤器
    postType (type) {
      // 三元判断类型
      return type === 1 ? '文章' : '视频'
    }
  }
}
</script>

<style scoped lang="less">
</style>
