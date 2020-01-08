import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/validation.js'

// 加载注册Vant模块
// import './utils/register-vant'
import './utils/register-vant.js'
import './styles/index.less'
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
