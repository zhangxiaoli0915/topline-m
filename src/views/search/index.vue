<template>
  <div class="search-container">
       <form class="search-form" action="/">
      <van-search
        v-model="searchContent"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchContent)"
        @cancel="$router.back()"
        @focus="isSearchResultShow=false"
        @input="onSearchInput"
      />
    </form>

    <!-- 搜索结果 -->
    <!-- <search-result/> -->
    <search-result
    v-if="isSearchResultShow"
    :q="searchContent"
    />
    <!-- 联想建议 -->
     <van-cell-group v-else-if="searchContent">
      <van-cell
       icon="search"
       v-for="(item,index) in suggestions"
       :key="index"
       @click="onSearch(item)">
       <div slot="title" v-html="highlight(item)"></div>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->

    <van-cell-group v-else>
      <van-cell title="历史记录">
      <van-icon name="delete" />
     <template v-if="isDeleteShow">
        <span @click="searchHistories=[]">全部删除</span>
      &nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
     </template>
     <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
      <van-cell
      :title="item"
      v-for="(item,index) in searchHistories"
      :key="index"
      @click="onHistoryClick(item,index)">
        <van-icon v-show="isDeleteShow" name="close"></van-icon>
      </van-cell>
    </van-cell-group>

    <!-- /历史记录 -->

  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
import { getItem, setItem } from '@/utils/storage'
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
      suggestions: [],
      // searchHistories: [],  搜索历史记录
      searchHistories: getItem('search-histories') || [],
      isDeleteShow: false
    }
  },
  watch: {
    searchHistories (val) {
      setItem('serach-histories', val)
    }
  },
  methods: {
    onHistoryClick (item, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
      } else {
        // 否则执行搜索操作
        this.onSearch(item)
      }
    },
    highlight (str) {
      const searchContent = this.searchContent
      const reg = new RegExp(searchContent, 'gi')
      return str.replace(reg, `<span style="color:#3296fa">${searchContent}</span>`)
    },
    // async onSearchInput () {

    // },
    onSearchInput: debounce(async function () {
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
    }, 200),
    // onSearch () {
    //   console.log('onSearch')
    //   this.isSearchResultShow = true
    // },
    onSearch (q) {
      // 更新搜索文本框的数据
      this.searchContent = q
      // 记录搜索历史记录
      const searchHistories = this.searchHistories
      const index = searchHistories.indexOf(q)
      if (index !== -1) {
        searchHistories.splice(index)
      }
      searchHistories.unshift(q)
      // 展示搜索结果
      this.isSearchResultShow = true
    }
    // onCancel () {
    //   console.log('onCancel')
    // }
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
