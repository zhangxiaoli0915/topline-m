<template>
  <div class="home-container">
      <van-nav-bar title="首页" fixed/>
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
    <channel-edit/>
    </van-popup>

  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
import ChannelEdit from './components/channel-edit'
export default {
  // name: 'Homepage',
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
        const { data } = await getUserChannels()
        this.userChannels = data.data.channels
        // console.log(data)
      } catch (err) {
        console.log(err)
        this.$toast('获取频道数据失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 90px;
  padding-bottom: 50px;
}
/deep/ .van-tabs__wrap {
  position: fixed;
  top: 46px;
  left: 0;
  right: 0;
  z-index: 1;
}
.wap-nav{
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
  opacity: .8;
}

</style>
