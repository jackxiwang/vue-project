<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close" width="60%">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="width">
          
            <div class="block">
              <span class="demonstration">默认</span>
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
         
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in cateDetailList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.second_cateid">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in cateDetailList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
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
      if (this.info.edit) {
        this.empty();
      }
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