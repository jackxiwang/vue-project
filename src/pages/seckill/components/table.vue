<template>
  <div>
    <el-table
      :data="list"
      style="width: 50%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="title" label="商品名称" sortable width="180"></el-table-column>
      
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del @emit="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>
   
  </div>
</template>
<script>
import { reqSeckDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters({
      list:"seckill/list"
    }),
  },
  methods: {
    ...mapActions({
      // changeCate: "cate/changeCate",
      changeSeck: "seckill/changeSeck",
    }),
    
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqSeckDel(id).then(res=>{
        successAlert(res.data.msg)
        this.changeSeck()
      })
    },
  },
  mounted() {
    this.changeSeck();
  },
};
</script>
<style scoped>

.el-table-column {
  width: 33.3%;
}
</style>