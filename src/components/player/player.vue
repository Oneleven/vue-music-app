<template>
  <div class = "player-wrapper" v-show="playlist.length > 0">
    <div class="normal-player" v-show="fullScreen">
      <div class="top">
        <div class="title">
          <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-jiantou-copy"></use>
          </svg>
          <h1>这是一首哥</h1>
        </div>
        <h2 class="singer">小雪</h2>
      </div>
      <div class="middle">
        <div class="cd-wrapper">
          <img src="https://y.gtimg.cn/music/photo_new/T002R300x300M000004RThJi4G1v0A.jpg?max_age=2592000" alt="">
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
          <svg class="icon center-icon" aria-hidden="true">
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
    <div class="mini-player" v-show="!fullScreen">
      <img src="" alt="">
      <div class="text">
        <h2 class="name">周杰伦</h2>
        <p class="desc">xxx</p>
      </div>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiangqing"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'player',
  computed: {
    ...mapGetters([
      'fullScreen',
      'playlist'
    ])
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.player-wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color #ddd
  .normal-player
    position relative
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
      .singer
        text-align center
        line-height .4rem
    .middle
      height 8.34rem
      border 1px solid black
      .cd-wrapper
        height 80vw
        text-align center
        border 1px solid black
        img
          box-sizing border-box
          border-radius 50%
          border 10px solid rgba(255, 255, 255, 0.1)
          height 100%
      .lyric
        line-height .4rem
        margin-top .6rem
        text-align center
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
.icon
  iconfontStyle()
  color $maincolor
  width .6rem
  height .6rem
</style>