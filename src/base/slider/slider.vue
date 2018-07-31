<template>
  <div>
    <div class="slider-wrapper" ref="slider">
      <div class="content" ref="sliderContent">
        <slot></slot>
      </div>
      <div class="dots">
        <span class="dot"
              v-for="(item, key) of dots" :key=key
              :class="{active:currentIndex === key}"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  data () {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    atuoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  mounted () {
    setTimeout(() => {
      this._setSliderWidth()
      this._initDots()
      this._initSlider()

      if (this.atuoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (!this.slider) {
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth (isResize) {
      let width = 0
      this.children = this.$refs.sliderContent.children
      let sliderWidth = this.$refs.slider.clientWidth
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i]
        addClass(child, 'slider-item')
        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }
      this.$refs.sliderContent.style.width = width + 'px'
    },
    _initSlider () {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })

      this.slider.on('scrollEnd', () => {
        let pageIndex = this.slider.getCurrentPage().pageX
        this.currentIndex = pageIndex

        if (this.atuoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play () {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    },
    _initDots () {
      this.dots = new Array(this.children.length)
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<style scoped lang='stylus'>
.slider-wrapper
  width 100%
  position relative
  .content
    overflow hidden
    white-space nowrap
    .slider-item
      float left
      box-sizing border-box
      a
        display block
        width 100%
        overflow hidden
        img
          display block
          width 100%
  .dots
    position: absolute;
    right: 0;
    left: 0
    // border 1px solid white
    bottom: 12px;
    text-align: center;

    .dot
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8)
      &.active {
        width: 20px;
        border-radius: 5px;
      }
</style>