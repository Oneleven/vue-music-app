<template>
  <div class="songlist-wrapper">
    <ul class="songlist-container">
        <li v-for="song of songs" :key="song.id">
          <div class="song-content">
            <h2>{{ song.name }}</h2>
            <p class="desc">{{ getDesk(song) }}</p>
          </div>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'song-list',

  props: {
    songs: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    getDesk (song) {
      return `${song.singer}·${song.album}`
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

</style>