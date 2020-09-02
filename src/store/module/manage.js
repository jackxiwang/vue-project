import { reqUserList,reqUserTotal } from '../../util/request'
const state = {
    list: [],
    // 数据总数
    total: 0,
    // 一页显示数据
    size:3,
    // 当前页
    page:1
}
const mutations = {
    changeManageList(state, arr) {
        state.list = arr
    },
    changeTotal(state, num) {
        state.total = num
    },
    changePage(state,page){
        state.page = page
    }
}
const actions = {
    changeManage(context) {
        reqUserList({ page:context.state.page, size: context.state.size }).then(res => {
            let arr = res.data.list === null ? [] : res.data.list;
            context.commit('changeManageList', arr)
        })
    },
    // 改变数据总数
    changeTotalAction(context) {
        reqUserTotal().then(res => {
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 修改当前页
    changePageAction(context,page) {
        context.commit('changePage',page)
        context.dispatch('changeManage')
    }
}
const getters = {
    list(state) {
        return state.list
    },
    total(state) {
        return state.total
    },
    size(state){
        return state.size
    },
    page(state) {
        return state.page
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}
