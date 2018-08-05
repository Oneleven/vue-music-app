<template>
  <scroll class="suggest-wrapper"
          :data="result"
          :pullup="pullup"
          :beforeScroll="beforeScroll"
          @scrollToEnd="searchMore"
          @beforeScroll="hideKeyBoard"
          ref="suggestScroll">
    <ul class="suggest-list">
      <li v-for="(item, index) of result" :key=index @click="selectItem(item)">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="getIconClass(item)"></use>
        </svg>
        <p v-html="getSearchName(item)"></p>
      </li>
      <loading class="loading" v-show="hasMore"></loading>
    </ul>
    <div class="no-result" v-show="!hasMore && !result.length">
      <no-result></no-result>
    </div>
  </scroll>
</template>

<script>
import { search } from 'api/search'
import { CODE_OK } from 'api/config'
import { createSong } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import NoResult from 'base/no-result/no-result'
import {mapMutations, mapActions} from 'vuex'

const TYPE_SINGER = 'singer'
const perpage = 20

export default {
  name: 'suggest',

  components: {
    Scroll,
    Loading,
    NoResult
  },

  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    }
  },

  watch: {
    query () {
      this.getSearch()
    }
  },

  methods: {
    getSearch () {
      this.page = 1

      this.$refs.suggestScroll.scrollTo(0, 0)
      this.hasMore = true
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === CODE_OK) {
          this.result = this._genResult(res.data)
          // 检查是否有多余的数据
          this._checkMore(res.data)
          console.log(this.query)
          console.log(this.result)
        }
      })
    },

    // 上拉加载
    searchMore () {
      if (!this.hasMore) {
        return
      }
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === CODE_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },

    _checkMore (data) {
      const song = data.song
      if (!song.list.length || song.curnum + (song.curpage - 1) * perpage >= song.totalnum) {
        this.hasMore = false
      }
    },

    _genResult (data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      if (data.song) {
        ret = ret.concat(data.song.list)
      }
      return ret
    },

    getSearchName (item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        const data = createSong(item)
        return `${data.name}-${data.singer}`
      }
    },

    getIconClass (item) {
      return item.type === TYPE_SINGER ? '#icon-ren' : '#icon-yinle'
    },

    // 点击跳转二级路由
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer(item.singermid, item.singername)
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
        console.log(item)
      } else {
        const data = createSong(item)
        this.insertSong(data)
      }
    },

    hideKeyBoard () {
      this.$emit('hideKeyBoard')
    },

    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),

    ...mapActions([
      'insertSong'
    ])
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.suggest-wrapper
  navStyle()
  top 3.36rem
  overflow hidden
  .suggest-list
    padding 0 .6rem
    li
      height .32rem
      padding-bottom 20px
      color $fontcolor
      display flex
      .icon
        width .28rem
        height .28rem
        padding-right .32rem
      p
        height 100%
        flex 1
        ellipsis()
  .loading
    height 1rem
  .no-result
    margin-top .5rem
.icon
  iconfontStyle()
</style>