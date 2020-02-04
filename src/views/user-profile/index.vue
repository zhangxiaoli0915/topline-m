<template>
  <div class="user-profile">
      <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />

    <van-cell-group>
      <!-- <van-cell is-link title="头像"  @click="onSelectFile"> -->
          <van-cell is-link title="头像"  @click="onAvatarClick">
        <van-image
          class="avatar"
          round
          :src="user.photo"
        />
      </van-cell>
      <!-- <input
        type="file"
        hidden
        ref="file"
        @change="onFileChange"
      > -->
      <input ref="file" type="file" hidden @change="onFileChange">
      <van-cell is-link title="昵称" :value="user.name" @click="isEditNameShow=true" />
      <van-cell is-link title="介绍" value="内容" />
      <van-cell is-link title="性别" :value="user.gender===0?'男':'女'" />
      <van-cell is-link title="生日" :value="user.birthday" />
    </van-cell-group>
    <!-- 头像预览 -->
    <van-image-preview v-model="isPreviewShow" :images="images" @close="$refs.file.value = ''">
      <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确定"
        @click-left="isPreviewShow = false"
        @click-right="onUpdateAvatar"
      />
    </van-image-preview>
    <!-- /头像预览 -->
     <!-- 修改用户昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
    >
      <van-nav-bar
        title="编辑昵称"
        left-text="取消"
        right-text="确定"
        @click-left="isEditNameShow = false"
        @click-right="onUpdateName"
      />
      <div>
        <!-- <van-field
          v-model="message"
          rows="2"
          autosize
          type="textarea"
          maxlength="20"
          placeholder="请输入昵称"
          show-word-limit
        /> -->
      </div>
    </van-popup>
    <!-- /修改用户昵称 -->
  </div>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto } from '@/api/user'
// import { ImagePreview } from 'vant'
export default {
  data () {
    return {
      user: {}, // 用户资料
      isPreviewShow: false,
      images: [], // 预览的图片列表
      isEditNameShow: false,
      message: '123'

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
    },
    onAvatarClick () {
      this.file.click()
    },
    onFileChange () {
      // 预览图片
      // 拿到file类型input选择的文件对象
      const fileObj = this.file.files[0]
      //   const fileData = URL.createObjectURL(fileObj)
      //   ImagePreview({
      //     images: [fileData], // 预览的图片列表
      //     onClose: this.savePhoto
      //   })
      // 2. 使用 window.URL.createObjectURL(file) 得到文件数据
      const fileData = window.URL.createObjectURL(fileObj)
      // 3. 将 img.src = 第2步的结果
      this.images = [fileData] // 这里直接重置数组，防止出现多个预览图片
      this.isPreviewShow = true
      // 如果需要定义里面的模板内容，则通过模板的方式来使用这个组件
      // ImagePreview({
      //   images: [
      //     fileData
      //   ]
      // })
    },
    // async savePhoto () {
    //   await this.$dialog.confirm({
    //     title: '头像选择',
    //     message: '确认使用该图片作为头像吗？'
    //   })
    async onUpdateAvatar () {
      // 1. 构造包含文件数据的表单对象 FormData
      // 注意：含有文件的数据务必要放到 FormData 中
    //   const fd = new FormData()
    //   fd.append('photo', this.file.files[0])
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '保存中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        // // 通过 file-input 获取文件对象
        // const fileObj = this.file.files[0]
        // // 构造包含文件的表单对象
        // const fd = new FormData()
        // fd.append('photo', fileObj)
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await updateUserPhoto(fd)
        // // 请求提交
        // await updateUserPhoto(fd)
        // 更新页面
        this.user.photo = data.data.photo
        // // 更新视图
        // this.user.photo = URL.createObjectURL(fileObj)
        // 关闭图片预览
        this.isPreviewShow = false
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    //   根据响应结果执行后续处理
    },
    onUpdateName () {
      console.log('onUpdateName')
    }

  },
  computed: {
    // 这里的目的主要是为了访问方便
    // 每次访问 ref 成员都需要：this.$refs['file']
    // 因为多次访问到了该成员，所以我可以使用计算属性封装简化对成员的访问
    file () {
      return this.$refs['file']
    }
  },
  name: 'UserProfile'

}
</script>

<style scoped lang="less">
/deep/ .van-image-preview__cover {
    top: unset;
    left: 0;
    right: 0;
    bottom: 0;
    .van-nav-bar {
      background: #000;
    }
  }
  .van-popup {
    /deep/ .van-nav-bar {
      background: #fff;
      .van-nav-bar__title {
        color: #323233;
      }
    }
  }

</style>
