<template>
  <div>
    <el-button type="primary" @click="show()">添 加</el-button>
    <!-- 数据展示 -->
      <!-- <v-table  @emit="emit($event)" ></v-table> -->
      <!-- 表单添加 -->
      <v-list :info="info" @hide="hide()" ref="add"></v-list>
  </div>
</template>
<script>
import vTable from './components/table'
import vList from './components/list'
export default {
  data() {
    return {
      info:{
        isShow:false,
        title:'添加菜单',
        edit:false
      }
    };
  },
  components: {
    vTable,
    vList
  },
  methods: {
    // 控制表单显示
    show(){

      this.info = {
        isShow:true,
        title:'添加菜单',
        edit:false
      };
    },
    // 自定义事件
    hide(){
      this.info.isShow = false
    },
    emit(id){
      this.info = {
        isShow:true,
        title:'编辑菜单',
        edit:true
      }
      this.$refs.add.look(id);
    }
  },
  mounted() {},
};
</script>
<style scoped>

</style>