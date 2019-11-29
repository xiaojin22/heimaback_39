<template>
  <div class="addpost">
    <!-- //面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:30px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章</el-breadcrumb-item>
      <el-breadcrumb-item>视频</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-form ref :model="postform" label-width="80px">
        <!-- //标题 -->
        <el-form-item label="标题">
          <el-input v-model="postform.title"></el-input>
        </el-form-item>
        <!-- //单选按钮 -->
        <el-form-item label="类型">
          <el-radio-group v-model="postform.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- //发布文章;;内容、富文本框 ;;判断，如果类型等于1；文章 1.给组件添加ref；-->
        <el-form-item label="内容" v-if="postform.type===1">
          <VueEditor :config="config" ref="vueEditor" />
        </el-form-item>
        <!-- //文件上传；elment-ui组件；视频的上传 -->
        <el-form-item label="内容" v-if="postform.type===2">
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/upload"
            multiple
            :headers="getToken()"
            :limit="3"
            :on-success="onsuccess"
            :file-list="fileList"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>
        <!-- //封面上传 on-remove文件列表移除文件时的钩子-->
        <el-form-item label="封面">
          <el-upload
            action="http://localhost:3000/upload"
            list-type="picture-card"
            :headers="getToken()"
            :on-success="imgsuccess"
            :on-remove="imgremove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <!-- //多选框；；elment-ui中组件 -->
        <el-form-item label="栏目">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <!-- //checkedCates默认选中的选项cate.name存储在该数组中 -->
          <el-checkbox-group v-model="checkedCates" @change="handleCheckedCateChange">
              <!-- //将栏目列表cateList数据渲染;cate,单个分类数据 -->
            <el-checkbox v-for="cate in cateList" :label="cate.id" :key="cate.id">{{cate.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- //发布文章 -->
        <el-form-item>
          <el-button type="primary" @click="pulishPost">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本框；下载安装
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
import { getCateList, addpost } from '../apis/posts.js'// 获取栏目列表数据
// import { addpost } from '../apis/posts.js'
export default {
  data () {
    return {
      // 栏目列表数据
      cateList: [],
      // 默认选择的cate.name存储在该数组中
      checkedCates: [],
      // 不确定选不选
      isIndeterminate: true,
      // 没有全选
      checkAll: false,
      // 视频文件上传的列表
      fileList: [],
      // 定义要发布文章要传递的参数
      postform: {
        titel: '', // 文章标题
        content: '', // 文章内容
        categories: [], /// 所属栏目的id集合
        cover: [], // 封面图片的id集合
        type: 1 // 文章类型，1文章2视频
      },
      // 富文本框的使用
      config: {
        // 上传图片的配置
        uploadImage: {
          // 处理文件上传的服务器地址
          url: 'http://localhost:3000/upload',
          // 后台需要的参数名称
          name: 'file',
          // 设置headers,传递token
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            console.log(res)
            insert('http://localhost:3000' + res.data.data.url) // 显示在文本框上传的图片
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        }
      }
    }
  },
  // 注册富文本框
  components: {
    VueEditor
  },
  // 获取栏目列表数据;;由于后台数据没有关注和热点，所以要截取；动态渲染
  async  mounted () {
    let res = await getCateList()
    this.cateList = res.data.data.splice(2)// 从索引为2开始截取，得到的数据
  },
  // 发布文章数据
  methods: {
    // 单击单个复选框所触发的事件
    handleCheckedCateChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.cateList.length// 表示全部选中的数量是否等于列表数据
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cateList.length
    },
    // 多选框；；全选和全不选;;val表示是否全选
    handleCheckAllChange (val) {
      // // 由于this.checkedCate只是包含了id号的数组;我们需要有id号的对象数组；this.cateList进行改造
      this.checkedCates = val ? this.cateList.map((value) => {
        return value.id// 返回有id号的对象数组
      }) : []// 表示选中的，有没有全选
      this.isIndeterminate = false// []没全选；给与不确定
    },
    // 移除封面图片的钩子函数；
    imgremove (file, fileList) {
      //   console.log(file)// 是本次移除的图片
      //   console.log(fileList)// 剩下的图片
      // 根据本次移除的图片信息去删除postForm的cover中的图片存储信息
      for (var i = 0; i < this.postform.cover.length; i++) {
        // 如果移除的图片id=循环到的id；则将该id的图片移除
        if (this.postform.cover[i].id === file.response.data.id) {
          this.postform.cover.splice(i, 1)
        }
      }
    },
    // 封面图片上传成功的钩子
    imgsuccess (response, file, fileList) {
      if (response.message === '文件上传成功') {
        // 获取封面的cover的id;往cover数组中追加对象id
        this.postform.cover.push({
          id: response.data.id
        })
        // 获取封面图片的数据；用基准地址进行拼接路径
        this.postform.content =
          localStorage.getItem('heima_back_39_baseURL') + response.data.url
        // 提示上传成功
        this.$message.success(response.message)
      }
      console.log(response)
    },
    // 上传视频文件；elment-ui；文件上传；；；onsuccess文件上传成功的钩子函数
    onsuccess (response, file, fileList) {
      if (response.message === '文件上传成功') {
        // 获取文件文件的数据；用基准地址进行拼接路径
        this.postform.content =
          localStorage.getItem('heima_back_39_baseURL') + response.data.url
        // 提示上传成功
        this.$message.success(response.message)
      }
      console.log(response)
    },
    // 由于富文本框的上传图片没有使用我们自己设置的请求拦截器；
    // 该插件有自己的headers；上传头信息；封装返回token的函数、
    getToken () {
      return {
        Authorization: localStorage.getItem('heima_back_39_token')
      }
    },
    async  pulishPost () {
      // 如果type=1时，获取上传的文章
      if (this.postform.type === 1) {
        // 2.获取富文本的数据；；通过设置的ref属性；（直接是无法获取富文本框的数据）
        this.postform.content = this.$refs.vueEditor.editor.root.innerHTML
      }
      // this.checkedCates获取选中的栏目数据对象数组id集；
      for (let i = 0; i < this.checkedCates.length; i++) {
        this.postform.categories.push({
          id: this.checkedCates[i]
        })
      }
      // 发布一篇文章；
      let res = await addpost(this.postform)
      if (res.data.message === '文章发布成功') {
        // 跳转到文章列表页面
        this.$router.push({ name: 'Postlist' })
      }
      console.log(res)
    }
  }

}
</script>

<style scoped lang="less">
</style>
