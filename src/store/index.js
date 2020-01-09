import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前用户的登陆状态
    // user: null
    user: getItem('user')

  },
  mutations: {
    // 修改state中的数据  data为用户传入数据，用此接收
    setUser (state, data) {
      state.user = data
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
