<template>
  <div class="user-profile">
      <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group>
      <van-cell is-link title="头像">
        <van-image
          class="avatar"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="昵称" :value="user.name" />
      <van-cell is-link title="介绍" value="内容" />
      <van-cell is-link title="性别" :value="user.gender===0?'男':'女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>
  </div>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  data () {
    return {
      user: {}// 用户资料
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    }
  },
  name: 'UserProfile'

}
</script>

<style scoped lang="less">

</style>
