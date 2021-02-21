import marked from 'marked'
import directives from './directives.js'
import blockFromSrc from './blockFromSrc'
import blockFromDef from './blockFromDef'
import fm from 'front-matter'
import defaults from './defaults'
import emoji from 'node-emoji'
import { colors, fonts } from './thememap'
import md5 from 'md5'

marked.setOptions({
  gfm: true,
  breaks: true
})

export default ostr => {
  const project = {
    scenes: []
  }
  const arr = []

  const front = fm(emoji.emojify(ostr))
  const attr = front.attributes
  var str = front.body

  str = str.replace(/\r\n?/g, '\n')

  for (const k in attr) {
    project[k] = attr[k]
  }

  project._integrity = md5(JSON.stringify(attr))

  if (project.colors) project.colors = colors[project.colors]
  if (project.fonts) project.fonts = fonts[project.fonts]

  const scenes = str.split('\n' + defaults.sceneSeparator + '\n')

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
