import marked from 'marked'
import directives from './directives.js'
import blockFromSrc from './blockFromSrc'
import blockFromDef from './blockFromDef'
import fm from 'front-matter'
import defaults from './defaults'

marked.setOptions({
  gfm: true,
  breaks: true
})

export default ostr => {
  const project = {
    scenes: []
  }

  const front = fm(ostr)
  const attr = front.attributes
  const str = front.body

  for (const k in attr) {
    project[k] = attr[k]
  }

  const scenes = str.split('\n' + defaults.sceneSeparator + '\n')

  const arr = []
  scenes.forEach(d => {
    // create the scene
    const scene = {
      blocks: []
    }

    // clean up the scene raw text
    const text = d.trim()

    // transform into HTML
    const srcHtml = marked(text)

    // parse the HTML to intercept block definitions
    const blkdef = blockFromDef(srcHtml)

    // parse the src text to create blocks
    const parts = blkdef.src.split('\n<p>' + defaults.fragmentSeparator + '</p>\n')
    parts.forEach(s => {
      const blk = blockFromSrc(s)
      if (blk) scene.blocks.push(blk)
    })

    // add additional blocks from definition, if any
    scene.blocks = scene.blocks.concat(blkdef.blocks)

    // add scene level props if any
    const prp = blkdef.props
    for (const k in prp) {
      scene[k] = prp[k]
    }

    // check if there's only one block
    const oneBlock = scene.blocks.length === 1 ? scene.blocks[0] : null

    // set the colorVar to scene the same as the first block
    if (oneBlock) {
      if (oneBlock.colorVar) scene.colorVar = oneBlock.colorVar || null
    }

    // parse directives and set into the scene
    const dir = directives(text)
    dir.forEach(d => {
      for (const k in d) {
        scene[k] = d[k]

        // only if there's one block, we propagate the properties also to the block level
        if (oneBlock) {
          oneBlock[k] = scene[k]
        }
      }
    })

    // add scene to array
    arr.push(scene)
  })

  project.scenes = arr

  return project
}
