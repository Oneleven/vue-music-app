import {mapGetters, mapMutations} from 'vuex'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },

  mounted () {
    this.handlePlaylist(this.playlist)
  },

  activated () {
    this.handlePlaylist(this.playlist)
  },

  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal)
    }
  },

  methods: {
    handlePlaylist () {
      throw new Error('在组建内实现handlePlaylist函数')
    }
  }
}

export const playerMixin = {
  computed: {
    ...mapGetters([
      'playlist',
      'mode',
      'currentSong',
      'sequenceList'
    ])
  },

  methods: {
    ...mapMutations({
      setNext: 'SET_CURRENT_INDEX',
      setMode: 'SET_PLAY_MODE',
      setList: 'SET_PLAYLIST'
    }),

    changeMode () {
      const mode = (this.mode + 1) % 3
      this.setMode(mode)
      let list = null
      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setList(list)
    },

    // 切换模式时当前歌曲不变
    resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setNext(index)
    }
  }
}