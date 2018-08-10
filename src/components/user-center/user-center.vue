<template>
  <transition name="user-center">
    <div class="user-center-wrapper">
      <svg class="icon" aria-hidden="true" @click="back">
        <use xlink:href="#icon-jiantouzuo1"></use>
      </svg>
      <div class="tab">
        <tab :tabs="tabs" :currentIndex="currentIndex" @switch="switchItem"></tab>
      </div>
      <div class="play">
        <div class="play-wrapper" @click="randomPlay">
          <svg class="icon-bofang" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="tab-content" ref="tabContent">
        <scroll v-show="currentIndex === 0" :data="favouriteList" class="favouriteScroll" ref="favouriteScroll">
          <song-list :songs="favouriteList" @playSong="playSong"></song-list>
        </scroll>
        <scroll v-show="currentIndex === 1" :data="songHistory" class="songScroll" ref="songScroll">
          <song-list :songs="songHistory" @playSong="playSong"></song-list>
        </scroll>
      </div>
      <no-result v-show="noResult" :wrong="text" class="no-result"></no-result>
    </div>
  </transition>
</template>

<script>
import Tab from 'base/tab/tab'
import NoResult from 'base/no-result/no-result'
import { mapGetters, mapActions } from 'vuex'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { playlistMixin } from 'common/js/mixin'

export default {
  name: 'user-center',

  mixins: [playlistMixin],

  data () {
    return {
      tabs: [
        {name: '我喜欢的'},
        {name: '最近听的'}
      ],
      currentIndex: 0
    }
  },

  computed: {
    ...mapGetters([
      'favouriteList',
      'songHistory'
    ]),

    noResult () {
      if (this.currentIndex === 0) {
        return !this.favouriteList.length
      } else {
        return !this.songHistory.length
      }
    },

    text () {
      if (this.currentIndex === 0) {
        return '>.< 你还未加添喜欢的歌曲哦'
      } else {
        return '>.< 暂无搜索历史'
      }
    }
  },

  components: {
    Tab,
    Scroll,
    SongList,
    NoResult
  },

  methods: {
    ...mapActions([
      'insertSong',
      'random'
    ]),

    back () {
      this.$router.back()
    },

    switchItem (index) {
      this.currentIndex = index
      this.$nextTick(() => {
        this.$refs.songScroll.refresh()
      })
    },

    playSong (song) {
      this.insertSong(song)
    },

    // 点击播放随机歌曲
    randomPlay () {
      let list = this.currentIndex === 0 ? this.favouriteList : this.songHistory
      console.log(list)
      this.random({list})
    },

    // 修改miniplayer遮挡问题
    handlePlaylist () {
      let bottom = this.playlist.length > 0 ? '60' : ''
      this.$refs.tabContent.style.height = 'calc(100vh - 2.18rem - ' + bottom + 'px)'
      // if (this.currentIndex === 0) {
      //   this.$refs.favouriteScroll.refresh()
      // } else {
      //   this.$refs.songScroll.refresh()
      // }
      this.$refs.favouriteScroll && this.$refs.favouriteScroll.refresh()
      this.$refs.songScroll && this.$refs.songScroll.refresh()
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.user-center-wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color $backcolor
  .tab
    padding .2rem 0 .4rem 0
  .tab-content
    height calc(100vh - 2.18rem)
    overflow hidden
    .favouriteScroll, .songScroll
      height 100%
  .icon
    width .35rem
    height .35rem
    position absolute
    padding .2rem
    top .15rem
    color $maincolor
  .play
    height .64rem
    width 100%
    padding-bottom .5rem
    .play-wrapper
      display flex
      align-items center
      justify-content center
      height 100%
      margin 0 auto
      width 3rem
      border 1px solid $maincolor
      border-radius 2rem
      .icon-bofang
        width .35rem
        height .35rem
        fill $maincolor
        padding-right .2rem
      span
        color $maincolor
        font-size .24rem
        padding-right .2rem
  .no-result
    position absolute
    top 2.38rem
    left 0
    height 70%
.icon
  iconfontStyle()

.user-center-enter, .user-center-leave-to
  transform translate3d(100%, 0, 0)
.user-center-enter-active, .user-center-leave-active
  transition all .3s
</style>