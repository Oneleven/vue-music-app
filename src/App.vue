<template>
  <div id="app">
    <home-header></home-header>
    <home-nav></home-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeHeader from 'components/home-header/home-header'
import HomeNav from 'components/nav/nav'

export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeNav
  }
}
</script>

<style lang='stylus'>
  body
    background-color #222
    height 100%
</style>
