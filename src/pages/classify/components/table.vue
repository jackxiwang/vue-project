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
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column prop='img' label="图片" sortable width="180">
        <template slot-scope="scope">
          <img :src="$preImg+scope.row.img" alt="" class="addImg" >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <!-- <el-button type="warning" @click="del(scope.row.id)">删除</el-button> -->
          <v-del @emit="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { reqCateDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      changeCate: "cate/changeCate",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqCateDel(id).then(res=>{
        successAlert(res.data.msg)
        this.changeCate()
      })
    },
  },
  mounted() {
    this.changeCate();
  },
};
</script>
<style scoped>
.addImg {
  width: 80px;
  height: 80px;
}
</style>