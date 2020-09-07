<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @closed="close"
      width="60%"
      @opened="open"
    >
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="活动名称" :label-width="width" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动期限" :label-width="width" prop="begintime">
          <div class="block">
            <!-- <span class="demonstration"></span> -->
            <el-date-picker
              v-model="time"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              @change="showTime"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="一级分类" :label-width="width" prop="first_cateid">
          <el-select v-model="form.first_cateid" @change="changeFirst">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width" prop="second_cateid">
          <el-select v-model="form.second_cateid" @change="changeSecond">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in cateDetailList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width" prop="goodsid">
          <el-select v-model="form.goodsid">
            <el-option label="请选择" value disabled></el-option>
            <el-option
              v-for="item in goodsDetailList"
              :key="item.id"
              :label="item.goodsname"
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
// import { loginChild } from "../../../router/index";
import {
  reqSeckAddList,
  reqSeckDetail,
  reqSeckReset,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      // loginChild,
      cateDetailList: [],
      specDetailList: [],
      goodsDetailList: [],
      form: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        begintime: [
          { required: true, message: "请选择活动期限", trigger: "change" },
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "change" },
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "change" },
        ],
        goodsid: [{ required: true, message: "请选择商品", trigger: "change" }],
      },

      time: [],
      width: "180px",
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specList: "spec/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      changeCate: "cate/changeCate",
      changeSpec: "spec/changeSpec",
      changeGoods: "goods/changeGoods",
      changeSeck: "seckill/changeSeck",
    }),
    open() {
      this.$refs.rule.clearValidate();
    },
    // closed
    close() {
      this.$refs.rule.clearValidate();
      if (this.info.edit) {
        this.empty();
      }
    },
    // 时间日期
    showTime() {
      if (this.time !== null || this.time.length>0) {
        this.form.begintime = this.time[0];
        this.form.endtime = this.time[1];
      }
    },
    // 改变商品分类一级
    changeFirst() {
      this.form.second_cateid = "";
      this.cateDetailList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
    },
    // 改变商品
    changeSecond() {
      this.goodsDetailList = this.goodsList.filter((item) => {
        if (
          item.second_cateid == this.form.second_cateid &&
          item.first_cateid == this.form.first_cateid
        ) {
          return item;
        }
      });
      this.form.goodsid = "";
    },
    test() {
      this.$refs.rule.clearValidate();
      if (this.form.title == "") {
        warningAlert("请输入活动名称");
        return true;
      }
      if (this.time == null || this.time.length == 0 ) {
        warningAlert("请选择日期");
        return true;
      }
      if (this.form.first_cateid == "") {
        warningAlert("请选择一级分类");
        return true;
      }
      if (this.form.second_cateid == "") {
        warningAlert("请选择二级分类");
        return true;
      }
      if (this.form.goodsid == "") {
        warningAlert("请选择商品");
        return true;
      }
    },

    // 重置form
    empty() {
      this.form = {
        title: "",
        begintime: "",
        endtimeL: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.time = [];
    },
    // 编辑菜单
    look(id) {
      reqSeckDetail(id).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.time.push(res.data.list.begintime);
          this.time.push(res.data.list.endtime);
          this.cateDetailList = this.cateList.find(
            (item) => item.id == this.form.first_cateid
          ).children;
          this.goodsDetailList = this.goodsList.filter((item) => {
            if (
              item.second_cateid == this.form.second_cateid &&
              item.first_cateid == this.form.first_cateid
            ) {
              return item;
            }
          });
          this.form.id = id;
        }
      });
    },
    // 修改按钮点击
    reset() {
      if (this.test()) {
        return;
      }
      // console.log(
      //   this.form.begintime
      // );
      reqSeckReset(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();

          this.$emit("hide");
          this.changeSeck();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 添加按钮点击
    add() {
      if (this.test()) {
        return;
      }
      reqSeckAddList(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.empty();
          this.$emit("hide");
          // 刷新页面
          this.changeSeck();
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
    this.changeGoods(true);
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