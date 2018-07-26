<template>
  <div class = "player-wrapper" v-show="playlist.length > 0">
    <transition name="normal"
                @enter = "enter">
      <div class="normal-player" v-show="fullScreen">
        <div class="top">
          <div class="title">
            <svg class="icon" aria-hidden="true" @click = "handleShrink">
                <use xlink:href="#icon-jiantou-copy"></use>
            </svg>
            <h1 v-html="currentSong.name"></h1>
          </div>
          <h2 class="singer" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="cd-wrapper">
            <img :src="currentSong.image" ref="image" :class="cdClass">
          </div>
          <p class="lyric">歌词</p>
        </div>
        <div class="bottom">
          <div class="operators">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-ttpodicon"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-houtui-copy"></use>
            </svg>
            <svg class="icon center-icon1" aria-hidden="true" @click= "togglePlaying" v-show= playing>
                <use xlink:href="#icon-zanting1"></use>
            </svg>
            <svg class="icon center-icon" aria-hidden="true" @click= "togglePlaying" v-show= !playing>
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-kuaijin"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
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
          <svg class="icon songlist" aria-hidden="true">
            <use xlink:href="#icon-xiangqing"></use>
          </svg>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Velocity from 'velocity-animate'

export default {
  name: 'player',

  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist',
      'currentSong',
      'playing'
    ]),
    cdClass () {
      return this.playing ? 'startIt' : 'startIt stopIt'
    }
  },

  watch: {
    currentSong () {
      this.$nextTick(() => { // 延时
        this.$refs.audio.play()
      })
    },
    playing (playingState) {
      this.$nextTick(() => {
        playingState ? this.$refs.audio.play() : this.$refs.audio.pause()
      })
    }
  },

  methods: {
    handleShrink () {
      this.setFullScreen(false)
    },
    handleShow () {
      this.setFullScreen(true)
    },

    togglePlaying () {
      this.setPlayingState(!this.playing)
    },

    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayingState: 'SET_PLAYING_STATE'
    }),

    // 设置动画
    enter (el, done) {
      Velocity(this.$refs.image, {
        scale: 1.1
      }, {
        duration: 250,
        easing: 'linear'
      })
      Velocity(this.$refs.image, {
        scale: 1.0
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
      .cd-wrapper
        height 80vw
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
        line-height .4rem
        margin-top .6rem
        text-align center
        color $fontcolor
    .bottom
      position absolute
      bottom 1rem
      width 100%
      display flex
      justify-content center
      .operators
        height .8rem
        width 80%
        display flex
        align-items center
        justify-content space-around
        .center-icon
          height .8rem
          width .8rem
          text-align center
        .center-icon1
          height .8rem
          width .8rem
          text-align center
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