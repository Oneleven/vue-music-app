<template>
  <transition name="fade">
    <div class="confirm-wrapper" v-show="showIt">
      <div class="confirm">
        <p>{{ title }}</p>
        <div class="operate">
          <span class="left" @click="cancleClean">{{ cancelText }}</span>
          <span @click="confirm">{{ confirmText }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'confirm',

  props: {
    title: {
      type: String,
      default: ''
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },

  data () {
    return {
      showIt: false
    }
  },

  methods: {
    show () {
      this.showIt = true
    },

    hide () {
      this.showIt = false
    },

    cancleClean () {
      this.hide()
      this.$emit('cancle')
    },

    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.confirm-wrapper
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color rgba(0,0,0,.3)
  display flex
  justify-content center
  align-items center
  .confirm
    height 2.06rem
    font-size .36rem
    border-radius 13px
    background-color #333333
    min-width 4.2rem
    p
      color $fontcolor
      line-height .44rem
      border-bottom 1px solid $backcolor
      padding .38rem .4rem
      text-align center
    .operate
      display flex
      span
        flex 1
        color hsla(0,0%,100%,.3)
        padding .2rem 0
        text-align center
      .left
        border-right 1px solid $backcolor
.fade-enter-active
  animation fadeIn .3s
  .confirm
    animation confirm-zoom .3s

@keyframes fadeIn
  0%
    opacity 0
  100%
    opacity 1

@keyframes confirm-zoom
  0%
    transform scale(0)
  50%
    transform scale(1.1)
  100%
    transform scale(1)

</style>