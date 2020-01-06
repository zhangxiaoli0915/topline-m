import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  cell,
  CellGroup

} from 'vant'
// 加载注册Vant模块
import './utils/register-vant'
import './styles/index.less'

Vue.config.productionTip = false
Vue.use(Button)
  .use(cell)
  .use(CellGroup)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
