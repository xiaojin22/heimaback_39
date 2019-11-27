<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <!-- //侧边导航 -->

        <!-- //用户管理 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :router='true'
          :unique-opened='true'
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        <!-- //文章管理 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                文章列表
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                文章发布
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        <!-- //栏目管理、 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>栏目管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                栏目列表
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
           </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <i class="icon-paragraph-justify toggle-btn"></i>
          <span class="system-title">黑马头条后台管理</span>
          <div class="welcome">
              <span>欢迎你：</span>
              <span>黑马小伙伴们</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span>退出</span>
          </div>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.index {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
