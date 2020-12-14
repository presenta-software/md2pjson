import yaml from 'yaml'
const parser = new DOMParser()

var blocks = [
  'notes',

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
  var props = {}
  if (precode.length > 0) {
    preArr.forEach(el => {
      const code = el.querySelector('code')
      const type = code.getAttribute('class').replace('language-', '')
      const isBlock = blocks.indexOf(type) >= 0
      if (isBlock) {
        switch (type) {
          case 'notes':
            props.notes = code.innerHTML
            break

          default:
            const b = yaml.parse(code.innerHTML)
            b.type = type
            blocksRes.push(b)
            nsrc = nsrc.replace(el.innerHTML, '')
            break
        }
      }
    })
    return { blocks: blocksRes, src: nsrc, props }
  }

  return { blocks: [], src: nsrc, props }
}
