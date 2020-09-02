import {reqCateList} from '../../util/request'
const state = {
    list:[]
}
const mutations = {
    changeCateList(state,arr){
        state.list = arr
    }
}
const actions = {
    changeCate(context){
        reqCateList({istree:true}).then(res=>{
            context.commit('changeCateList',res.data.list)
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
