import defaults from './defaults'
import fm from 'front-matter'

const findIndex = (ocode, line) => {
  const front = fm(ocode)
  const hasFront = front.bodyBegin > 1
  const code = front.body

  const lines = ocode.split('\n')

  let beg = 0
  if (hasFront) {
    const fSep = lines.indexOf(defaults.sceneSeparator)
    const sSep = lines.indexOf(defaults.sceneSeparator, fSep + 1)
    beg = sSep + 1
  }

  if (line < beg) return -1

  let sceneNum = 0
  for (var j = beg; j <= line; j++) {
    const l = lines[j]
    if (line === j) {
      return sceneNum
    }
    if (l && l.indexOf(defaults.sceneSeparator) === 0) sceneNum++
  }
  return sceneNum
}

const findRange = (ocode, index) => {
  const front = fm(ocode)
  const hasFront = front.bodyBegin > 1

  const lines = ocode.split('\n')

  let beg = 0

  if (hasFront) {
    const fSep = lines.indexOf(defaults.sceneSeparator)
    const sSep = lines.indexOf(defaults.sceneSeparator, fSep + 1)
    beg = sSep + 1
  }

  let sceneNum = -1
  let start = beg
  let end = 0

  for (var j = beg; j <= lines.length; j++) {
    const l = lines[j]

    if (l && l.indexOf(defaults.sceneSeparator) === 0) {
      sceneNum++
    }

    if (index === sceneNum) {
      end = j
      return { start, end }
    }

    if (l && l.indexOf(defaults.sceneSeparator) === 0) {
      start = j + 1
    }
  }
  return { start, end }
}

export default { findIndex, findRange }
