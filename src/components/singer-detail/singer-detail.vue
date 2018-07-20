<template>
  <transition name="slide">
    <div class="singer-detail">
      heihei
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'singer-detail',
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    console.log(this.singer)
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'

.singer-detail
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color $backcolor
  color $fontcolor
.slide-enter, .slide-leave-to
  transform translateX(100%)
.slide-enter-active, .slide-leave-active
  transition transform .5s

</style>