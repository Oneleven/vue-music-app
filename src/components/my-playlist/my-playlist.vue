<template>
  <transition name="my-playlist">
    <div class="my-songlist-wrapper" v-show="showIt" @click="hide">
      <div class="songlist-wrapper" @click.stop>
        <div class="songlist-header">
          <svg class="icon icon-status" aria-hidden="true" v-show= "this.mode === 0" @click= "changeMode">
            <use xlink:href="#icon-ttpodicon"></use>
          </svg>
          <svg class="icon icon-status" aria-hidden="true" v-show= "this.mode === 1" @click= "changeMode">
            <use xlink:href="#icon-xunhuan"></use>
          </svg>
          <svg class="icon icon-status" aria-hidden="true" v-show= "this.mode === 2" @click= "changeMode">
            <use xlink:href="#icon-suiji"></use>
          </svg>
          <h1>{{ modelText }}</h1>
          <svg class="icon icon-shanchu" aria-hidden="true" @click="showConfirm">
            <use xlink:href="#icon-shanchu"></use>
          </svg>
        </div>
        <scroll class="list-content" ref="playListScroll">
          <transition-group class="playlists" tag="ul" name="list">
            <li class="playlist-item"
                v-for="(item, index) of sequenceList" :key=item.id
                @click="selectItem(item, index)"
                ref="playlistItem">
              <svg class="icon icon-play" aria-hidden="true" v-show="showCurrentIcon(item)">
                <use xlink:href="#icon-bofang"></use>
              </svg>
              <div class="placeholder" v-show="!showCurrentIcon(item)"></div>
              <p :class="{'currentText':showClassIcon(item)}">{{ item.name }}</p>
              <svg class="icon icon-like" aria-hidden="true">
                <use xlink:href="#icon-aixin1"></use>
              </svg>
              <svg class="icon" aria-hidden="true" @click.stop="removeOne(item)">
                <use xlink:href="#icon-cha1"></use>
              </svg>
            </li>
          </transition-group>
        </scroll>
        <div class="list-operate">
          <div class="list-add" @click="showAddSong">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jia"></use>
            </svg>
            <span>添加歌曲到列表</span>
          </div>
        </div>
        <div class="close" @click="hide">
          <p>关闭</p>
        </div>
      </div>
      <confirm title="是否清空播放列表" ref="confirm" @confirm="clearAll"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import { playMode } from 'common/js/config'
import addSong from 'components/add-song/add-song'
import { playerMixin } from 'common/js/mixin'

export default {
  name: 'my-playlist',

  mixins: [playerMixin],

  data () {
    return {
      showIt: false
    }
  },

  components: {
    Scroll,
    Confirm,
    addSong
  },

  computed: {
    // ...mapGetters([
    //   'sequenceList',
    //   'currentSong',
    //   'playlist',
    //   'mode'
    // ])
    modelText () {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.loop ? '循环播放' : '随机播放'
    }
  },

  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayingState: 'SET_PLAYING_STATE'
    }),

    ...mapActions([
      'deleteSong',
      'celarSongList'
    ]),

    // 显示add-song组件
    showAddSong () {
      this.$refs.addSong.show()
    },

    clearAll () {
      this.celarSongList()
      this.hide()
    },

    // 显示confirm确认
    showConfirm () {
      this.$refs.confirm.show()
    },

    show () {
      this.showIt = true
      // setTimeout(() => {
      //   this.$refs.playListScroll.refresh()
      // },20)
      this.$nextTick(() => {
        this.$refs.playListScroll.refresh()
        this.scrollToCurrent(this.currentSong)
      })
    },

    hide () {
      this.showIt = false
    },

    showCurrentIcon (item) {
      if (this.currentSong.id === item.id) {
        return true
      }
    },

    showClassIcon (item) {
      if (this.currentSong.id === item.id) {
        return true
      }
    },

    // 切换播放列表
    selectItem (item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return item.id === song.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },

    // 滚动到当前播放歌曲列表
    scrollToCurrent (current) {
      const index = this.sequenceList.findIndex((item) => {
        return current.id === item.id
      })
      this.$refs.playListScroll.scrollToElement(this.$refs.playlistItem[index], 300)
    },

    // 移除歌曲列表的歌
    removeOne (item) {
      this.deleteSong(item)
      this.setPlayingState(true)
      if (!this.playlist.length) {
        this.hide()
        this.setPlayingState(false)
      }
    }
  },

  watch: {
    currentSong (newSong) {
      if (!this.showIt) {
        return
      }
      this.scrollToCurrent(newSong)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.my-songlist-wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0,0,0,.3)
  .songlist-wrapper
    position absolute
    bottom 0
    left 0
    background-color #333333
    width 100%
    .songlist-header
      padding .4rem .6rem .2rem .4rem
      color $fontcolor
      display flex
      align-items center
      h1
        font-size .28rem
        color $fontcolor
        flex 1
      .icon-status
        margin-right .2rem
      .icon-shanchu
        height .35rem
        width .35rem
        color $fontcolor
    .list-content
      height 4.8rem
      overflow hidden
      .playlists
        padding 0 .6rem 0 .4rem
        .playlist-item
          display flex
          color hsla(0,0%,100%,.3)
          align-items center
          height .8rem
          .icon, .placeholder
            height .30rem
            width .30rem
          .icon-play, .icon-like, .placeholder
            padding-right .16rem
          p
            flex 1
            ellipsis()
          .currentText
            color hsla(0,0%,100%,.7)
      .list-enter, .list-leave-to
        transform translate3d(-100%, 0 , 0)
      .list-enter-active, .list-leave-active
        transition all .3s linear
    .list-operate
      padding .4rem
      display flex
      justify-content center
      align-items center
      .list-add
        height .6rem
        border 1px solid $fontcolor
        border-radius 100px
        min-width 3rem
        display flex
        justify-content center
        align-items center
        .icon
          height .3rem
          width .3rem
          padding .1rem
          color $fontcolor
        span
          color $fontcolor
    .close
      height .8rem
      background-color $backcolor
      display flex
      justify-content center
      align-items center
      p
        color $fontcolor
.icon
  iconfontStyle()
  color $maincolor
  width .6rem
  height .6rem
  color rgba(255,205,49,.8)

.my-playlist-enter, .my-playlist-leave-to
  opacity 0
  .songlist-wrapper
    transform translate3d(0, 100%, 0)
.my-playlist-enter-active, .my-playlist-leave-active
  transition opacity .3s
  .songlist-wrapper
    transition all .3s
</style>