<template>
  <div class="post-comment">
  <van-field
  class="post-field"
  :value="value"
  @input="$emit('input',$event)"
  rows="2"
  autosize
  type="textarea"
  maxlength="50"
  placeholder="优质评论将会被优先展示"
  show-word-limit />
  <van-button
      class="post-btn"
      type="primary"
      disabled
      size="small"
      @click="$emit('click-post')"
    >发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    // async onPost () {
    //   const { data } = await addComment({
    //     target: this.articleId,
    //     content: this.message
    //     // art_id
    //   })
    //   console.log(data)
    // }
    onInput (value) {
      this.$emit('input', value)
    }

  }

}
</script>

<style lang="less" scoped>
.post-comment {
  display: flex;
  padding: 15px;
  // align-items: center;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right:15px;
  }
  // .post-btn {
  //   margin-left: 10px;
  // }
}

</style>
