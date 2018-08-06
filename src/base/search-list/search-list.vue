<template>
  <div class="search-list-wrapper">
    <ul class="search-list">
      <li class="search-item"
          v-for="(item, index) of searches" :key=index
          @click="selectItem(item)">
        <span>{{ item }}</span>
        <svg class="icon" aria-hidden="true" @click.stop="deleteOne(item)">
          <use xlink:href="#icon-cha1"></use>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'search-list',

  props: {
    searches: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },

    deleteOne (item) {
      this.$emit('delete', item)
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
@import '~common/css/mixin.styl'

.search-list-wrapper
  .search-list
    .search-item
      height .8rem
      display flex
      justify-content space-between
      align-items center
      color $fontcolor
      .icon
        height .3rem
        width .3rem
.icon
  iconfontStyle()
</style>