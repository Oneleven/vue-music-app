import originJsonp from 'jsonp'

export default function jsonp (url, params, options) {
  url += ~url.indexOf('?') ? handleParams(params) : '?' + handleParams(params)
  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function handleParams (params) {
  let url = ''
  for (let k in params) {
    let value = params[k] !== undefined ? params[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  return url ? url.substring(1) : ''
}