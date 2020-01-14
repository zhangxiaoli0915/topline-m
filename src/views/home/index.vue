<template>
  <div class="home-container">
      <!-- <van-nav-bar title="首页" fixed/> -->
        <div class="nav-bar">
      <div class="logo"></div>
      <van-button
        class="search-btn"
        round
        type="info"
        size="small"
        icon="search"
        @click="$router.push('/search')"
      >搜索</van-button>
    </div>
      <van-tabs v-model="active">
        <van-icon
        class="wap-nav"
        slot="nav-right"
        name="wap-nav"
        @click="isChannelEditShow = true"
      />
  <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id"><article-list :channel="channel"/></van-tab>
  <!-- <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab> -->
  <!-- <h2>{{channel.name}}的文章列表</h2> -->
</van-tabs>
<van-popup
      v-model="isChannelEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      round
      closeable
      close-icon-position="top-left">
    <!-- <channel-edit :user-channels="userChannels"/> -->
     <channel-edit
        :user-channels="userChannels"
        :active="active"
        @switch="onChannelSwitch"
      />
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
import { getItem } from '@/utils/storage'
export default {
  name: 'Homepage',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      userChannels: [],
      isChannelEditShow: false
    }
  },
  created () {
    this.loadUserChannels()
  },
  methods: {
    async loadUserChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.userChannels = data.data.channels
        // 1. 声明变量存储频道数据
        let channels = []
        // 2. 获取本地存储的频道列表
        const localUserChannels = getItem('user-channels')
        // 3. 如果有本地存储的则使用本地存储逇
        if (localUserChannels) {
          channels = localUserChannels
        } else {
          // 4. 如果没有本地存储的，则使用接口的
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
        // 5. 将数据赋值给当前组件数据
        this.userChannels = channels
        // console.log(data)
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    },
    onChannelSwitch (index) {
      this.active = index // 切换激活频道
      this.isChannelEditShow = false // 关闭弹层
    }
  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
// /deep/ .van-tabs__wrap {
//   position: fixed;
//   top: 46px;
//   left: 0;
//   right: 0;
//   z-index: 1;
// }
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
// .wap-nav{
//   position: fixed;
//   right: 0;
//   line-height: 44px;
//   background: #fff;
//   opacity: .8;
// }
.wap-nav {
    position: fixed;
    right: 0;
    line-height: 44px;
    background: #fff;
    opacity: .8;
  }
 .nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    height: 46px;
    background-color: #3196fa;
    z-index: 1;
    .logo {
      background: url("./logo-light.png") no-repeat;
      background-size: cover;
      width: 100px;
      height: 30px;
    }
    .search-btn {
      background-color: #5babfb;
      width: 50%;
    }
  }

</style>
