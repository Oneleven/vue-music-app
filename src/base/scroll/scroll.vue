<template>
  <div ref="scrollWrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'scroll',
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    }, 20)
  },
  methods: {
    _initScroll () {
      if (!this.$refs.scrollWrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.scrollWrapper, {
        probeType: this.probeType,
        click: this.click
      })
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments) // 调用apply绑定上下文
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: { // 动态监听数据变化，以防dom结构发生变化的时候重新计算better-scroll
    data () {
      setTimeout(() => {
        this.refresh()
      }, 20)
    }
  }
}
</script>

<style scoped lang='stylus'>

</style>