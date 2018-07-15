export function addClass (el, classname) {
  let classList = el.classList
  if (classList.contains(classname)) {
    return undefined
  } else {
    classList.add(classname)
  }
}