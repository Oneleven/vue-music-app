<template>
  <div class="progress-container" ref="bar">
    <div class="bar-wrapper"
         @touchstart.prevent= "progressTouchStart"
         @touchmove.prevent= "progressTouchMove"
         @touchend= "progressTouchEnd"
         @click = "handleClick">
      <div class="progress" ref="progress"></div>
      <div class="current-location"></div>
    </div>
  </div>
</template>

<script>
const LOCATION_BALL_WIDTH = 14
export default {
  name: 'progress-bar',

  props: {
    persent: {
      type: Number,
      default: 0
    }
  },

  created () {
    this.touch = {}
  },

  methods: {
    progressTouchStart (e) {
      this.touch.status = true
      this.touch.startX = e.touches[0].pageX
      this.touch.progressX = this.$refs.progress.clientWidth
    },
    progressTouchEnd () {
      this.touch.status = false
      this._triggerPersent()
    },
    progressTouchMove (e) {
      if (this.touch.status) {
        const deltaX = e.touches[0].pageX - this.touch.startX
        const realWidth = Math.min(this.$refs.bar.clientWidth - LOCATION_BALL_WIDTH, Math.max(0, deltaX + this.touch.progressX))
        this._move(realWidth)
      }
    },

    handleClick (e) {
      const left = this.$refs.bar.getBoundingClientRect().left
      const offsetWidth = e.pageX - left
      this._move(offsetWidth)
      // 点击小圆点会触发bug，offsetX获取的不对
      // this._move(e.offsetX)
      this._triggerPersent()
    },

    _triggerPersent () {
      const barWidth = this.$refs.bar.clientWidth - LOCATION_BALL_WIDTH
      const offsetWidth = this.$refs.progress.clientWidth
      const percent = offsetWidth / barWidth
      this.$emit('changePercent', percent)
    },

    _move (offsetwidth) {
      this.$refs.progress.style.width = offsetwidth + 'px'
    }
  },

  watch: {
    persent (newPercent) {
      if (newPercent >= 0 && !this.touch.status) {
        const width = this.$refs.bar.clientWidth - LOCATION_BALL_WIDTH
        const offsetWidth = newPercent * width
        this._move(offsetWidth)
      }
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'

.progress-container
  background rgba(0,0,0,.3)
  height .08rem
  position relative
  .bar-wrapper
    position absolute
    top 50%
    transform translateY(-50%)
    width 100%
    display flex
    align-items center
    .progress
      background-color $maincolor
      height .08rem
    .current-location
      border 2px solid #ffffff
      width .2rem
      height .2rem
      background-color $maincolor
      border-radius 50%
</style>