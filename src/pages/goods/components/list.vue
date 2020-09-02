<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @closed="close"
      @opened="createEditor"
      width="60%"
    >
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="一级分类" :label-width="width" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width" prop="second_cateid">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in cateDetailList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width" prop="goodsname">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <div class="file-add">
            <span>+</span>
            <img :src="imgUrl" alt />
            <input type="file" @change="addImg" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" @change="changeAttr">
            <el-option label="请选择" value="" disabled></el-option>
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option v-for="item in specDetailList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="width">
          <!-- <textarea cols="30" rows="10" v-model="form.description"></textarea>
          -->
          <div id="editor" v-if="info.isShow"></div>
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
import E from "wangeditor";
import {
  reqGoodsAddList,
  reqGoodsDetail,
  reqGoodsReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      loginChild,
      imgUrl: "",
      cateDetailList: [],
      specDetailList: [],
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: [],
        isnew: "",
        ishot: "",
        img: null,
        status: 1,
      },
      rules:{
        goodsname: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
          ],
          first_cateid: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
          second_cateid: [
            { required: true, message: '请选择', trigger: 'change' }
          ],
      },
      width: "180px",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
    }),
  },
  methods: {
    ...mapActions({
      changeCate: "cate/changeCate",
      changeSpec: "spec/changeSpec",
      changeGoods: "goods/changeGoods",
      changeTotal: "goods/changeTotalAction",
    }),
    // closed
    close() {
      this.$refs.rule.clearValidate()
      if (this.info.edit) {
        this.empty();
      }
    },
    // 创建富文本
    createEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.form.description);
    },
    // 改变商品分类一级
    changeFirst() {
      this.form.second_cateid = "";
      this.cateDetailList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
    },
    // 改变商品规格
    changeAttr() {
      console.log(this.form.specsid);
      this.specDetailList = this.specList.find(
        (item) => item.id == this.form.specsid
      ).attrs;
      this.form.specsattr = "";
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
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        description: "",
        specsid: "",
        specsattr: "",
        isnew: "",
        ishot: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 编辑菜单
    look(id) {
      reqGoodsDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.imgUrl = this.$preImg + res.data.list.img;
          this.form.specsattr = this.form.specsattr.split(",");
          this.cateDetailList = this.cateList.find(
            (item) => item.id == this.form.first_cateid
          ).children;
          this.specDetailList = this.specList.find(
            (item) => item.id == this.form.specsid
          ).attrs;
          this.form.id = id;
        }
      });
    },
    // 修改按钮点击
    reset() {
      this.$refs.rule.clearValidate()
      if(this.form.goodsname===''){
        warningAlert("请填写菜单名称")
        return
      }
      if(this.form.first_cateid === ''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.second_cateid === ''){
        warningAlert('请选择二级分类')
        return
      }
      this.form.description = this.editor.txt.html();
      reqGoodsReset(this.form).then((res) => {
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
      if(this.form.goodsname===''){
        warningAlert("请填写菜单名称")
        return
      }
       if(this.form.first_cateid === ''){
        warningAlert('请选择一级分类')
        return
      }
      if(this.form.second_cateid === ''){
        warningAlert('请选择一级分类')
        return
      }
      this.form.description = this.editor.txt.html();
      reqGoodsAddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          // 刷新页面
          this.changeGoods();
          this.changeTotal();
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
    if (this.cateList.length == 0) {
      this.changeCate();
    }
    this.changeSpec(true);
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