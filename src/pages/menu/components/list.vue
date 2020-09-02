<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="菜单名称" :label-width="width" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width" prop="pid">
          <el-select v-model="form.pid" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="width">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="width" v-if="form.type==1">
          <el-select v-model="form.icon">
            <el-option value="el-icon-setting">
              <i class="el-icon-setting"></i>
            </el-option>
            <el-option value="el-icon-s-grid">
              <i class="el-icon-s-grid"></i>
            </el-option>
            <el-option value="el-icon-printer">
              <i class="el-icon-printer"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url">
            <el-option
              v-for="item in loginChild"
              :key="item.path"
              :value="'/'+item.path "
            >{{item.name}}</el-option>
          </el-select>
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
import { loginChild } from "../../../router/index";
import {
  reqMenuaddList,
  reqMenuDetail,
  reqMenuReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      loginChild,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      rules:{
        title: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ],
          pid: [
            { required: true, message: '请选择', trigger: 'change' }
          ]
      },
      width: "180px",
    };
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      changeMenu: "menu/changeMenu",
    }),
    // closed
    close() {
      this.$refs.rule.clearValidate()
      if (this.info.edit) {
        this.empty()
      }
    },
    // 修改表单类型
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // 重置form
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 编辑菜单
    look(id) {
      reqMenuDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    // 修改按钮点击
    reset() {
      this.$refs.rule.clearValidate()
      if(this.form.title===''){
        warningAlert("请填写菜单名称")
        return
      }
      reqMenuReset(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          this.changeMenu();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 添加按钮点击
    add() {
      this.$refs.rule.clearValidate()
      if(this.form.title===''){
        warningAlert("请填写菜单名称")
        return
      }
      reqMenuaddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          this.changeMenu();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    hide() {
      this.$emit("hide");
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>