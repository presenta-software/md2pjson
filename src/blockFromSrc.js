
export default html => {
  let block = null

  const el = document.createElement('div')
  el.innerHTML = html

  const hasH1 = el.querySelector('h1')
  const hasH2 = el.querySelector('h2')
  const hasH3 = el.querySelector('h3')

  const hasHeading = el.querySelector('h1,h2,h3')
  let hasText = el.querySelector('h4,h5,h6,p,ul,ol,blockquote,code,table')
  const hasImage = el.querySelector('img')
  const hasTable = el.querySelector('table')

  // image vars
  let url
  let alt
  let onlyImage
  if (hasImage) {
    url = hasImage.getAttribute('src')
    alt = hasImage.getAttribute('alt')
    onlyImage = (!hasHeading && hasText.innerHTML === hasImage.outerHTML)
    hasText = (hasText.innerHTML !== hasImage.outerHTML)
  }
  const onlyTable = (hasTable && !hasHeading && hasText.innerHTML === hasTable.innerHTML)

  // style vars
  let textVar = 'text'
  let colorVar = 'main'
  if (!hasText && hasH1) {
    textVar = 'title'
    colorVar = 'sec'
  }
  if (!hasText && hasH2 && !hasH1) {
    textVar = 'section'
    colorVar = 'alt'
  }
  if (!hasText && hasH3 && !hasH2 && !hasH1) {
    textVar = 'mention'
    colorVar = 'main'
  }

  // HEADING
  if (hasHeading && !hasText) {
    block = {
      type: 'text',
      text: html,
      scale: 3,
      textVar,
      colorVar
    }
  }

  // TEXT
  if (hasText) {
    block = {
      type: 'text',
      text: html,
      textVar: 'text',
      scale: 2
    }
  }

  // IMAGE
  if (onlyImage) {
    const imageSize = alt || 'contain'
    const imagePadding = imageSize !== 'cover' ? '3rem' : ''
    block = {
      type: 'image',
      url,
      imageSize,
      imagePadding,
      colorBack: 'white'
    }
  }

  // BACK
  if (hasImage && alt === 'back') {
    hasImage.parentNode.parentNode.removeChild(hasImage.parentNode)
    block = {
      type: 'group',
      layout: 'stack',
      blocks: [{
        type: 'image',
        url
      }, {
        type: 'text',
        text: el.innerHTML,
        scale: 3
      }],
      textVar,
      colorVar
    }
  }

  if (onlyTable) {
    block = {
      type: 'text',
      text: html,
      textVar: 'text',
      textWidth: '100%',
      scale: 2
    }
  }

  return block
}
