<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <v-del @emit="del(scope.row.uid)"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="size"
      :pager-count="5"
      layout="prev, pager, next"
      :total="total"
      :current-page = "page"
      background
      @current-change="changeCurrent"
    ></el-pagination>
  </div>
</template>
<script>
import { reqUserDel } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert } from "../../../util/alert";
export default {
  methods: {
    ...mapActions({
      //   changeRole: "role/changeRole",
      changeMan: "manage/changeManage",
      changePage: "manage/changePageAction",
      changeTotal: "manage/changeTotalAction",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    // 删除
    del(id) {
      reqUserDel(id).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          //   刷新页面
          this.changeMan();
          //   计算总数
          this.changeTotal();
          // 当前页置1
          this.changePage(1);

        }
      });
    },
    changeCurrent(page) {
      this.changePage(page);
    //   this.changeMan();
    },
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total: "manage/total",
      size: "manage/size",
      page:"manage/page"
    }),
  },

  mounted() {
    this.changeMan();
    this.changeTotal();
  },
};
</script>
<style scoped>
</style>