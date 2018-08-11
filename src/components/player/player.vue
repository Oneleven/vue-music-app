<template>
  <div class = "player-wrapper" v-show="playlist.length > 0">
    <transition name="normal"
                @enter = "enter">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img :src="currentSong.image">
        </div>
        <div class="top">
          <div class="title">
            <svg class="icon" aria-hidden="true" @click = "handleShrink">
                <use xlink:href="#icon-jiantou-copy"></use>
            </svg>
            <h1 v-html="currentSong.name"></h1>
          </div>
          <h2 class="singer" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle"
             @touchstart.prevent="handleTouchstart"
             @touchmove.prevent="handleTouchmove"
             @touchend="handleTouchend">
          <div class="cd-container" ref="cdContainer">
            <div class="cd-wrapper">
              <img :src="currentSong.image" ref="image" class="scaleImage" :class="cdClass">
            </div>
            <p class="lyric">{{ miniLyric }}</p>
          </div
          ><scroll class="lyric-wrapper" :data= "currentLyric && currentLyric.lines" ref="lyricScroll">
            <div class="content">
              <ul class="lyric-content" v-if="currentLyric">
                <li class="text"
                    v-for="(item, index) of currentLyric.lines" :key=index
                    :class="{'highlight': currentLineNum === index}"
                    ref="lyricline">{{ item.txt }}</li>
              </ul>
            </div>
          </scroll>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{'active':curShow === 'cd'}"></span>
            <span class="dot" :class="{'active':curShow === 'lyric'}"></span>
          </div>
          <div class="progress_wrapper">
            <span class="left-time">{{ format(curTime) }}</span>
            <progress-bar class="progress-bar"
                          :persent="persent"
                          @changePercent= "changePercent"></progress-bar>
            <span class="right-time">{{ format(currentSong.duration) }}</span>
          </div>
          <div class="operators">
            <svg class="icon" aria-hidden="true" v-show= "this.mode === 0" @click= "changeMode">
                <use xlink:href="#icon-ttpodicon"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show= "this.mode === 1" @click= "changeMode">
                <use xlink:href="#icon-xunhuan"></use>
            </svg>
            <svg class="icon" aria-hidden="true" v-show= "this.mode === 2" @click= "changeMode">
                <use xlink:href="#icon-suiji"></use>
            </svg>
            <svg class="icon left-icon" aria-hidden="true" @click= "handlePre" :class= "disableCls">
                <use xlink:href="#icon-houtui-copy"></use>
            </svg>
            <svg class="icon center-icon1" aria-hidden="true" @click= "togglePlaying" v-show= "playing" :class= "disableCls">
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon center-icon" aria-hidden="true" @click= "togglePlaying" v-show= "!playing">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon right-icon" aria-hidden="true" @click= "handleNext" :class= "disableCls">
                <use xlink:href="#icon-kuaijin"></use>
            </svg>
            <svg class="icon" aria-hidden="true"
                 :class="getFavouriteIcon(currentSong)"
                 @click="toggleFavourite(currentSong)">
                <use xlink:href="#icon-aixin1"></use>
            </svg>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player"
          v-show="!fullScreen"
          @click = "handleShow">
        <div class="left">
          <img :src="currentSong.image">
          <div class="text">
            <h2 class="name" v-html="currentSong.name"></h2>
            <p class="desc" v-html="currentSong.singer">xxx</p>
          </div>
        </div>
        <div class="right">
          <svg class="icon player" aria-hidden="true" v-show= !playing @click.stop= "togglePlaying">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon player" aria-hidden="true" v-show= playing @click.stop= "togglePlaying">
            <use xlink:href="#icon-zanting3"></use>
          </svg>
          <svg class="icon songlist" aria-hidden="true" @click.stop="showPlaylist">
            <use xlink:href="#icon-xiangqing"></use>
          </svg>
        </div>
      </div>
    </transition>
    <my-playlist ref="myPlaylist"></my-playlist>
    <audio :src="currentSong.url"
           ref="audio"
           @play= "ready"
           @error= "err"
           @timeupdate= "updateTime"
           @ended= "end"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Velocity from 'velocity-animate'
