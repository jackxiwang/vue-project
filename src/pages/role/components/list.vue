<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="角色名称" :label-width="width" prop="rolename">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree :data="data" show-checkbox node-key="id" ref="tree" :props="defaultProps"></el-tree>
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
  reqRoleAddList,
  reqroleDetail,
  reqRoleReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      width: "180px",
      form: {
        rolename: "",
        status: 1,
        menus: [],
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      rules: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      data: "menu/list",
      roleData: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      reqMenuList: "menu/changeMenu",
      reqRoleList: "role/changeRole",
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
        rolename: "",
        status: 1,
        menus: [],
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 添加信息
    add() {
      let menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.$refs.rule.clearValidate();
      if (this.form.rolename === "") {
        warningAlert("请填写角色名称");
        return;
      }
      if (JSON.parse(menus).length === 0) {
        warningAlert("请选择角色权限");
        return;
      }
      this.form.menus = menus;
      // reqRoleAddList(this.form).then((res) => {
      //   if (res.data.code == 200) {
      //     successAlert(res.data.msg);
      //     this.hide();
      //     this.empty();
      //     this.reqRoleList();
      //   }else {
      //     warningAlert(res.data.msg)
      //   }
      // });
    },
    // 编辑查看信息
    look(id) {
      reqroleDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
          this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 修改信息
    reset() {
      this.$refs.rule.clearValidate();
      if (this.form.rolename === "") {
        warningAlert("请填写角色名称");
        return;
      }
      if (this.form.menus.length <= 0) {
        warningAlert("请选择角色权限");
        return;
      }
      let menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.form.menus = menus;
      reqRoleReset(this.form).then((res) => {
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
    if (this.data.length === 0) {
      this.reqMenuList();
    }
  },
};
</script>
<style scoped>
</style>