<template>
  <div class="main">
    <div class="con">
      <h3>登录</h3>
      <el-form :model="user" :rules="rules" ref="rule">
        <el-form-item prop="username">
          <el-input v-model="user.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="user.password" clearable show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="login()">登录</el-button>
    </div>
  </div>
</template>
<script>
import { reqLogin } from "../../util/request";
import { mapActions, mapGetters } from "vuex";
import { warningAlert, successAlert } from "../../util/alert";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      rules:{
        username:[
          { required: true, message: '请输入账户', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },

  methods: {
    ...mapActions({
      changeUser: "user/changeUserAction",
    }),
    login() {
      if(this.user.username==='' || this.user.password===''){
        warningAlert('请输入账户名或密码')
        return
      }
      reqLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert("成功登录");
          this.changeUser(res.data.list);
          this.$router.push("/");
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553445, #303d5f);
  position: fixed;
  top: 0;
  left: 0;
}
.con {
  text-align: center;
  width: 380px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h3 {
  text-align: center;
  padding: 20px;
}
.el-input {
  margin-bottom: 15px;
}
</style>