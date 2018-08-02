<template>
  <transition name="slide" >
    <music-list :gbImage="img" :title="title" :songs="rankSongs" :rank="rank"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { CODE_OK } from 'api/config'
import { createSong } from 'common/js/song'

export default {
  name: 'rank-detail',

  components: {
    MusicList
  },

  data () {
    return {
      rankSongs: [],
      rank: true
    }
  },

  created () {
    this._getMusicList()
  },

  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }

      getMusicList(this.topList.id).then((res) => {
        if (res.code === CODE_OK) {
          this.rankSongs = this._normalizeSongs(res.songlist)
        }
      })
    },

    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },

  computed: {
    ...mapGetters([
      'topList'
    ]),

    title () {
      return this.topList.topTitle
    },

    img () {
      if (this.rankSongs.length) {
        return this.rankSongs[0].image
      }
      return ''
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
  transition opacity .5s

</style>