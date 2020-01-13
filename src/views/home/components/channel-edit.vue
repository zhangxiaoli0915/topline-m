<template>
  <div class="channel-edit">
      <van-cell class="channel-header" title="我的频道" :border="false">
          <van-button size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>
     <van-grid :gutter="10" clickable>
  <van-grid-item
    v-for="channel in userChannels"
    :key="channel.id"
    :text="channel.name"
  />
</van-grid>
 <van-cell class="channel-header" title="推荐频道" :border="false">
          <van-button size="mini" round type="danger">编辑</van-button>
      </van-cell>
     <van-grid :gutter="10" clickable>
  <van-grid-item
    v-for="channel in remainingChannels"
    :key="channel.id"
    :text="channel.name"
  />
</van-grid>
  </div>
</template>
<script>
import { getAllChannels } from '@/api/channel'
export default {
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannel: []
    }
  },
  methods: {
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    }
  },
  computed: {
    remainingChannels () {
      const channels = []
      const { allChannels, userChannels } = this
      console.log(this)
      //   allChannels.forEach(item => {
      //     if (!userChannels.find(c => c.id === item.id)) {
      //       channels.push(item)
      //     }
      //   })
      for (let index in channels) {
        console.log(index, channels[index])
        channels.push(allChannels)
      }
      return channels
    }
  }//   computed: {
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
    .van-grid-item__content {
      background: #f4f5f6;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #222;
    }
  }
}

</style>
