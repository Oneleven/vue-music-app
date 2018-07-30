<template>
  <div>
    <div class="music-list-wrapper">
      <div class="bg-image" :style="bgStyle" ref="bgimage">
        <div class="play">
          <div class="play-wrapper" @click= "randomPlay">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang"></use>
            </svg>
            <span>随机播放全部</span>
          </div>
        </div>
      </div>
      <div class="header">
        <svg class="icon" aria-hidden="true" @click = "back">
            <use xlink:href="#icon-jiantouzuo1"></use>
        </svg>
        <h2 v-html="title"></h2>
      </div>
      <scroll :data="songs" tag="div"
              class="song-list"
              :probe-type="probeType"
              :listen-scroll="listenScroll"
              @scroll="scroll"
              ref="scrollwrapper">
        <song-list :songs="songs"
                   class="song-list-container"
                   ref="songs"
                   @playSong = "playingSong"></song-list>
      </scroll>
    </div>
  </div>

</template>

<script>
import scroll from 'base/scroll/scroll'
import songList from 'base/song-list/song-list'
import { prefixStyle } from 'common/js/dom'
import { mapActions } from 'vuex'

const MIN_TOP = 40
const Transform = prefixStyle('transform')

export default {
  name: 'music-list',

  components: {
    scroll,
    songList
  },

  data () {
    return {
      scrollY: 0
    }
  },

  props: {
    gbImage: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: ''
    }
  },

  computed: {
    bgStyle () {
      return `background-image:url(${this.gbImage})`
    }
  },

  created () {
    this.probeType = 3
    this.listenScroll = true
  },

  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    playingSong (song, index) { // 这个点击事件会派发多个commit事件，要改变state中的fullScreen,playing等，因此封装在actions中
      this.playSong({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'playSong',
      'random'
    ]),

    // 点击随机播放
    randomPlay () {
      this.random({
        list: this.songs
      })
    }
  },

  watch: {
    scrollY (newy) {
      if (-newy < 260 - MIN_TOP && -newy >= 0) {
        this.$refs.scrollwrapper.$el.style['top'] = `5.2rem`
        this.$refs.scrollwrapper.$el.style['overflow'] = 'visible'
        this.$refs.songs.$el.style['padding-top'] = `0px`
        this.$refs.bgimage.style['filter'] = 'blur(' + Math.min(10, (-newy / 260) * 10) + 'px)'
      }
      if (-newy >= 260 - MIN_TOP && -newy <= 480 - MIN_TOP) {
        this.$refs.scrollwrapper.$el.style['top'] = MIN_TOP + 'px'
        this.$refs.songs.$el.style['padding-top'] = `220px`
        this.$refs.scrollwrapper.$el.style['overflow'] = 'hidden'
      }
      if (-newy > 480 - MIN_TOP) {
        this.$refs.scrollwrapper.$el.style['top'] = MIN_TOP + 'px'
        this.$refs.songs.$el.style['padding-top'] = `0px`
        this.$refs.scrollwrapper.$el.style['overflow'] = 'hidden'
      }
      if (newy > 0) {
        this.$refs.bgimage.style[Transform] = 'scale(' + (newy + 260) / 260 + ')'
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.music-list-wrapper
  position relative
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color $backcolor
  color $fontcolor
  .header
    position absolute
    top 0
    display flex
    align-items center
    line-height .8rem
    &::after
      display block
      content ''
      height .9rem
      width .9rem
    h2
      font-size .36rem
      color #ffffff
      width calc(100vw - 1.8rem)
      text-align center
  .song-list
    // overflow hidden
    position absolute
    top 5.2rem
    width 100%
    // height calc(100vh - 5.2rem)
    height 600px
    // transform translateY(-100px) 与scroll组件冲突
    // background-color $backcolor
    .song-list-container
      background-color $backcolor
      width 100%
  .bg-image
    height 5.2rem
    background-size: cover
    position relative
    &::before
      content ''
      position absolute
      top 0
      width 100%
      height 5.2rem
      background-color rgba(7,17,27,.2)
    .play
      height .64rem
      position absolute
      bottom .4rem
      width 100%
      .play-wrapper
        display flex
        align-items center
        justify-content center
        line-height 100%
        margin 0 auto
        width 3rem
        border 1px solid $maincolor
        border-radius 2rem
        .icon
          width .35rem
          height .35rem
          color $maincolor
        span
          color $maincolor
          font-size .24rem
          padding-right .2rem
.icon
  iconfontStyle()
  width .5rem
  height .5rem
  color $maincolor
  padding .2rem
</style>