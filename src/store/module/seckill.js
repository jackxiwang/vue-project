import {reqSeckList} from '../../util/request'
const state = {
    list:[]
}
const mutations = {
    changeSeckList(state,arr){
        state.list = arr
    }
}
const actions = {
    changeSeck(context){
        reqSeckList().then(res=>{
            let arr = res.data.list === null ? []:res.data.list
            context.commit('changeSeckList',arr)
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
