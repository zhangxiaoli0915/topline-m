// import request from '../utils/request'

import request from '@/utils/request'
// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 获取验证码
export const getSmsCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
// 获取当前登录用户信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'

  })
}
// 获取指定登录用户信息
export const getUserById = userId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/users/${userId}`

  })
}
// 关注用户
export const addFollow = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
export const deleteFollow = userId => {
  return request({
    method: 'DELETE',
    url: ` /app/v1_0/user/followings/${userId}`,
    data: {
      target: userId
    }
  })
}
// 获取用户资料
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}
