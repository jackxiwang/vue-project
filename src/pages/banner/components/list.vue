<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="标题" :label-width="width" prop="title">
          <el-input v-model="form.title" autocomplete="off" ></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <div class="file-add">
            <span>+</span>
            <img :src="imgUrl" alt />
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
  reqBannerAddList,
  reqBannerDetail,
  reqBannerReset,
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
        title: "",
        img: null,
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }]
      },
      width: "180px",
    };
  },
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  methods: {
    ...mapActions({
      changeBanner: "banner/changeBanner",
    }),
    // closed
    close() {
      this.$refs.rule.clearValidate();
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
      if (imgTar.size > 8 * 1024 * 1024) {
        warningAlert("图片太大，请重新处理");
        return;
      }
      this.imgUrl = URL.createObjectURL(e.target.files[0]);
      this.form.img = imgTar;
    },
    // 重置form
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 编辑菜单
    look(id) {
      reqBannerDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imgUrl = this.$preImg + res.data.list.img;
          this.form.id = id;
        }
      });
    },
    // 修改按钮点击
    reset() {
      this.$refs.rule.clearValidate();
      if (this.form.title === "") {
        warningAlert("请输入标题");
        return;
      }
      if(this.form.img===null){
        warningAlert('请上传图片')
        return
      }
      reqBannerReset(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();

          this.$emit("hide");
          this.changeBanner();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 添加按钮点击
    add() {
      this.$refs.rule.clearValidate();
      if (this.form.title === "") {
        warningAlert("请输入标题");
        return;
      }
      if(this.form.img===null){
        warningAlert('请上传图片')
        return
      }
      reqBannerAddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          this.changeBanner();
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
    this.changeBanner();
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