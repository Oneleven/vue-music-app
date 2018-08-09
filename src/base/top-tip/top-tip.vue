<template>
  <transition name="tip">
    <div class="top-tip" v-show="showStatus">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'top-tip',

  data () {
    return {
      showStatus: false
    }
  },

  methods: {
    show () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.showStatus = true
      this.timer = setTimeout(() => {
        this.hide()
      }, 1500)
    },

    hide () {
      this.showStatus = false
    }
  }
}
</script>

<style scoped lang='stylus'>
.top-tip
  position fixed
  top 0
  width 100%
  background-color #333333

.tip-enter, .tip-leave-to
  transform translate3d(0, -100%, 0)
.tip-enter-active, .tip-leave-active
  transition all .3s
</style>