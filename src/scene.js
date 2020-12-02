
export default html => {
  const scene = {
    blocks: []
  }

  const el = document.createElement('div')
  el.innerHTML = html

  const hasH1 = el.querySelector('h1')
  const hasH2 = el.querySelector('h2')
  const hasH3 = el.querySelector('h3')

  const hasHeading = el.querySelector('h1,h2,h3')
  const hasText = el.querySelector('p,ul,ol,blockquote')
  const hasImage = el.querySelector('img')
  const onlyImage = hasImage ? hasText.innerHTML === hasImage.outerHTML : false

  // heading scene
  if (hasHeading && !hasText) {
    let textVar = 'title'
    let colorVar = 'sec'

    if (hasH2 && !hasH1) {
      textVar = 'section'
      colorVar = 'alt'
    }

    if (hasH3 && !hasH2 && !hasH1) {
      textVar = 'mention'
      colorVar = 'main'
    }

    scene.blocks = []
    scene.blocks.push({
      type: 'text',
      text: html,
      scale: 3,
      textVar,
      colorVar
    })
  }

  // regular text scene
  if (hasText) {
    scene.blocks = []
    scene.blocks.push({
      type: 'text',
      text: html,
      textVar: 'text',
      scale: 2
    })
  }

  // image only
  if (onlyImage) {
    const url = hasImage.getAttribute('src')
    scene.blocks = []
    scene.blocks.push({
      type: 'image',
      url
    })
  }

  return scene
}
