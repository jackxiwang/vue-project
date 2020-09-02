import {reqRoleList} from '../../util/request'
const state = {
    list:[]
}
const mutations = {
    changeRoleList(state,arr){
        state.list = arr
    }
}
const actions = {
    changeRole(context){
        reqRoleList().then(res=>{
            let arr = res.data.list === null ? []:res.data.list
            context.commit('changeRoleList',arr)
        })
    }
}
const getters = {
    list(state){
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
