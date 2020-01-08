<template>
  <div class="login-container">
    <van-nav-bar title="登录"/>
    <van-cell-group>
  <van-field
    required
    clearable
    label="用户名"
    placeholder="请输入用户名"
  />

  <van-field
    label="密码"
    placeholder="请输入密码"
    required
  />
</van-cell-group>
<div class="login-btn-container">
  <van-button type="info" >登录</van-button>
</div>

  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  component: {},
  props: {},
  data () {
    return {}
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
