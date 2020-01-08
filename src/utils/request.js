// 封装请求模块
import axios from 'axios'
import jsonBig from 'json-bigint'
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
export default request
