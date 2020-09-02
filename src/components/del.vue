<template>
  <el-button type="danger" @click="open">删除</el-button>
</template>

<script>
  export default {
    methods: {
      open() {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('emit')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>
<style scoped>
</style>