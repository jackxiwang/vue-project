<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="商品编号" sortable width="100"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="180"></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable width="100"></el-table-column>
      <el-table-column prop="market_price" label="商品价格" sortable width="100"></el-table-column>
      <el-table-column prop='img' label="图片" sortable width="180">
        <template slot-scope="scope">
          <img :src="$preImg+scope.row.img" alt="" class="addImg">
        </template>
      </el-table-column>
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del @emit="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="size"
      :pager-count="5"
      layout="prev, pager, next"
      :total="total"
      background
      @current-change="changeCurrent"
    ></el-pagination>
  </div>
</template>
<script>
import { reqGoodsDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters({
      // list: "cate/list",
      list: "goods/list",
      total:"goods/total",
      size:"goods/size"
    }),
  },
  methods: {
    ...mapActions({
      // changeCate: "cate/changeCate",
      changeGoods: "goods/changeGoods",
      changeTotal:"goods/changeTotalAction",
      changePage:"goods/changePageAction"
    }),
    changeCurrent(page) {
      this.changePage(page);
    },
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqGoodsDel(id).then(res=>{
        successAlert(res.data.msg)
        this.changeGoods()
        this.changeTotal();
          // 当前页置1
        this.changePage(1);

      })
    },
  },
  mounted() {
    this.changeGoods();
    this.changeTotal();
  },
};
</script>
<style scoped>
.addImg {
  width: 80px;
  height: 80px;
}
</style>