<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          unique-opened
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <div v-for="item in msg.menus" :key="item.id">
            <el-submenu :index="String(item.id)" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="value in item.children"
                  :key="value.id"
                  :index="value.url"
                >{{value.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>

          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="menu">菜单管理</el-menu-item>
              <el-menu-item index="role">角色管理</el-menu-item>
              <el-menu-item index="manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="classify">商品分类</el-menu-item>
              <el-menu-item index="spec">商品规格</el-menu-item>
              <el-menu-item index="goods">商品管理</el-menu-item>
              <el-menu-item index="banner">轮播图管理</el-menu-item>
              <el-menu-item index="member">会员管理</el-menu-item>
              <el-menu-item index="seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>-->
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <p>{{msg.username}}</p>
          <el-button type="primary" @click="out">退出</el-button>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}} </el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { loginChild } from "../../router/index";
export default {
  data() {
    return {
      ...loginChild,
    };
  },
  computed: {
    ...mapGetters({
      msg: "user/msg",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "user/changeUserAction",
    }),
    out() {
      this.changeUser({});
      this.$router.push("/login");
    },
  },
  mounted() {
    console.log(this.msg);
  },
};
</script>
<style scoped>
.el-container {
  height: 100vh;
}
.el-header {
  background-color: #b3c0d1;
}
.el-aside {
  background: #20222a;
}
.el-header {
  display: flex;
  justify-content: flex-end;
}
.el-header p {
  line-height: 60px;
}
.el-header .el-button {
  margin-left: 10px;
  margin-top: 10px;
  height: 40px;
}
</style>