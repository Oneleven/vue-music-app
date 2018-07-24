export function addClass (el, classname) {
  let classList = el.classList
  if (classList.contains(classname)) {
    return undefined
  } else {
    classList.add(classname)
  }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNmaes = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNmaes) {
    if (elementStyle[transformNmaes[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle (style) {
  if (vendor === 'standard') {
    return style
  } else {
    return '-' + vendor + '-' + style
  }
}