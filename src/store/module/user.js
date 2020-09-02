const state={
    msg:sessionStorage.getItem('msg')?JSON.parse(sessionStorage.getItem('msg')):{}
}
const mutations={
    changeUser(state,msg){
        state.msg = msg
        // 本地保存
        if(msg.username){
            sessionStorage.setItem('msg',JSON.stringify(msg))
        }else {
            sessionStorage.removeItem('msg')
        }
    }
}
const actions = {
    changeUserAction(context,msg){
        context.commit('changeUser',msg)
    }
}
const getters = {
    msg(state){
        return state.msg
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}