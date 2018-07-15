<template>
  <div class= "recommend-wrapper" v-if= "recommends.length">
    <div class="slider-wrapper">
      <slider>
        <div v-for="item of recommends" :key=item.id>
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
        </div>
      </slider>
    </div>
    <h1 class="recommend-title">热门歌单推荐</h1>
    <ul class="recommend-list">
      <li></li>
    </ul>
  </div>
</template>

<script>

import { getRecommend } from 'api/recommend'
import Slider from 'base/slider/slider'
import { CODE_OK } from 'api/config'

export default {
  name: 'home-recommend',
  components: {
    Slider
  },
  data () {
    return {
      recommends: []
    }
  },
  created () {
    this._getRecommend()
  },
  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        if (res.code === CODE_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~common/css/global.styl'
.recommend-wrapper
  .recommend-title
    line-height 1.3rem
    color $maincolor
    text-align center
</style>