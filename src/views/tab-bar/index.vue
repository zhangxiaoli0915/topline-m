<template>
  <div class="tab-bar">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="search" icon="search" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item name="friends" icon="friends-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="/my">
      {{$store.state.user?'我的':'未登录'}}
      </van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'TabBar'
    }
  }
}
</script>

<style>
</style>
