import Vue from "vue"
let vm = new Vue()
//成功弹框
export const successAlert = (msg) => {
  vm.$message({
    message: msg,
    type: 'success'
  });
}

//警告弹框
export const warningAlert = msg => {
  vm.$message({
    message: msg,
    type: 'warning'
  });
}