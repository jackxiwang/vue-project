<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="分类名称" :label-width="width" prop="catename">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级分类" :label-width="width" prop="pid">
          <el-select v-model="form.pid">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片" :label-width="width" v-if="form.pid != 0">
          <div class="file-add">
            <span>+</span>
            <img :src="imgUrl" alt v-if="imgUrl" />
            <input type="file" @change="addImg" />
          </div>
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
  reqCateaddList,
  reqCateDetail,
  reqCateReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      loginChild,
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules:{
        catename: [
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
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      changeCate: "cate/changeCate",
    }),
    // closed
    close() {
      this.$refs.rule.clearValidate()
      if (this.info.edit) {
        this.empty();
      }
    },
    // 图片上传处理
    addImg(e) {
      let imgTar = e.target.files[0];
      let imgArr = [".jpg", ".jpeg", ".png", ".gif"];
      let imgSpec = imgTar.name.slice(imgTar.name.lastIndexOf("."));
      if (!imgArr.includes(imgSpec)) {
        warningAlert("图片格式错误");
        return;
      }
      if (imgTar.size > 2 * 1024 * 1024) {
        warningAlert("图片太大，请重新处理");
        return;
      }
      this.imgUrl = URL.createObjectURL(e.target.files[0]);
      this.form.img = imgTar;
    },
    // 重置form
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 编辑菜单
    look(id) {
      reqCateDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imgUrl = this.$preImg + res.data.list.img;
          this.form.id = id;
        }
      });
    },
    // 修改按钮点击
    reset() {
      this.$refs.rule.clearValidate()
      if(this.form.catename===''){
        warningAlert("请填写分类名称")
        return
      }
      reqCateReset(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();

          this.$emit("hide");
          this.changeCate();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 添加按钮点击
    add() {
      this.$refs.rule.clearValidate()
      if(this.form.catename===''){
        warningAlert("请填写分类名称")
        return
      }
      reqCateaddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          this.changeCate();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    hide() {
      this.$emit("hide");
    },
  },
  mounted() {
    this.changeCate();
    console.log(this.list);
  },
};
</script>
<style scoped>
.file-add {
  position: relative;
  width: 150px;
  height: 150px;
  line-height: 100px;
  text-align: center;
  overflow: hidden;
  border: 1px dashed #ccc;
  border-radius: 8px;
}
.file-add span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
}
.file-add img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.file-add input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
</style>