// 异步操作，或者对某个mutations的封装，比如说某个动作触发多个mutations的时候
import * as types from './mutation-types'

export const playSong = function (ctx, {list, index}) { // 这里ctx是store的实例，也可以写成{commit, state}
  ctx.commit(types.SET_SEQUENCE_LIST, list)
  ctx.commit(types.SET_PLAYLIST, list)
  ctx.commit(types.SET_CURRENT_INDEX, index)
  ctx.commit(types.SET_FULLSCREEN, true)
  ctx.commit(types.SET_PLAYING_STATE, true)
}