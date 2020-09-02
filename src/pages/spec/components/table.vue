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
      <el-table-column prop="id" label="规格编号" sortable width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180"></el-table-column>
      <el-table-column  label="规格属性">
         <template slot-scope="scope">
           <el-tag type="success" v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
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
import { reqSpecsDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../util/alert";
export default {
  data() {
    return {
    };
  },
  components: {},
  computed: {
    ...mapGetters({
      list: "spec/list",
      size:"spec/size",
      total:"spec/total"
    }),
  },
  methods: {
    ...mapActions({
      changeSpec: "spec/changeSpec",
      changeTotal:"spec/changeTotalAction",
      changePage:"spec/changePageAction"
    }),
    // 改变当前页数
    changeCurrent(page){
      this.changePage(page)
    },
    // 编辑按钮
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqSpecsDel(id).then((res) => {
        successAlert(res.data.msg);
        // 重置数据总数
        this.changePage(1);
        this.changeTotal()
      });
    },
  },
 
  mounted() {
    this.changeSpec();
    this.changeTotal();
  },
};
</script>
<style scoped>
</style>