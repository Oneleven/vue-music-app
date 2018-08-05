<template>
  <div class="search">
    <search-box ref="searchBox" @query="handleQueryChange"></search-box>
    <div class="hot-search-wrapper" v-show="!query">
      <h1>热门搜索</h1>
      <ul class="hot-list">
        <li v-for="hotkey of hotKeys"
            :key=hotkey.n
            @click="handleChoosen(hotkey.k)"><span>{{ hotkey.k }}</span></li>
      </ul>
    </div>
    <suggest :query="query"
             v-show="query"
             @hideKeyBoard="blurInput"
             @select="saveSearch"></suggest>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import { getSearchKey } from 'api/search'
import { CODE_OK } from 'api/config'
import { mapActions } from 'vuex'

export default {
  name: 'home-search',

  components: {
    SearchBox,
    Suggest
  },

  data () {
    return {
      hotKeys: [],
      query: ''
    }
  },

  created () {
    this._getSearchKey()
  },

  methods: {
    ...mapActions([
      'saveSearchHistory'
    ]),

    _getSearchKey () {
      getSearchKey().then((res) => {
        if (res.code === CODE_OK) {
          this.hotKeys = res.data.hotkey.slice(0, 10)
        }
      })
    },

    handleChoosen (name) {
      this.$refs.searchBox.setQuery(name)
    },

    handleQueryChange (query) {
      this.query = query
    },

    // 把input失焦，从而滚动的时候隐藏键盘
    blurInput () {
      this.$refs.searchBox.blur()
    },

    // 存储歌曲数据
    saveSearch () {
      this.saveSearchHistory(this.query)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.search
  navStyle()
  .hot-search-wrapper
    margin 0 .4rem .4rem .4rem
    height 3.4rem
    h1
      color $fontcolor
      font-size .28rem
      margin-bottom .4rem
    .hot-list
      display flex
      flex-wrap wrap
      li
        padding .1rem .2rem
        margin 0 .4rem .2rem 0
        background-color #333333
        color $fontcolor
        border-radius .12rem
</style>