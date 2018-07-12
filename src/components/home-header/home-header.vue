<template>
  <div class="wrapper">
    <div class="title-container">
      <img :src= "logo" alt= "logo" class="logo"/>
       <h1 class="title">Cat Music</h1>
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
.wrapper
  .title-container
    height .88rem
    display flex
    justify-content center
    align-items center
    .logo
      height 80%
      padding-right .15rem
    .title
      color $maincolor
      font-size .35rem

</style>