<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="规格名称" :label-width="width" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item,index) in attrList"
          :key="index"
        >
          <el-row :gutter="20">
            <el-col :span="16">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
              <el-button type="danger" v-else @click="delAttr(index)">删除</el-button>
            </el-col>
          </el-row>
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
  reqSpecsaddList,
  reqSpecsDetail,
  reqSpecsReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      loginChild,
      attrList: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules:{
        specsname: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
          ]
          
      },
      width: "180px",
    };
  },
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  methods: {
    ...mapActions({
      changeSpec: "spec/changeSpec",
      changeTotal:"spec/changeTotalAction",
      changePage:"spec/changePageAction"
    }),
    // 新增标签
    addAttr() {
      this.attrList.push({ value: "" });
    },
    delAttr(i) {
      this.attrList.splice(i, 1);
    },
    // closed
    close() {
      this.$refs.rule.clearValidate()
      if (this.info.edit) {
        this.empty();
      }
    },
    // 重置form
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrList = [{value:''}]
    },
    // 编辑菜单
    look(id) {
      reqSpecsDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          this.attrList = JSON.parse(res.data.list[0].attrs).map(item=> { return {'value':item}})
          this.form.id = id;
        }
      });
    },
    // 修改按钮点击
    reset() {
       this.$refs.rule.clearValidate()
      if(this.form.specsname===''){
        warningAlert("请填写菜单名称")
        return
      }
      let attrs = this.attrList.map((item) => item.value);
      this.form.attrs = JSON.stringify(attrs);
      reqSpecsReset(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          // 刷新页面
          this.changeSpec();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 添加按钮点击
    add() {
      this.$refs.rule.clearValidate()
      if(this.form.specsname===''){
        warningAlert("请填写菜单名称")
        return
      }
      let attrs = this.attrList.map((item) => item.value);
      this.form.attrs = JSON.stringify(attrs);
      reqSpecsaddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          // 刷新页面
          this.changeSpec();
          // 重置总数
          this.changeTotal()
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