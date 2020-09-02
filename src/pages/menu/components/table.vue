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
      <el-table-column prop="id" label="菜单编号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column prop="icon" label="菜单图标" sortable width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
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
import { reqMenuDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from '../../../util/alert';
export default {
  data() {
    return {};
  },
  components: {},
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  methods: {
    ...mapActions({
      changeMenu: "menu/changeMenu",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqMenuDel(id).then(res=>{
        successAlert(res.data.msg)
        this.changeMenu()
      })
    },
  },
  mounted() {
    this.changeMenu();
  },
};
</script>
<style scoped>
</style>