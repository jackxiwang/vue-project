<template>
  <div>
      <!-- table展示数据 -->
      <v-table @emit="emit"></v-table>
      <!-- listfrom 操作 -->
      <v-list :info="info" ref="list"></v-list>
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
    emit(id){
      this.info = {
        isShow:true,
        title:'会员修改',
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