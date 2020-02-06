<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
    <!-- <van-cell v-for="(article,index) in list" :key="index" :title="article.title" /> -->
    <van-cell
       v-for="(article,index) in list"
       :key="index"
       :title="article.title"
       @click="$router.push({
           name:'article',
           params:{
               articleId: article.art_id.toString()
           }
       })
               " />
  </van-list>
</template>

<script>
import { getCurrentUserArticles } from '@/api/article'
export default {
  name: 'UserArticle',
  components: {},
  props: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // 当前页码
      perPage: 10// 每页大小
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // onLoad () {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getCurrentUserArticles({
        page: this.page,
        per_page: this.perPage
      })
      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)
      // // 加载状态结束
      // this.loading = false
      // 3.关闭本次loading结束
      this.loading = false
      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true
      //     }
      //   }, 1000)
      // 4.判断是否还有数据
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true
      }
    }
  }

}
</script>

<style>

</style>
