<template>
  <div class="songlist-wrapper">
    <ul class="songlist-container">
        <li v-for="(song, index) of songs" :key="song.id"
            @click="playSong(song, index)"
            :class="{'rank': rank}">
          <div class="icons" v-show="rank">
            <img src="./first.png" v-show="index === 0">
            <img src="./second.png" v-show="index === 1">
            <img src="./third.png" v-show="index === 2">
            <span v-show="index >2 ">{{ index + 1 }}</span>
          </div>
          <div class="song-content">
            <h2>{{ song.name }}</h2>
            <p class="desc">{{ getDesk(song) }}</p>
          </div>
        </li>
    </ul>
    <loading v-if="!songs.length" class="loading"></loading>
  </div>
</template>

<script>
import loading from 'base/loading/loading'

export default {
  name: 'song-list',

  props: {
    songs: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },

  components: {
    loading
  },

  methods: {
    getDesk (song) {
      return `${song.singer}·${song.album}`
    },
    playSong (song, index) {
      this.$emit('playSong', song, index) // 基础组件不写逻辑，把数据派发给父组件
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/mixin.styl'
@import '~common/css/global.styl'

.songlist-container
  height 100%
  padding .4rem .6rem
  li
    height 1.28rem
    h2
      ellipsis()
      color #ffffff
      line-height .4rem
    .desc
      ellipsis()
      color $fontcolor
      line-height .4rem
      margin-top .08rem
  .rank
    display flex
    align-items center
    .icons
      margin-right .6rem
      img
        width .5rem
        height .52rem
      span
        text-align center
        display block
        font-size .36rem
        color $maincolor
        width .5rem
        height .52rem
    .song-content
      p
        width calc(100vw - 120px)

.loading
  height calc(100vh - 5.2rem)
</style>