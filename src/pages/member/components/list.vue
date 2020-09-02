<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form" :rules="rules" ref="rule">
        <el-form-item label="手机号" :label-width="width" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="width" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="pwd" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hide()">取 消</el-button>
        <el-button type="primary" v-if="info.edit" @click="reset()">修 改</el-button>
        <el-button type="primary" @click="add()" v-else>添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqMemberDetail,reqMemberReset } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  data() {
    return {
      width: "180px",
      form: {
        phone: "",
        nickname:"",
        password:"",
        status: 1,
      },
      rules:{
        phone:[
         { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        nickname:[
         { required: true, message: '请输入昵称', trigger: 'blur' },
        ]
      },
      pwd:'',
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  computed: {
    ...mapGetters({
        memList:'member/list'
    }),
  },
  methods: {
    ...mapActions({
      changeList: "member/changeMember",
    }),
    // closed
     close() {
      this.$refs.rule.clearValidate()
    },
    hide() {
      this.info.isShow = false;
    },
    empty() {
      this.form = {
        rolename: "",
        status: 1,
        menus: [],
      }
    },
    // 编辑查看信息
    look(id){
      
      reqMemberDetail(id).then(res=>{
        if(res.data.code == 200){
          this.form = res.data.list;
          this.form.password = this.pwd?this.pwd:res.data.list.password
          this.uid = id;
        }else {
          warningAlert(res.data.msg)
        }
      })
    },
    // 修改信息
    reset(){
       if(this.form.phone===''){
        warningAlert("请填写手机号")
        return
      }
       if(this.form.nickname===''){
        warningAlert("请填写昵称")
        return
      }
      reqMemberReset(this.form).then(res=>{
        if(res.data.code == 200){
          successAlert(res.data.msg);
          this.hide();
          this.empty();
          this.changeList();
        }else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {
    if(this.memList.length === 0){
      this.changeList();
    }
    
  },
};
</script>
<style scoped>
</style>