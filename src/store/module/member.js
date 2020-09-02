import { reqMemberList } from '../../util/request'
const state = {
    list: []
}
const mutations = {
    changeMemberList(state, arr) {
        state.list = arr
    }
}
const actions = {
    changeMember(context) {
        reqMemberList().then(res => {
            let arr = res.data.list === null ? [] : res.data.list
            context.commit('changeMemberList', arr)
        })
    }
}
const getters = {
    list(state) {
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
