<template>
  <div>
    <transition name="slide">
      <music-list :title="title" :gbImage="img" :songs="songs"></music-list>
    </transition>
  </div>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import { CODE_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  name: 'recommend-detail',

  components: {
    MusicList
  },

  data () {
    return {
      songs: []
    }
  },

  created () {
    this._getSongList()
  },

  computed: {
    ...mapGetters([
      'disc'
    ]),

    title () {
      return this.disc.dissname
    },

    img () {
      return this.disc.imgurl
    }
  },

  methods: {
    _getSongList () {
      if (!this.disc.dissid) {
        this.$router.push('/recommend')
      }
      getSongList(this.disc.dissid).then((res) => {
        if (res.code === CODE_OK) {
          this.songs = this._normalizeSongs(res.cdlist[0].songlist)
        }
      })
    },

    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
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
@import '~common/css/mixin.styl'

.slide-enter, .slide-leave-to
  opacity 0
.slide-enter-active, .slide-leave-active
  transition opacity 1.3s
</style>