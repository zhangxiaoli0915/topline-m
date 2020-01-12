<template>
<!-- <div>{{channel.name}}频道的文章列表</div> -->
   <div class="article-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getArticlesByChannel } from '@/api/article'
export default {
  name: 'ArticleList',
  components: {},
  //   props: ['channel'],
  props: {
    // 参考文档：https://cn.vuejs.org/v2/guide/components-props.html#Prop-%E9%AA%8C%E8%AF%81
    channel: {
      type: Object, // 必须是对象
      required: true // 必须传递该数据
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {

    async onLoad () {
      // 请求获取数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道id
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   把数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // 加载状态结束  停止本次的loading
      this.loading = false
      // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      //   }, 500)
      // 判断数据是否加载结束
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
