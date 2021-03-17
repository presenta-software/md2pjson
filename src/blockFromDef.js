import yaml from 'yaml'

var blocks = [
  'image',
  'text',
  'embed',
  'youtube',
  'svg',
  'video',
  'vegalite',
  'chartjs',
  'fitty',
  'flowchartjs',
  'modelviewer'
]

export default src => {
  const parser = new DOMParser()
  const dom = parser.parseFromString(src, 'text/html').body
  const pre = dom.querySelectorAll('pre')
  const precode = dom.querySelectorAll('pre > code')
  const preArr = Array.from(pre)
  const blocksRes = []
  var nsrc = src
  if (precode.length > 0) {
    preArr.forEach(el => {
      const code = el.querySelector('code')
      const cls = code.getAttribute('class')
      if (cls) {
        const type = cls.replace('language-', '')
        const isBlockLegacy = blocks.indexOf(type) >= 0

        const isBlock = type.indexOf('_') === 0
        if (isBlockLegacy || isBlock) {
          const btype = isBlock ? type.substr(1) : type
          const b = code.innerHTML ? yaml.parse(code.innerHTML) : {}
          b.type = btype
          blocksRes.push(b)
          nsrc = nsrc.replace(/&quot;/mig, '"')
          nsrc = nsrc.replace(el.innerHTML, '')
        }
      }
    })
    return { blocks: blocksRes, src: nsrc }
  }

  return { blocks: [], src: nsrc }
}
