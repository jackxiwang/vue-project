<template>
  <div>
      <el-button type="primary" @click="show()">添 加</el-button>
      <!-- table展示数据 -->
      <v-table @emit="emit"></v-table>
      <!-- listfrom 操作 -->
      <v-list :info="info" ref="list" @hide="hide"></v-list>
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
        title:'添加规格',
        edit:false
      }
    };
  },
  components: {
    vTable,
    vList
  },
  methods: {
    show(){
      this.info= {
        isShow:true,
        title:'添加规格',
        edit:false
      }
    },
    hide(){
      this.info.isShow = false
    },
    emit(id){
      this.info = {
        isShow:true,
        title:'修改规格',
        edit:true
      }
      this.$refs.list.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>