<template>
  <div id="app">
    <home-header></home-header>
    <home-nav></home-nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import HomeHeader from 'components/home-header/home-header'
import HomeNav from 'components/nav/nav'
import Player from 'components/player/player'

export default {
  name: 'App',
  components: {
    HomeHeader,
    HomeNav,
    Player
  }
}
</script>

<style lang='stylus'>
  body
    background-color #222
    height 100%
</style>
