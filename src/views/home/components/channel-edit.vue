<template>
  <div class="channel-edit">
      <van-cell title="我的频道" :border="false">
          <van-button size="mini" round type="danger">编辑</van-button>
      </van-cell>
     <van-grid :gutter="10">
  <van-grid-item
    v-for="value in 8"
    :key="value"
    icon="photo-o"
    text="文字"
  />
</van-grid>
 <van-cell title="推荐频道" :border="false">
          <van-button size="mini" round type="danger">编辑</van-button>
      </van-cell>
     <van-grid :gutter="10">
  <van-grid-item
    v-for="value in 8"
    :key="value"
    icon="photo-o"
    text="文字"
  />
</van-grid>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
