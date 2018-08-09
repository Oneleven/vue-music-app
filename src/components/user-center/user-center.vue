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
        <div class="play-wrapper">
          <svg class="icon-bofang" aria-hidden="true">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="tab-content"></div>
    </div>
  </transition>
</template>

<script>
import Tab from 'base/tab/tab'

export default {
  name: 'user-center',

  data () {
    return {
      tabs: [
        {name: '我喜欢的'},
        {name: '最近听的'}
      ],
      currentIndex: 0
    }
  },

  components: {
    Tab
  },

  methods: {
    back () {
      this.$router.back()
    },

    switchItem (index) {
      this.currentIndex = index
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
    padding .2rem 0 .5rem 0
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
.icon
  iconfontStyle()

.user-center-enter, .user-center-leave-to
  transform translate3d(100%, 0, 0)
.user-center-enter-active, .user-center-leave-active
  transition all .3s
</style>