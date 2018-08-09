<template>
  <ul class="tab-wrapper">
    <li class="tab-item"
        v-for="(item, index) of tabs" :key=index
        :class="{'active': currentIndex === index}"
        @click="switchItem(index)">
      <span>{{ item.name }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'tab',

  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },

  methods: {
    switchItem (index) {
      this.$emit('switch', index)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'

.tab-wrapper
  display flex
  align-items center
  width 4.8rem
  border 1px solid #333333
  margin 0 auto
  .tab-item
    flex 1
    font-size .28rem
    padding .16rem
    color hsla(0,0%,100%,.3)
    text-align center
  .active
    color #ffffff
    background-color #333333
</style>