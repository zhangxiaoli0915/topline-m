<template>
  <div>
       <!-- 搜索结果 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
      @click="$router.push(`/article/${article.art_id}`)"
        v-for="(article,index) in list"
        :key="index"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  props: {
    q: {
      type: String,
      required: true
    }
  },
  methods: {
    // onLoad () {
    //   // 异步更新数据
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1)
    //     }
    //     // 加载状态结束
    //     this.loading = false
    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true
    //     }
    //   }, 500)
    // }
    async onLoad () {
      // 请求数据
      const { data } = await getSearch({
        page: this.page,
        per_page: this.perPage,
        q: this.q
      })
      // 将数据添加到列表
      const { results } = data.data
      this.list.push(...results)
      //   关闭本次的loading
      this.loading = false
      //   判断是否还有数据
      if (results.length) {
        this.page++// 更新获取下一页数据的页码
      } else {
        this.finished = true// 没有数据了，结束关闭加载更多
      }
    }
  }

}
</script>

<style>

</style>
