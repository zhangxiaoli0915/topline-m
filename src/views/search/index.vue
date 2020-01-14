<template>
  <div class="search-container">
       <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
        @focus="isSearchResultShow=false"
        @input="onSearchInput"
      />
    </form>

    <!-- 搜索结果 -->
    <!-- <search-result/> -->
    <search-result v-if="isSearchResultShow"/>
    <!-- 联想建议 -->
     <van-cell-group v-else-if="searchContent">
      <van-cell
       icon="search"
       :title="item"
       v-for="(item,index) in suggestions"
       :key="index" />
    </van-cell-group>
    <!-- 历史记录 -->

    <van-cell-group v-else>
      <van-cell title="历史记录">
      <van-icon name="delete" />
      <span>全部删除</span>
      &nbsp;&nbsp;
      <span>完成</span>
    </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close"></van-icon>
      </van-cell>
    </van-cell-group>
    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
export default {
  components: {
    SearchResult
  },
  data () {
    return {
      searchContent: '', // 搜索内容
      // list: [],
      // loading: false,
      // finished: false
      isSearchResultShow: false, // 是否展示搜索结果
      suggestions: []
    }
  },
  methods: {
    async onSearchInput () {
      const searchContent = this.searchContent
      if (!searchContent) {
        return
      }
      // 请求数据
      const { data } = await getSuggestions(searchContent)
      // 将数据添加到实例中
      this.suggestions = data.data.options
      // console.log(this.suggestions)
      // 模板绑定
    },
    onSearch () {
      console.log('onSearch')
      this.isSearchResultShow = true
    },
    onCancel () {
      console.log('onCancel')
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  // 让搜索栏固定在顶部
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}

</style>
