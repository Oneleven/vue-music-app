<template>
  <div class="nav-wrapper">
    <router-link to="/recommend" tag="nav" class="nav-item">
      <span>推荐</span>
    </router-link>
    <router-link to="/singer" tag="nav" class="nav-item">
      <span>歌手</span>
    </router-link>
    <router-link to="/rank" tag="nav" class="nav-item">
      <span>排行</span>
    </router-link>
    <router-link to="/search" tag="nav" class="nav-item">
      <span>搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'home-nav'
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'

.nav-wrapper
  display flex
  .nav-item
    line-height .88rem
    width 25vw
    text-align center
    span
      color $fontcolor
      padding-bottom .15rem
  .router-link-active>span
    border-bottom 2px solid $maincolor

</style>