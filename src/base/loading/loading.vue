<template>
  <div class="loading">
    <img src="./loading.gif" alt="loading" />
    <p class="desc">{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props: {
    content: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped lang='stylus'>
.loading
  height calc(100vh - 3.06rem - 40vw)
  display flex
  justify-content center
  align-items center
  flex-direction column
  .desc
    color #ffffff
  img
    width .6rem
    padding-bottom .2rem
</style>