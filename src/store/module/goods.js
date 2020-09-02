import { reqGoodsList,reqGoodsTotal } from '../../util/request'
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
    changeGoodsList(state, arr) {
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
    changeGoods(context,bool) {
       let param = bool?{}:{ page:context.state.page, size: context.state.size,fid:null,sid:null };
        reqGoodsList(param).then(res => {
            let arr = res.data.list === null ? [] : res.data.list;
            context.commit('changeGoodsList', arr)
        })
    },
    // 改变数据总数
    changeTotalAction(context) {
        reqGoodsTotal().then(res => {
            context.commit('changeTotal',res.data.list[0].total)
        })
    },
    // 修改当前页
    changePageAction(context,page) {
        context.commit('changePage',page)
        context.dispatch('changeGoods')
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
