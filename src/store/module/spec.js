import { reqSpecsList,reqSpecsTotal } from '../../util/request'
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
    changeSpecList(state, arr) {
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
    changeSpec(context,bool) {
        let param = bool?{}:{ page:context.state.page, size: context.state.size }
        reqSpecsList(param).then(res => {
            let arr = res.data.list === null ? [] : res.data.list;
            arr.forEach(item=>{item.attrs = JSON.parse(item.attrs)})
            context.commit('changeSpecList', arr)
        })
    },
    // 改变数据总数
    changeTotalAction(context) {
        reqSpecsTotal().then(res => {
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 修改当前页
    changePageAction(context,page) {
        context.commit('changePage',page)
        context.dispatch('changeSpec')
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
