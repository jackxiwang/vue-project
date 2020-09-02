// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入公共样式
import './assets/css/reset.css'
// 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入过滤器
import Filters from './filter/index'
for (let i in Filters) {
  Vue.filter(i,Filters[i])
}
// 公共组件
import Commponents from './components/index'
for (let i in Commponents){
  Vue.component(i,Commponents[i])
}
// 图片地址
Vue.prototype.$preImg = 'http://localhost:3000/'
// vuex仓库
import store from './store/index'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
