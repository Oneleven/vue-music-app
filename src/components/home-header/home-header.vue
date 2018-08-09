<template>
  <div class="wrapper">
    <div class="title-container">
      <img :src= "logo" alt= "logo" class="logo"/>
      <h1 class="title">Cat Music</h1>
      <router-link to="/user" tag="div">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ren"></use>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import logo from './logo.png'

export default {
  name: 'home-header',
  data () {
    return {
      logo
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.wrapper
  .title-container
    height .88rem
    display flex
    justify-content center
    align-items center
    position relative
    .logo
      height 80%
      padding-right .15rem
    .title
      color $maincolor
      font-size .35rem
    .icon
      width .45rem
      height .45rem
      color $maincolor
      position absolute
      right .3rem
      top .25rem
.icon
  iconfontStyle()
</style>