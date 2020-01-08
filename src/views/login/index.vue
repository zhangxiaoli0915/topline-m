<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="user.mobile" clearable label="手机号" placeholder="请输入手机号">
        <i class="icon-shouji" slot="left-icon"></i>
      </van-field>
      <van-field v-model="user.code" label="验证码" placeholder="请输入验证码">
        <i class="icon-mima" slot="left-icon"></i>

        <van-count-down v-if="isCountDownShow" slot="button" :time="1000*5" format="ss s"
        @finish="isCountDownShow=false" />
        <van-button v-else slot="button" size="small" type="primary" round
        @click="onSendSmsCode"
        >发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="login-btn-container">
      <van-button type="info" @click="onLogin">登录</van-button>
    </div>
  </div>
</template>
<script>
// import request from '@/utils/request'
import { login, getSmsCode } from '@/api/user'

export default {
  name: 'LoginPage',
  component: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false // 是否显示倒计时
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
        duration: 0,
        forbidClick: true, // 是否禁止背景点击
        message: '登陆中···'
      })
      // console.log(res)
      try {
        // const res = await request({
        //   method: 'POST',
        //   url: '/app/v1_0/authorizations',
        //   data: this.user
        // })
        const res = await login(this.user)
        console.log('登录成功', res)
        // 提示成功
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    async onSendSmsCode () {
      try {
        const { mobile } = this.user
        // 验证手机号是否有效
        // 请求发送短信验证码
        const res = await getSmsCode(mobile)
        console.log(res)

        // 显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        console.log(err)
        this.$toast('请勿频繁操作')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-container {
    padding: 20px;
    .van-button {
      width: 100%;
    }
  }
}
</style>
