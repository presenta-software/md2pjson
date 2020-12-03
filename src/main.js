import marked from 'marked'
import directives from './directives.js'
import blockFromSrc from './blockFromSrc'
import blockFromDef from './blockFromDef'

marked.setOptions({
  gfm: true,
  breaks: true
})

export default str => {
  const project = {
    scenes: []
  }

  const scenes = str.split('\n---\n')

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
    const parts = blkdef.src.split('\n<p>–</p>\n')
    parts.forEach(s => {
      scene.blocks.push(blockFromSrc(s))
    })

    // add additional blocks from definition, if any
    scene.blocks = scene.blocks.concat(blkdef.blocks)

    // check if there's only one block
    const oneBlock = scene.blocks.length === 1 ? scene.blocks[0] : null

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
