<template>
  <div class="login-container">
    <van-nav-bar title="登录"/>
    <van-cell-group>
  <van-field
    v-model="user.mobile"
    clearable
    label="手机号"
    placeholder="请输入手机号"
  />
  <van-field
  v-model="user.code"
    label="验证码"
    placeholder="请输入验证码"
    left-icon="contact"
  ><van-button
       slot="button"
       size="small"
       type="primary"
       round
       >发送验证码</van-button></van-field>

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
    //   // 获取表单数据
      // const user = this.user
      //   // 表单验证
      //   // 请求登录
      //   const res = await request({
      //     method: 'POST',
      //     url: '/app/v1_0/authorizations',
      //     data: user
      //   })
      //   console.log(res)
      // }
      this.$toast.loading({
        duration: 10,
        forbidClick: true, // 是否禁止背景点击
        message: '登陆中···'
      })
      // console.log(res)
      try {
        const res = await request({
          method: 'POST',
          url: '/app/v1_0/authorizations',
          data: this.user
        })
        console.log('登录成功', res)
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
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
