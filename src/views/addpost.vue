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
        <el-form-item label="内容" v-if='postform.type===1'>
          <VueEditor :config="config" ref="vueEditor" />
        </el-form-item>
        <!-- //文件上传；elment-ui组件；视频的上传 -->
         <el-form-item label="内容" v-if='postform.type===2'>
        <el-upload
            class="upload-demo"
            action="http://localhost:3000/upload"
            multiple
            :headers='getToken()'
            :limit="3"
            :on-success='onsuccess'
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
             <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
         </el-upload>
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
// import { addpost } from '../apis/posts.js'
export default {
  data () {
    return {
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
            insert('http://localhost:3000' + res.data.data.url)// 显示在文本框上传的图片
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
  // 发布文章数据
  methods: {
    // 上传视频文件；elment-ui；文件上传；；；onsuccess文件上传成功的钩子函数
    onsuccess (response, file, fileList) {
      if (response.message === '文件上传成功') {
        // 获取文件文件的数据；用基准地址进行拼接路径
        this.postform.content = localStorage.getItem('heima_back_39_baseURL') + response.data.url
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
    pulishPost () {
    // let res = await addpost()
    // 如果type=1时，获取上传的文章
      if (this.postform.type === 1) {
        // 2.获取富文本的数据；；通过设置的ref属性；（直接是无法获取富文本框的数据）
        this.postform.content = this.$refs.vueEditor.editor.root.innerHTML
      }
      console.log(this.postform)
    }
  }
}
</script>

<style scoped lang="less">
</style>
