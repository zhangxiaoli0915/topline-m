<template>
  <div class="channel-edit">
      <van-cell class="channel-header" title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEditShow =!isEditShow "
      >{{isEditShow ?'完成':'编辑'}}</van-button>
      </van-cell>
     <van-grid :gutter="10" clickable>
  <van-grid-item
    v-for="(channel,index) in userChannels"
    :key="channel.id"

    @click="onUserChannelClick(index)"
  >
    <!--
          :class="{
            active: index === active
          }"
          样式绑定。
          属性名：CSS 类名
          属性值：一个布尔值
         -->
        <span
          slot="text"
          class="text"
          :class="{
            active: index === active
          }"
        >{{ channel.name }}</span>
  <van-icon v-show="isEditShow  && index !==0" slot="icon" name="close" />
  </van-grid-item>
</van-grid>
 <van-cell class="channel-header" title="推荐频道" :border="false">
          <van-button size="mini" round type="danger">编辑</van-button>
      </van-cell>
     <van-grid :gutter="10" clickable>
  <van-grid-item
   v-for="channel in remainingChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"

  />
</van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channel'
import { setItem } from '@/utils/storage'
export default {
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEditShow: false
    }
  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    //   console.log(this.allChannels)
    },
    onAdd (channel) {
      this.userChannels.push(channel)
    },
    onUserChannelClick (index) {
      if (this.isEditShow && index !== 0) {
        this.userChannels.splice(index, 1)
      } else {
        this.$emit('switch', index)
      }
    }

  },
  computed: {
    remainingChannels () {
      const channels = []
      //   const { allChannels, userChannels } = this
      //   console.log(allChannels)
      this.allChannels.forEach(item => {
        // console.log(item)
        // 当前的遍历项是否属于我的频道，如果不是，那就收集到 channels
        // userChannels 是否包含 item
        // find 会遍历数组，它会对每个元素执行 c.id === item.id 条件判定
        // 如果 true，则返回该元素，如果直到遍历结束都没有符合条件的元素，则返回 undefined
        // if (!userChannels.find(c => c.id === item.id)) {
        if (!this.userChannels.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })

      //   for (let index in channels) {
      //     console.log(index, channels[index])
      //     channels.push(channels)
      //   }
      return channels
    }

  },
  watch: {
    // 当 userChannels 发生变化，会调用该函数
    userChannels (newVal) {
      // 同步到本地存储
      setItem('user-channels', newVal)
    }
  }
  //   computed: {
  //     remainingChannels () {
  //       const channels = []
  //       const { allChannels, userChannels } = this
  //       allChannels.forEach(item => {
  //         if (!userChannels.find(c => c.id === item.id)) {
  //           channels.push(item)
  //         }
  //       })
  //       return channels
  //     }

  //   }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding-top: 40px;
  .channel-header {
    font-size: 16px;
    color: #333;
  }
  /deep/ .van-grid-item {
    width: 80px;
    height: 43px;
    position: relative;
    .van-grid-item__icon-wrapper{
        position: absolute;
        top: -14px;
        right: -5px;
        .van-icon-close {
        font-size: 14px;
      }
    }
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text, .text {
      font-size: 14px;
      color: #222;
    }
    .active{
        color: red;
    }
  }
}

</style>
