<template>
<!-- <div>{{channel.name}}频道的文章列表</div> -->
   <div class="article-list">
       <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
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
        @click="$router.push('/article/' + article.art_id)"
      />
    </van-list>
    </van-pull-refresh>

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
      timestamp: null,
      //   count: 0,
      isLoading: false

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
    },
    async onRefresh () {
    //   setTimeout(() => {
    //     this.$toast('刷新成功');
    //     this.isLoading = false;
    //     this.count++;
    //   }, 1000);
    // }
    // 下拉刷新组件会自动开启loading
    // 请求数据
      const { data } = await getArticlesByChannel({
        channel_id: this.channel.id, // 频道id
        timestamp: Date.now(),
        with_top: 1
      })
      // 将数据放到列表的顶部
      const { results } = data.data
      this.list.push(...results)
      // 关闭下拉刷新的loading
      this.loading = false
      this.$toast(`更新了${results.length}条数据`)
    }

  }
}
</script>

<style>

</style>
