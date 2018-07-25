import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'

export default function singerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const params = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, params, options)
}

export function getSongList (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const params = Object.assign({}, commonParams, {
    loginUin: 0,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 60,
    songstatus: 1
  })
  return jsonp(url, params, options)
}