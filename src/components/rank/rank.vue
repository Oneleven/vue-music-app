<template>
  <div class="rankScrollWrapper">
    <scroll class="rank-wrapper" ref="rankScroll">
      <ul class="rank-list">
        <li class="rank-item"
            v-for="item of this.topList"
            :key=item.id
            @click="handleTopList(item)">
          <img :src="item.picUrl">
          <ul class="inner-rank">
            <li v-for="(song, index) of item.songList" :key=index>{{index+1}}. {{song.songname}}-{{song.singername}}</li>
          </ul>
        </li>
      </ul>
      <div class="loading" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import { getRankList } from 'api/rank'
import { CODE_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  name: 'home-rank',

  mixins: [playlistMixin],

  data () {
    return {
      topList: []
    }
  },

  components: {
    Scroll,
    Loading
  },

  created () {
    this._getRankList()
  },

  methods: {
    _getRankList () {
      getRankList().then((res) => {
        if (res.code === CODE_OK) {
          this.topList = res.data.topList
        }
      })
    },

    ...mapMutations({
      setTopList: 'SET_TOPLIST'
    }),

    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.rankScroll.$el.style.bottom = bottom
      this.$refs.rankScroll.refresh()
    },

    handleTopList (item) {
      this.$router.push({
        path: `rank/${item.id}`
      })
      this.setTopList(item)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

  .rank-wrapper
    navStyle()
    overflow hidden
    .rank-list
      .rank-item
        box-sizing border-box
        height 2.4rem
        width 100%
        padding .4rem .4rem 0 .4rem
        display flex
        img
          width 2rem
          height 2rem
        .inner-rank
          box-sizing border-box
          height 100%
          padding-left .4rem
          flex 1
          display flex
          flex-direction column
          justify-content center
          align-items flex-start
          background-color #333333
          li
            line-height .52rem
            font-size .24rem
            color $fontcolor
            ellipsis()
            width calc(100vw - 180px)
    .loading
      height calc(100vh - 1.76rem)
</style>