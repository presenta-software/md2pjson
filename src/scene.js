
export default html => {
  let scene = {
    blocks: []
  }

  const el = document.createElement('div')
  el.innerHTML = html

  const hasText = el.querySelector('p,ul,ol,blockquote')
  const hasHeading = el.querySelector('h1,h2,h3,h4,h5,h6')
  const hasImage = el.querySelector('img')

  // console.log(hasText, hasHeading, hasImage)

  // regular text scene
  if (hasText) {
    scene = {
      blocks: [{
        type: 'text',
        text: html,
        textVar: 'text',
        scale: 2
      }]
    }
  }

  // heading slide, title only
  if (hasHeading && !hasText && !hasImage) {
    let textVar = 'title'
    let colorVar = 'sec'
    const h1 = el.querySelector('h1')
    const h2 = el.querySelector('h2')
    const h3 = el.querySelector('h3')

    if (h2 && !h1) {
      textVar = 'section'
      colorVar = 'alt'
    }

    if (h3 && !h2 && !h1) {
      textVar = 'mention'
      colorVar = 'main'
    }

    scene = {
      blocks: [{
        type: 'text',
        text: html,
        textVar,
        colorVar,
        scale: 3
      }]
    }
  }

  // image on the side or full scene
  if (hasImage) {
    const src = hasImage.getAttribute('src')
    hasImage.parentNode.removeChild(hasImage)
    const txt = el.textContent.trim()

    scene = {
      blocks: []
    }

    if (txt) {
      scene.blocks.push({
        type: 'text',
        text: el.innerHTML,
        textVar: 'mention'
      })
    } else {
      scene.colorBack = 'white'
    }

    scene.blocks.push({
      type: 'image',
      url: src,
      imageSize: 'contain',
      imagePadding: '2rem'
    })
  }

  return scene
}
