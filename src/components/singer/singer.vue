<template>
  <div class="singer-container" ref="singer">
    <song-list :datas="singers"
               @selectedItem="selectedSinger"
               ref="songlist"></song-list>
    <router-view></router-view>
  </div>
</template>

<script>
import getSingerList from 'api/singer'
import { CODE_OK } from 'api/config'
import Singer from 'common/js/singer'
import SongList from 'base/songlist/songlist'
import {mapMutations} from 'vuex'
import { playlistMixin } from 'common/js/mixin'

export default {
  name: 'home-singer',

  mixins: [playlistMixin],

  components: {
    SongList
  },
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    // 设置miniplayer高度遮挡问题
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      console.log(11111)
      this.$refs.songlist.refresh()
    },

    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === CODE_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          console.log(this.singers)
        }
      })
    },

    _normalizeSinger (list) {
      let hotMap = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((value, index) => {
        if (index < 10) {
          hotMap.hot.items.push(new Singer(value.Fsinger_mid, value.Fsinger_name))
        }

        const key = value.Findex
        if (!hotMap[key]) {
          hotMap[key] = {
            title: key,
            items: []
          }
        }
        hotMap[key].items.push(new Singer(value.Fsinger_mid, value.Fsinger_name))
      })
      // 歌手列表有序化
      let hot = []
      let normal = []
      for (let key in hotMap) {
        let value = hotMap[key]
        if (value.title.match(/[a-zA-z]/)) {
          normal.push(value)
        } else if (value.title === '热门') {
          hot.push(value)
        }
      }
      normal.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(normal)
    },

    selectedSinger (item) {
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },

    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'

.singer-container
  position: fixed
  width: 100%
  top: 1.76rem
  bottom: 0
  background-color #222
</style>