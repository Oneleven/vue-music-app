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