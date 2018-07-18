<template>
  <scroll class="scroll" ref="songlist">
    <ul>
      <li v-for="group of datas" :key=group.title ref="contentlist">
        <h2 class="list-title">{{ group.title }}</h2>
        <ul>
          <li v-for="item of group.items" :key=item.id class="item-wrapper">
            <img v-lazy=item.pic class="avatar">
            <span class="sing-name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <ul class="letter-list" @touchstart="handleTouchStart">
      <li v-for="(value, index) of letterList" :key=index :data-index=index>{{ value }}</li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  name: 'songlist',
  props: {
    datas: {
      type: Array,
      default: () => []
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
      let index = e.target.getAttribute('data-index')
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