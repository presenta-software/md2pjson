import yaml from 'yaml'
const parser = new DOMParser()

var blocks = [
  'image',
  'text',
  'embed',
  'youtube',
  'svg',
  'video',
  'vegalite',
  'chartjs',
  'fitty'
]

export default src => {
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
        const isBlock = blocks.indexOf(type) >= 0
        if (isBlock) {
          const b = yaml.parse(code.innerHTML)
          b.type = type
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
