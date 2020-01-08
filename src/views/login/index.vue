<template>
  <div class="login-container">
    <van-nav-bar title="登录"/>
    <van-cell-group>
  <van-field
    v-model="user.mobile"
    required
    clearable
    label="手机号"
    placeholder="请输入手机号"
  />

  <van-field
  v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
    required
  />
</van-cell-group>
<div class="login-btn-container">
  <van-button type="info" @click="onLogin">登录</van-button>
</div>

  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginPage',
  component: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onLogin () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      // 请求登录
      const res = await request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data: user
      })
      console.log(res)
    }

  }

}
</script>

<style lang="less" scoped>
.login-container{
  .login-btn-container{
    padding:20px;
    .van-button{
      width: 100%;
    }
  }
}

</style>
