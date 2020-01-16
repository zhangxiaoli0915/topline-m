<template>
<div class="article-comments">
    {{articleId}}
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <!-- <van-cell -->
    <Comment-item
    v-for="(item,index) in list"
    :key="index"
    :comment="item"
  />
</van-list>
</div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 20
    }
  },
  methods: {
    async onLoad () {
    // 请求获取数据
      const { data } = await getComments({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: this.limit
      })
      // 将数据添加到列表中
      //   console.log(data)
      const { results } = data.data
      console.log(results)
      this.list.push(...results)
      // 关闭loading
      this.loading = false
      //   判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }

}
</script>

<style>

</style>
