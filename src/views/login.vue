<template>
  <div class="login">
    <div class="container">
      <img class="avatar" src="../assets/snipaste_20191127_192830.png" alt />
      <el-form :model="ruleUser" :rules="rules" ref="ruleUser" class="demo-ruleForm">
        <!-- //用户名 -->
        <el-form-item prop="username1">
          <el-input
            prefix-icon="icon-user-check"
            v-model="ruleUser.username"
            placeholder="请输入用户/手机号"
          ></el-input>
        </el-form-item>
        <!-- //密码 -->
        <el-form-item prop="password1">
          <el-input prefix-icon="icon-key" v-model="ruleUser.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- //创建按钮 -->
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitLogin">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// 引入封装好的myaxios方法
import { getloginData } from '../apis/myaxios.js'
export default {
  data () {
    return {
      // 用户登录信息
      ruleUser: {
        username: '10086',
        password: '123'
      },
      // 登录验证规则
      rules: {
        username: [
          { required: true, message: '用户名/手机号', trigger: 'blur' }
        ],
        password: [
        //   { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 16,
            message: '请输入3-16位的密码',
            trigger: 'blur'
          }
        ]
      }

    }
  },
  methods: {
    // 注册登录事件
    submitLogin () {
      // 1.2登录前要验证登录是否符合，如果密码。账号正确，登录成功则到index首页
      this.$refs.ruleUser.validate(async valid => {
        //    valid返回true登录成功，验证通过，发起登录请求
        console.log(this.$refs.ruleUser)
        if (valid) {
          alert(111)
          console.log(234)
          // 1.1this.ruleUser；通过ref定义；获取input表单要提交请求的数据
          let res = await getloginData(this.ruleUser)
          console.log(res)
          if (res.data.message === '登录成功') {
            // 登录到index管理系统后台页面
            this.$router.push({ path: '/index' })
            // 将tonken值存储到本地
            // localStorage.setItem('heima_back_39_token', res.data.data.token)
          } else {
            // 给出错误提示
            this.$message.error(res.data.message)
          }
        } else {
          // 验证不通过，则终止请求的发送
          this.$message.error('信息登录错误，请重新输入')
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