import ProgressBar from 'base/progress-bar/progress-bar'
import { playMode } from 'common/js/config'
// import { shuffle } from 'common/js/util'
import Lyric from 'lyric-parser'
import scroll from 'base/scroll/scroll'
import MyPlaylist from 'components/my-playlist/my-playlist'
import { prefixStyle } from 'common/js/dom'
import { playerMixin } from 'common/js/mixin'

const Transform = prefixStyle('transform')
const TransitionDuration = prefixStyle('transition-duration')

export default {
  name: 'player',

  mixins: [playerMixin],

  data () {
    return {
      songReady: false,
      curTime: 0,
      currentLyric: null,
      currentLineNum: 0,
      curShow: 'cd',
      miniLyric: ''
    }
  },

  created () {
    this.touch = {}
  },

  components: {
    ProgressBar,
    scroll,
    MyPlaylist
  },

  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ]),
    cdClass () {
      return this.playing ? 'startIt' : 'startIt stopIt'
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    persent () {
      return this.curTime / this.currentSong.duration
    }
  },

  watch: {
    currentSong (newSong, oldSong) {
      if (!newSong.id || !newSong.url || newSong.id === oldSong.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.curTime = 0
        this.currentLineNum = ''
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => { // 延时
        this.$refs.audio.play()
      }, 500)
      // this.$nextTick(() => {
      //   this.$refs.audio.play()
      // })
      this.getLyric()
    },
    playing (playingState) {
      this.$nextTick(() => {
        playingState ? this.$refs.audio.play() : this.$refs.audio.pause()
      })
    }
  },

  methods: {
    // 打开播放列表
    showPlaylist () {
      this.$refs.myPlaylist.show()
    },

    handleShrink () {
      this.setFullScreen(false)
    },
    handleShow () {
      this.setFullScreen(true)
    },

    togglePlaying () {
      if (!this.songReady) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
      this.setPlayingState(!this.playing)
    },

    updateTime (e) {
      this.curTime = e.target.currentTime
    },

    // cd与歌词左右滑动切换
    handleTouchstart (e) {
      this.touch.touchStatus = true
      const touch = e.touches[0]
      this.touch.startX = touch.pageX
      this.touch.startY = touch.pageY
    },

    handleTouchmove (e) {
      if (!this.touch.touchStatus) {
        return
      }
      const touch = e.touches[0]
      const deltaX = touch.pageX - this.touch.startX
      const deltaY = touch.pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      const initialLocation = this.curShow === 'cd' ? 0 : -window.innerWidth
      const width = Math.min(0, Math.max(-window.innerWidth, initialLocation + deltaX))
      this.touch.percent = Math.abs(width / window.innerWidth)
      this.$refs.lyricScroll.$el.style[Transform] = `translate3d(${width}px, 0, 0)`
      this.$refs.lyricScroll.$el.style[TransitionDuration] = 0
      this.$refs.cdContainer.style.opacity = 1 - this.touch.percent
      this.$refs.cdContainer.style[TransitionDuration] = 0
    },

    handleTouchend (e) {
      this.touch.touchStatus = false
      let width
      let opacity
      if (this.curShow === 'cd') {
        if (this.touch.percent > 0.1) {
          width = -window.innerWidth
          opacity = 0
          this.curShow = 'lyric'
        } else {
          width = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.9) {
          width = 0
          opacity = 1
          this.curShow = 'cd'
        } else {
          width = -window.innerWidth
          opacity = 0
        }
      }
      this.$refs.lyricScroll.$el.style[Transform] = `translate3d(${width}px, 0, 0)`
      this.$refs.lyricScroll.$el.style[TransitionDuration] = '300ms'
      this.$refs.cdContainer.style.opacity = opacity
      this.$refs.cdContainer.style[TransitionDuration] = '300ms'
    },

    // 歌词
    getLyric () {
      if (!this.currentSong || !this.currentSong.getSongLyric) {
        return
      }
      this.currentSong.getSongLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.highlightLyric)
        if (this.playing) {
          this.currentLyric.play()
        }
      }).catch(() => {
        this.currentLyric = null
        this.miniLyric = ''
        this.currentLineNum = 0
      })
    },

    // 设置高亮及位置
    highlightLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 6) {
        const lineEl = this.$refs.lyricline[lineNum - 6]
        this.$refs.lyricScroll.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricScroll.scrollTo(0, 0, 1000)
      }
      this.miniLyric = txt
    },

    // 歌曲结束时自动跳转到下一首
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.handleNext()
      }
    },

    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    // 设置三种播放模式
    // changeMode () {
    //   const mode = (this.mode + 1) % 3
    //   this.setMode(mode)
    //   let list = null
    //   if (this.mode === playMode.random) {
    //     list = shuffle(this.sequenceList)
    //   } else {
    //     list = this.sequenceList
    //   }
    //   this.resetCurrentIndex(list)
    //   this.setList(list)
    // },

    // // 切换模式时当前歌曲不变
    // resetCurrentIndex (list) {
    //   let index = list.findIndex((item) => {
    //     return item.id === this.currentSong.id
    //   })
    //   this.setNext(index)
    // },

    // 设置progress-bar拖动改变歌曲进度
    changePercent (percent) {
      const currentTime = percent * this.currentSong.duration
      this.currentTime = this.$refs.audio.currentTime = currentTime
      if (!this.playing) {
        this.togglePlaying()
      }
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
      }
    },

    format (interval) {
      let minute = (interval / 60) | 0
      let seconds = (interval | 0) % 60
      return `${minute}:${this._pad(seconds)}`
    },

    _pad (num, n = 2) {
      let length = num.toString().length
      if (length < n) {
        return `0${num}`
      } else {
        return num
      }
    },

    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setPre: 'SET_CURRENT_INDEX'
      // setNext: 'SET_CURRENT_INDEX',
      // setMode: 'SET_PLAY_MODE',
      // setList: 'SET_PLAYLIST'
    }),

    ...mapActions([
      'saveSongHistory'
    ]),

    // 限制用户过快切换歌曲
    ready () {
      this.songReady = true
      this.saveSongHistory(this.currentSong)
      // console.log(this.currentSong)
    },
    err () {
      this.songReady = true
    },

    // 设置跳转歌曲
    handlePre () {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let curIndex = this.currentIndex - 1
        if (curIndex === -1) {
          curIndex = this.playlist.length - 1
        }
        this.setPre(curIndex)
        this.setPlayingState(true)
      }
      this.songReady = false
    },

    handleNext () {
      if (!this.songReady) {
        return
      }
      if (this.playlist.length === 1) {
        this.loop()
      } else {
        let curIndex = this.currentIndex + 1
        if (curIndex === this.playlist.length) {
          curIndex = 0
        }
        this.setNext(curIndex)
        if (!this.playing) {
          this.togglePlaying()
        }
        if (!this.songReady) {
          return
        }
      }
      this.songReady = false
    },

    // 设置动画
    enter (el, done) {
      Velocity(this.$refs.image, {
        scale: 1.2
      }, {
        duration: 250,
        easing: 'linear'
      })
      Velocity(this.$refs.image, {
        scale: 1
      }, {
        duration: 100,
        easing: 'linear',
        complete: done
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

  .normal-player
    position fixed
    top 0
    bottom 0
    left 0
    right 0
    background-color $backcolor
    .background
      position absolute
      top 0
      left 0
      height 100%
      width 100%
      opacity .6
      filter blur(20px)
      z-index -1
      img
        width 100%
        height 100%
    .top
      height 1.2rem
      margin-bottom .5rem
      .title
        display flex
        line-height .8rem
        align-items center
        &::after
          content ''
          width .9rem
          display block
        .icon
          width .5rem
          height .5rem
          padding 0 .2rem
        h1
          font-size .36rem
          ellipsis()
          flex 1
          text-align center
          color #ffffff
      .singer
        text-align center
        line-height .4rem
        color #ffffff
    .middle
      height 8.34rem
      white-space nowrap
      position relative
      .lyric-wrapper
        height 100%
        width 100%
        overflow hidden
        display inline-block
        position absolute
        top 0
        .content
          .lyric-content
            .text
              text-align center
              line-height: .64rem
              color: hsla(0,0%,100%,.5);
              font-size: .28rem
            .highlight
              color #ffffff
      .cd-container
        display inline-block
        width 100%
        .cd-wrapper
          height 80vw
          width 100%
          text-align center
          img
            box-sizing border-box
            border-radius 50%
            border 10px solid rgba(255, 255, 255, 0.1)
            height 100%
          .startIt
            animation rotate 20s linear infinite
          .stopIt
            animation-play-state: paused
        .lyric
          height .4rem
          margin-top .6rem
          text-align center
          color $fontcolor
    .bottom
      position absolute
      bottom 1rem
      width 100%
      display flex
      align-items center
      flex-direction column
      .dot-wrapper
        line-height .16rem
        text-align center
        width 100%
        .dot
          box-sizing border-box
          display inline-block
          height .16rem
          width .16rem
          border 1px solid #ffffff
          border-radius 50%
          background-color #ffffff
          margin 0 .05rem
        .active
          width .4rem
          border-radius .1rem
      .progress_wrapper
        height .6rem
        color #ffffff
        width 70%
        display flex
        align-items center
        padding .2rem 0 .1rem 0
        .progress-bar
          flex 1
        .left-time
          padding-right .1rem
        .right-time
          padding-left .1rem
      .operators
        height .8rem
        width 70%
        display flex
        align-items center
        justify-content space-between
        .disable
          color $fontcolor
        .center-icon
          height .8rem
          width .8rem
          text-align center
        .center-icon1
          height .8rem
          width .8rem
          text-align center
        .left-icon
          padding-left 3vw
        .right-icon
          padding-right 3vw
        .like
          fill red
        .dislike
          fill $miancolor
  .mini-player
    position fixed
    bottom 0
    width 100%
    height 1.2rem
    display flex
    justify-content space-between
    background-color #333333
    .left
      display flex
      align-items center
      img
        height .8rem
        width .8rem
        border-radius 50%
        padding 0 .2rem 0 .4rem
      .text
        .name
          color #ffffff
          font-size .28rem
          line-height .4rem
        .desc
          color $fontcolor
          font-size .24rem
          line-height .4rem
    .right
      display flex
      align-items center
      .songlist
        width 1rem
        height 1rem
        color rgba(255,205,49,.5)
        padding-top .2rem
      .player
        color rgba(255,205,49,.5)
        width .65rem
        height .65rem
.icon
  iconfontStyle()
  color $maincolor
  width .6rem
  height .6rem

.normal-enter, .normal-leave-to
  opacity 0
  .top
    transform: translate3d(0, -70px, 0)
  .bottom
    transform: translate3d(0, 100px, 0)
.normal-enter-active, .normal-leave-to
  transition opacity .4s
  .top
    transition: all .4s
  .bottom
    transition: all .4s
.mini-enter, .mini-leave-to
  opacity 0
.mini-enter-active, .mini-leave-active
  transition opacity .4s

// 设置专辑图片旋转
@keyframes rotate {
  0% {
    transform rotate(0)
  }
  100% {
    transform rotate(360deg)
  }
}

</style>