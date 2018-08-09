<template>
  <transition name="addSong">
    <div class="add-song-wrapper" v-show="showStatus" @click.stop>
      <div class="header">
        <h1>添加歌曲到列表</h1>
        <svg class="icon" aria-hidden="true" @click="hide">
          <use xlink:href="#icon-cha1"></use>
        </svg>
      </div>
      <div class="search-box-wrapper">
        <search-box placeholder="搜索歌曲" @query="handleQueryChange" ></search-box>
      </div>
      <div class="tab-wrapper" v-show="!query">
        <tab :tabs="tabs"
             :currentIndex="currentIndex"
             @switch="switchItem"></tab>
        <div class="tab-content">
          <scroll v-show="currentIndex === 0" :data="songHistory" class="songHistoryScroll" ref="scroll">
            <song-list :songs="songHistory"></song-list>
          </scroll>
        </div>
      </div>
      <div class="search-result" v-show="query">
        <suggest :query="query"
                 :showSinger="false"
                 class="suggest"
                 @select="selectSuggest"
                 @hideKeyBoard="blurInput"></suggest>
      </div>
    </div>
  </transition>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'
import Tab from 'base/tab/tab'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { searchMixin } from 'common/js/mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'add-song',

  mixins: [searchMixin],

  data () {
    return {
      showStatus: false,
      // query: ''
      tabs: [
        {name: '最近播放'},
        {name: '搜索历史'}
      ],
      currentIndex: 0
    }
  },

  computed: {
    ...mapGetters([
      'songHistory'
    ])
  },

  components: {
    SearchBox,
    Suggest,
    Tab,
    Scroll,
    SongList
  },

  methods: {
    switchItem (index) {
      this.currentIndex = index
    },

    show () {
      this.showStatus = true
      setTimeout(() => {
        this.$refs.scroll.refresh()
      }, 20)
    },

    hide () {
      this.showStatus = false
    },

    selectSuggest () {
      this.saveSearch()
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.add-song-wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color $backcolor
  .header
    line-height .88rem
    position relative
    h1
      font-size .36rem
      color #ffffff
      text-align center
    .icon
      position absolute
      width .4rem
      height .4rem
      top .25rem
      right .4rem
  .tab-wrapper
    .tab-content
      height calc(100vh - 3.12rem)
      .songHistoryScroll
        height 100%
        overflow hidden
  .search-result
    .suggest
      top 2.48rem

.icon
  iconfontStyle()
  color $maincolor

.addSong-enter, .addSong-leave-to
  transform translate3d(100%, 0, 0)
.addSong-enter-active, .addSong-leave-active
  transition transform .3s
</style>