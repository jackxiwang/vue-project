import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

Vue.use(Router)

const login = () => import('../pages/login/login')
const index = () => import('../pages/index/index')
const menu = () => import('../pages/menu/menu')
const role = () => import('../pages/role/role')
const spec = () => import('../pages/spec/spec')
const seckill = () => import('../pages/seckill/seckill')
const manage = () => import('../pages/manage/manage')
const member = () => import('../pages/member/member')
const goods = () => import('../pages/goods/goods')
const classify = () => import('../pages/classify/classify')
const banner = () => import('../pages/banner/banner')
const home = () => import('../pages/home/home')

function enter(str,next){
  store.state.user.msg.menus_url.some(item=>item=='/'+str)?next():next('/')
}
export const loginChild = [
  {
    path: 'menu', component: menu, name: '菜单管理',
    beforeEnter(to, from, next) {
      enter('menu',next)
    }
  },
  {
    path: 'role', component: role, name: '角色管理', 
    beforeEnter(to, from, next) {
      enter('role',next)
    }
  },
  {
    path: 'spec', component: spec, name: '商品规格', beforeEnter(to, from, next) {
      enter('spec',next)
    }
  },
  {
    path: 'seckill', component: seckill, name: '秒杀活动', beforeEnter(to, from, next) {
      enter('seckill',next)    }
  },
  {
    path: 'manage', component: manage, name: '管理员管理', beforeEnter(to, from, next) {
      enter('manage',next)      }
  },
  {
    path: 'member', component: member, name: '会员管理', beforeEnter(to, from, next) {
      enter('member',next)    }
  },
  {
    path: 'goods', component: goods, name: '商品管理', beforeEnter(to, from, next) {
      enter('goods',next)     }
  },
  {
    path: 'classify', component: classify, name: '商品分类', beforeEnter(to, from, next) {
      enter('classify',next)     }
  },
  {
    path: 'banner', component: banner, name: '轮播图管理', beforeEnter(to, from, next) {
      enter('banner',next)     }
  }
]

const router = new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        { path: '', component: home },
        ...loginChild
      ]
    },
    {
      path: '/login',
      component: login,

    }
  ]
})
// 全局路由
router.beforeEach((to, from, next) => {
  console.log(store);
  if (to.path === '/login') {
    next()
    return
  }
  if (store.state.user.msg.id) {
    next()
    
  } else {
    next('/login')
  }

})





export default router