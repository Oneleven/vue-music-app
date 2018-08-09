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
    <div class="search-history" v-show="searchHistory.length">
      <div class="title-wrapper">
        <span>搜索历史</span>
        <svg class="icon" aria-hidden="true" @click="showConfirm">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <scroll class="scroll" :data="searchHistory" ref="searchScroll">
        <search-list :searches="searchHistory"
                    @select="handleChoosen"
                    @delete="deleteOne"
                    class="search-list"></search-list>
      </scroll>
    </div>
    <suggest :query="query"
             v-show="query"
             @hideKeyBoard="blurInput"
             @select="saveSearch"
             ref="suggestScroll"></suggest>
    <router-view></router-view>
    <confirm ref="confirm"
             title="是否清空所有搜索历史"
             confirmText="清空"
             @confirm="clearAll"></confirm>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import SearchList from 'base/search-list/search-list'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import { getSearchKey } from 'api/search'
import { CODE_OK } from 'api/config'
import {mapActions} from 'vuex'
import {playlistMixin, searchMixin} from 'common/js/mixin'

export default {
  name: 'home-search',

  mixins: [playlistMixin, searchMixin],

  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  },

  data () {
    return {
      hotKeys: []
      // query: ''
    }
  },
  // computed: {
  //   ...mapGetters([
  //     'searchHistory'
  //   ])
  // },

  created () {
    this._getSearchKey()
  },

  methods: {
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ]),

    _getSearchKey () {
      getSearchKey().then((res) => {
        if (res.code === CODE_OK) {
          this.hotKeys = res.data.hotkey.slice(0, 10)
        }
      })
    },

    // handleChoosen (name) {
    //   this.$refs.searchBox.setQuery(name)
    // },

    // handleQueryChange (query) {
    //   this.query = query
    // },

    // 把input失焦，从而滚动的时候隐藏键盘
    // blurInput () {
    //   this.$refs.searchBox.blur()
    // },

    // // 存储歌曲数据
    // saveSearch () {
    //   this.saveSearchHistory(this.query)
    // },

    deleteOne (item) {
      this.deleteSearchHistory(item)
    },

    clearAll () {
      this.clearSearchHistory()
    },

    showConfirm () {
      this.$refs.confirm.show()
    },

    // 设置miniplayer造成的scroll遮挡
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.searchScroll.$el.style.height = 'calc(100vh - 398px - ' + bottom + ')'
      this.$refs.suggestScroll.$el.style.bottom = bottom
      this.$refs.searchScroll.refresh()
      this.$refs.suggestScroll.refresh()
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
  .search-history
    height 100%
    padding 0 .4rem
    .title-wrapper
      height .8rem
      display flex
      color $fontcolor
      align-items center
      justify-content space-between
      .icon
        height .35rem
        width .35rem
      span
        font-size .26rem
    .scroll
      height calc(100vh - 398px)
      overflow hidden
.icon
  iconfontStyle()
</style>