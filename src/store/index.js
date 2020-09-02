import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import actions from './actions'
import { state, mutations, getters } from './mutations'
import menu from './module/menu'
import role from './module/role'
import manage from './module/manage'
import member from './module/member'
import cate from './module/cate'
import spec from './module/spec'
import banner from './module/banner'
import goods from './module/goods'
import user from './module/user'
import seckill from './module/seckill'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    modules: {
        menu,
        role,
        manage, 
        member,
        cate,
        spec,
        banner,
        goods,
        user,
        seckill
    }

})