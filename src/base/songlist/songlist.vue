<template>
  <scroll class="scroll"
          ref="songlist"
          :probe-type="probeType"
          :listen-scroll="listenScroll"
          @scroll="scroll">
    <ul>
      <li v-for="group of datas" :key=group.title ref="contentlist">
        <h2 class="list-title">{{ group.title }}</h2>
        <ul class="main-content">
          <li v-for="item of group.items"
              :key=item.id
              class="item-wrapper"
              @click="selectItem(item)">
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
      <li v-for="(value, index) of letterList"
          :key=index
          :data-index=index
          :class="{'active': curIndex === index}">{{ value }}</li>
    </ul>
    <div class="title-fixed" v-show="fixedContent" ref="fixed">
      <h2>{{fixedContent}}</h2>
    </div>
    <loading v-if="!datas.length" class="loading"></loading>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import loading from 'base/loading/loading'

const LETTER_HEIGHT = 18
const TITLE_HEIGHT = 30

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
    this.listenScroll = true
    this.listHeight = []
  },

  data () {
    return {
      touchStatus: false,
      scrollY: -1,
      curIndex: 0,
      dif: -1
    }
  },

  computed: {
    letterList () {
      return this.datas.map((value) => {
        return value.title.substr(0, 1)
      })
    },
    fixedContent () {
      if (this.scrollY > 0) {
        return ''
      }
      return this.datas[this.curIndex] ? this.datas[this.curIndex].title : ''
    }
  },

  components: {
    Scroll,
    loading
  },

  methods: {
    refresh () {
      this.$refs.songlist.refresh()
    },

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
      this.scrollY = -this.listHeight[index]
      this.$refs.songlist.scrollToElement(this.$refs.contentlist[index], 0)
    },
    scroll (pos) {
      this.scrollY = pos.y
    },
    _calcHeight () {
      let list = this.$refs.contentlist
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectItem (item) {
      this.$emit('selectedItem', item)
    }
  },

  watch: {
    datas () { // 当datas的值传进来的时候，监听变化触发计算高度的事件，且只有传值变化的时候才会重新计算
      setTimeout(() => {
        this._calcHeight()
      }, 20)
    },
    scrollY (newY) { // 这里的newY即实时滚动时pos.y
      const listHeight = this.listHeight
      // 监听的scroll事件中的pos.y是负值，如果大于顶部，newY>0
      if (newY > 0) {
        this.curIndex = 0
        return
      }
      // 滚动到中间位置
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.curIndex = i
          // 设置title
          this.dif = height2 + newY
        }
      }
      // 超出底部位置
      let maxIndex = listHeight.length - 1
      let maxHeight = listHeight[maxIndex]
      if (-newY > maxHeight) {
        this.curIndex = maxIndex
      }
    },
    dif (newDif) {
      let top = (newDif > 0 && newDif < TITLE_HEIGHT) ? newDif - TITLE_HEIGHT : 0
      this.$refs.fixed.style.transform = `translateY(${top}px)`
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
.scroll
  height 100%
  overflow hidden
  position relative
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
    .active
      color $maincolor
  .title-fixed
    position absolute
    width 100%
    top 0
    left 0
    background-color #222
    h2
      line-height .6rem
      padding-left .4rem
      color $fontcolor
      background-color #333333
</style>