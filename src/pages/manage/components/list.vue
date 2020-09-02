<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="所属角色" :label-width="width" prop="roleid">
          <el-select v-model="form.roleid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in roleData"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" :label-width="width" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide()">取 消</el-button>
        <el-button type="primary" v-if="info.edit" @click="reset()">修 改</el-button>
        <el-button type="primary" @click="add()" v-else>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqUseraddList,
  reqUserDetail,
  reqUserReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      width: "180px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      roleData: "role/list",
      manDate: "manage/list",
    }),
  },
  methods: {
    ...mapActions({
      reqUserList: "manage/changeManage",
      reqRoleList: "role/changeRole",
      changeTotal: "manage/changeTotalAction",
    }),
    close() {
      this.$refs.rule.clearValidate();
      this.info.edit && this.empty();
    },
    hide() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        roleid: 1,
        username: "",
        password: "",
        status: 1,
      };
    },
    // 添加信息
    add() {
      this.$refs.rule.clearValidate();
      if (this.form.username === "") {
        warningAlert("请填写用户名");
        return;
      }
      if(this.form.roleid === ''){
        warningAlert("请选择所属角色")
        return
      }
      reqUseraddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.hide();
          this.empty();
          // 刷新页面
          this.reqUserList();
          // 总数改变
          this.changeTotal();
          //
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 编辑查看信息
    look(id) {
      reqUserDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.password = "";
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改信息
    reset() {
      this.$refs.rule.clearValidate();
      if (this.form.username === "") {
        warningAlert("请填写用户名");
        return;
      }
      if(this.form.roleid === ''){
        warningAlert("请选择所属角色")
        return
      }
      reqUserReset(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.hide();
          this.empty();
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.roleData.length === 0 && this.reqRoleList();
  },
};
</script>
<style scoped>
</style>