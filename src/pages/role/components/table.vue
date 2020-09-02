<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="角色编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180"></el-table-column>
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
import { reqRoleDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../util/alert";
export default {
  methods: {
    ...mapActions({
      changeRole: "role/changeRole",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    // 删除
    del(id) {
      reqRoleDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeRole()
        }
      });
    },
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },

  mounted() {
      this.changeRole();
    
  },
};
</script>
<style scoped>
</style>