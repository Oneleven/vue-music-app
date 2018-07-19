<template>
  <scroll class="scroll" ref="songlist" :probe-type="probeType" >
    <ul>
      <li v-for="group of datas" :key=group.title ref="contentlist">
        <h2 class="list-title">{{ group.title }}</h2>
        <ul class="main-content">
          <li v-for="item of group.items" :key=item.id class="item-wrapper">
            <img v-lazy=item.pic class="avatar">
            <span class="sing-name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="letter-list"
        @touchstart="handleTouchStart"
        @touchmove.stop.prevent="handleTouchMove"
        @touchend="handleTouchEnd">
      <li v-for="(value, index) of letterList" :key=index :data-index=index>{{ value }}</li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
const LETTER_HEIGHT = 18
export default {
  name: 'songlist',
  props: {
    datas: {
      type: Array,
      default: () => []
    }
  },
  created () {
    this.touch = {} // 在touch上挂载公用的状态(基础组件，所以定义在this上。里面的位置信息不需要被监听，所以定义在created中)
    this.probeType = 3
  },
  data () {
    return {
      touchStatus: false
    }
  },
  computed: {
    letterList () {
      return this.datas.map((value) => {
        return value.title.substr(0, 1)
      })
    }
  },
  components: {
    Scroll
  },
  methods: {
    handleTouchStart (e) {
      this.touchStatus = true
      let index = e.target.getAttribute('data-index')

      this.touch.y1 = e.touches[0].pageY
      this.touch.anchorIndex = parseInt(index)

      this._scrollTo(index)
    },
    handleTouchMove (e) {
      if (this.touchStatus) {
        this.touch.y2 = e.touches[0].pageY
        let delta = this.touch.y2 - this.touch.y1
        let currentIndex = this.touch.anchorIndex + Math.floor(delta / LETTER_HEIGHT)
        this._scrollTo(currentIndex)
      }
    },
    handleTouchEnd () {
      this.touchStatus = false
    },
    _scrollTo (index) { // _表示约定的私有方法
      this.$refs.songlist.scrollToElement(this.$refs.contentlist[index], 0)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
.scroll
  height 100%
  overflow hidden
  .list-title
    line-height .6rem
    padding-left .4rem
    color $fontcolor
    background-color #333333
  .main-content
    padding-bottom .4rem
  .item-wrapper
    padding .4rem 0 0 .6rem
    .avatar
      width 1rem
      border-radius 50%
    .sing-name
      padding-left .4rem
      color $fontcolor
  .letter-list
    margin 0 a
    color $fontcolor
    position fixed
    right 0
    top 50%
    transform translateY(-40%)
    background: rgba(0,0,0,.3)
    padding .2rem 0 .2rem 0
    border-radius .2rem
    li
      line-height .36rem
      width .4rem
      font-size .24rem
      text-align center
</style>