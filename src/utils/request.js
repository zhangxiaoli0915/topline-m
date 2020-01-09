// 封装请求模块
import axios from 'axios'
import jsonBig from 'json-bigint'
// 在非组件模块中直接加载获取容器
import store from '../store'
// axios.creat方法：复制一个axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
request.defaults.transformResponse = [function (data) {
  try {
    // return jsonBig.parse(data)
    return jsonBig.parse(data)
  } catch (err) {
    console.log('转换失败', err)
    return {}
  }
}]
// 请求拦截器
request.interceptors.request.use(function (config) {
  // config 请求配置对象
  // 可以通过修改config来实现统一请求数据处理
  const { user } = store.state
  // 统一添加token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

// 导出
export default request
