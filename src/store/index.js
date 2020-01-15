import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'
import decodeJwt from 'jwt-decode'
const USER_KEY = 'user'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前用户的登陆状态
    // user: null
    user: getItem(USER_KEY)

  },
  mutations: {
    // 登录成功和退出登录都会调用
    // 修改state中的数据  data为用户传入数据，用此接收
    setUser (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
