<template>
  <transition name="slide">
    <div class="singer-detail">
      heihei
    </div>
  </transition>
</template>

<script>
import {mapGetters} from 'vuex'
import {getSongList} from 'api/singer'
import {CODE_OK} from 'api/config'
import {createSong} from 'common/js/song'

export default {
  name: 'singer-detail',

  data () {
    return {
      songs: []
    }
  },

  computed: {
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

.singer-detail
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background-color $backcolor
  color $fontcolor
.slide-enter, .slide-leave-to
  transform translateX(100%)
.slide-enter-active, .slide-leave-active
  transition transform .5s

</style>