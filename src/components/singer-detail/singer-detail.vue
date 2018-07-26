<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :gb-image="bgImage"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSongList} from 'api/singer'
import {CODE_OK} from 'api/config'
import {createSong} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  name: 'singer-detail',

  data () {
    return {
      songs: []
    }
  },

  components: {
    MusicList
  },

  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.pic
    },
    ...mapGetters([
      'singer'
    ])
  },

  created () {
    this._getSongList()
  },

  methods: {
    _getSongList () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSongList(this.singer.id).then((res) => {
        if (res.code === CODE_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
          console.log(this.singer)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'

.slide-enter, .slide-leave-to
  opacity 0
.slide-enter-active, .slide-leave-active
  transition all .3s

</style>