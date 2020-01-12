<template>
  <div class="home-container">
      <van-nav-bar title="首页" />
      <van-tabs v-model="active">
  <van-tab :title="channel.name" v-for="channel in userChannels" :key="channel.id"><article-list :channel="channel"/></van-tab>
  <!-- <van-tab title="标签 2">内容 2</van-tab>
  <van-tab title="标签 3">内容 3</van-tab>
  <van-tab title="标签 4">内容 4</van-tab> -->
  <!-- <h2>{{channel.name}}的文章列表</h2> -->

</van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/channel'
import ArticleList from './components/article-list'
export default {
  // name: 'Homepage',
  components: {
    ArticleList

  },
  data () {
    return {
      active: 0,
      userChannels: []
      // channel: []
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

<style>

</style>
