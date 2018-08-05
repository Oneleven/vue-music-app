// 异步操作，或者对某个mutations的封装，比如说某个动作触发多个mutations的时候
import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

export const playSong = function (ctx, {list, index}) { // 这里ctx是store的实例，也可以写成{commit, state}
  ctx.commit(types.SET_SEQUENCE_LIST, list)

  if (ctx.state.mode === playMode.random) {
    let randomList = shuffle(list)
    ctx.commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    ctx.commit(types.SET_PLAYLIST, list)
  }

  ctx.commit(types.SET_CURRENT_INDEX, index)
  ctx.commit(types.SET_FULLSCREEN, true)
  ctx.commit(types.SET_PLAYING_STATE, true)
}

export const random = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let currentSong = playlist[currentIndex]

  // 在playlist中插入歌曲
  let fdIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)

  if (fdIndex > -1) {
    if (fdIndex > currentIndex) {
      playlist.splice(fdIndex + 1, 1)
    } else {
      playlist.splice(fdIndex)
    }
  }

  // 在sequencelist中插入歌曲
  let currentsIndex = findIndex(sequenceList, currentSong) + 1
  let fdsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentsIndex, 0, song)

  if (fdsIndex > currentsIndex) {
    sequenceList.splice(fdIndex + 1, 1)
  } else {
    sequenceList.splice(fdIndex, 1)
  }

  // 提交commit
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}