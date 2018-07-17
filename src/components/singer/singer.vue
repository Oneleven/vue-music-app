<template>
  <div class="singer-container">
    singer
  </div>
</template>

<script>
import getSingerList from 'api/singer'
import { CODE_OK } from 'api/config'
import Singer from 'common/js/singer'

export default {
  name: 'home-singer',
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === CODE_OK) {
          this.singers = res.data.list
          console.log(this._normalizeSinger(this.singers))
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
    }
  }
}
</script>

<style scoped lang='stylus'>
.singer-container
  position: fixed
  width: 100%
  top: 1.76rem
  bottom: 0
  background-color #222
</style>