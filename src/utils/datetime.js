import moment from 'moment'
import Vue from 'vue'
// 配置中文语言
moment.locale('zh-cn')
// 相对时间
Vue.filter('relativeTime', value => {
  return moment(value).startOf('hour').fromNow()
})
// 日期格式化
//
