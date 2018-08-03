<template>
  <div class="suggest-wrapper">
    <ul class="suggest-list">
      <li v-for="(item, index) of result" :key=index>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
        </svg>
        <p></p>
      </li>
      <!-- <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinle"></use>
        </svg>
        <p>sdfssdfasdfawefdfsaedfasderfqwefqwefqwerfqwerfrqwef</p>
      </li> -->
    </ul>
  </div>
</template>

<script>
import { search } from 'api/search'
import { CODE_OK } from 'api/config'

const TYPE_SINGER = 'singer'

export default {
  name: 'suggest',

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
      result: []
    }
  },

  watch: {
    query () {
      console.log('watch')
      this.getSearch()
    }
  },

  methods: {
    getSearch () {
      search(this.query, this.page, this.showSinger).then((res) => {
        if (res.code === CODE_OK) {
          console.log(res.data)
          // this.result = this._genResult(res.data)
        }
      })
    }

    // _genResult (data) {
    //   let ret = []
    //   if (data.zhida && data.zhida.singerid) {
    //     ret.push({...data.zhida, ...{type: TYPE_SINGER}})
    //   }
    //   if (data.song) {
    //     ret = ret.concat(data.song.list)
    //   }
  
    //   return ret
    // },

    // getSearchName (data) {
    //   if (item.type === TYPE_SINGER) {
    //     return item.singerName
    //   }
    // }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.suggest-wrapper
  navStyle()
  top 3.36rem
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
.icon
  iconfontStyle()
</style>