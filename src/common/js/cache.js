// localStory存储

import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15

const SONG_KEY = '__song__'
const SONG_MAX_LENGTH = 100

const FAVOURITE_KEY = '__favourite__'
const FAVOURITE_MAX_LENGTH = 200

function insertArray (arr, val, compare, maxLength) {
  const index = arr.findIndex(compare) // compare是一个函数
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLength && arr.length > maxLength) {
    arr.pop()
  }
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)

  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

// 删除数组中的元素
function deleteFromArr (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArr(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

// 存储歌曲
export function saveSong (song) {
  let songs = storage.get(SONG_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, SONG_MAX_LENGTH)

  storage.set(SONG_KEY, songs)
  return songs
}

export function loadSong () {
  return storage.get(SONG_KEY, [])
}

// 添加喜欢的歌曲
export function saveFavourite (song) {
  let songs = storage.get(FAVOURITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVOURITE_MAX_LENGTH)

  storage.set(FAVOURITE_KEY, songs)
  return songs
}

export function deleteFavourite (song) {
  let songs = storage.get(FAVOURITE_KEY, [])
  deleteFromArr(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVOURITE_KEY, songs)
  return songs
}

export function loadFavourite () {
  let songs = storage.get(FAVOURITE_KEY, [])
  return songs
}