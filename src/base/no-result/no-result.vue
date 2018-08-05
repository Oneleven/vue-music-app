<template>
  <div class="no-reslut">
    <p>{{ wrong }}</p>
  </div>
</template>

<script>
export default {
  name: 'no-result',

  props: {
    wrong: {
      type: String,
      default: '>.< 抱歉，暂无搜索结果'
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.no-reslut
  background-color $backcolor
  color $fontcolor
  width 100%
  display flex
  justify-content center
  align-items center
  p
    font-size .35rem
</style>