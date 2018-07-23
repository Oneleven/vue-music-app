<template>
  <div>
    <div class="music-list-wrapper">
      <div class="bg-image" :style="bgStyle"></div>
      <div class="header">
        <svg class="icon fanhui" aria-hidden="true">
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
        <song-list :songs="songs" class="song-list-container" ref="a"></song-list>
      </scroll>
    </div>
  </div>

</template>

<script>
import scroll from 'base/scroll/scroll'
import songList from 'base/song-list/song-list'

const MIN_TOP = 40
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
    }
  },

  watch: {
    scrollY (newy) {
      if (-newy < 260 - MIN_TOP) {
        this.$refs.scrollwrapper.$el.style['top'] = `5.2rem`
        this.$refs.scrollwrapper.$el.style['overflow'] = 'visible'
        this.$refs.a.$el.style['padding-top'] = `0px`
      }
      if (-newy >= 260 - MIN_TOP) {
        this.$refs.scrollwrapper.$el.style['top'] = MIN_TOP + 'px'
        this.$refs.a.$el.style['padding-top'] = `220px`
        this.$refs.scrollwrapper.$el.style['overflow'] = 'hidden'
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
      content ''
      display block
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
    &::after
      content ''
      position absolute
      top 0
      width 100%
      height 5.2rem
      background-color rgba(7,17,27,.2)
.icon
  iconfontStyle()
  width .5rem
  height .5rem
  color $maincolor
  padding .2rem
</style>