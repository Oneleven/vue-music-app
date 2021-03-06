import { playMode } from 'common/js/config' // 语意化
import {loadSearch, loadSong, loadFavourite} from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  searchHistory: loadSearch(), // 从localStorage里读取
  songHistory: loadSong(),
  favouriteList: loadFavourite()
}

export default state