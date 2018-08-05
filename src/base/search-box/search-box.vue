<template>
  <div class="search-box">
    <div class="search-wrapper">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-search"></use>
      </svg>
      <input type="text" class="search-text"
                         :placeholder="placeholder"
                         v-model="query"
                         ref="inputQuery">
      <svg class="icon" aria-hidden="true" v-show="query" @click="handleClear">
        <use xlink:href="#icon-cha"></use>
      </svg>
    </div>
  </div>
</template>

<script>

export default {
  name: 'search-box',

  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },

  data () {
    return {
      query: ''
    }
  },

  methods: {
    handleClear () {
      this.query = ''
    },

    setQuery (query) {
      this.query = query
    },

    blur () {
      this.$refs.blurInput.blur()
    }
  },

  created () {
    let timer
    this.$watch('query', (newQuery) => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this.$emit('query', newQuery)
      }, 250)
    })
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.search-box
  padding .4rem
  .search-wrapper
    height .8rem
    width 100%
    background-color #333333
    border-radius 0.12rem
    display flex
    align-items center
    .search-text
      height .32rem
      flex 1
      background-color #333333
      color #ffffff
    .icon
      background-color #333333
      width .36rem
      height .36rem
      color $backcolor
      padding 0 .12rem
.icon
  iconfontStyle()
</style>