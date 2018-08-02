<template>
  <div class="recommend-container" ref="recommendContainer">
    <scroll class= "recommend-wrapper" v-if= "recommends.length" ref="scroll" :data="hotSongList">
      <div>
        <div class="slider-wrapper">
          <slider>
            <div v-for="item of recommends" :key=item.id>
                  <a :href="item.linkUrl">
                    <img :src="item.picUrl" @load="loadImg" class="needsclick">
                  </a>
            </div>
          </slider>
        </div>
        <h1 class="recommend-title">热门歌单推荐</h1>
        <ul class="recommend-list">
          <li v-for="item of hotSongList"
              :key=item.dissid
              @click="handleIn(item)">
            <img v-lazy=item.imgurl class="album">
            <div class="list-right">
              <h2 class="song-name">{{item.creator.name}}</h2>
              <p class="song-desc">{{item.dissname}}</p>
            </div>
          </li>
        </ul>
        <loading v-if="!hotSongList.length" class="loading"></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>

import { getRecommend, getHotSongList } from 'api/recommend'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { CODE_OK } from 'api/config'
import { playlistMixin } from 'common/js/mixin'
import { mapMutations } from 'vuex'

export default {
  name: 'home-recommend',

  mixins: [playlistMixin],

  components: {
    Slider,
    Scroll,
    Loading
  },

  data () {
    return {
      recommends: [],
      hotSongList: []
    }
  },

  created () {
    this._getRecommend()
    this._getHotSongList()
  },

  methods: {
    // 设置miniplayer最小化遮挡scroll底部滑动问题
    handlePlaylist (playlist) {
      if (playlist.length <= 0) {
        return
      }
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommendContainer.style.bottom = bottom
      this.$refs.scroll.refresh()
    },

    // 点击跳转路由
    handleIn (item) {
      console.log(item)
      this.$router.push({
        path: `recommend/${item.dissid}`
      })
      this.setDisc(item)
    },

    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === CODE_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getHotSongList () {
      getHotSongList().then((res) => {
        if (res.code === CODE_OK) {
          this.hotSongList = res.data.list
        }
      })
    },
    loadImg () { // 设置一个标识位，让逻辑代码只执行一次
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    },

    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'
.recommend-container
  position: fixed
  width: 100%
  top: 1.76rem
  bottom: 0
  background-color #222
  .recommend-wrapper
    height 100%
    overflow hidden
    .recommend-title
      line-height 1.3rem
      color $maincolor
      text-align center
    .recommend-list
      li
        display flex
        padding 0 .4rem .4rem .4rem
        .album
          height 1.2rem
          padding-right .4rem
        .list-right
          flex 1
          display flex
          flex-direction column
          justify-content center
          align-items flex-start
          .song-name
            color #ffffff
            line-height .4rem
            padding-bottom .1rem
            ellipsis()
          .song-desc
            width 95%
            line-height .4rem
            color $fontcolor
            ellipsis()
    .loading
      height calc(100vh - 3.06rem - 40vw)
</style>