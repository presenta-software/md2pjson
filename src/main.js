import marked from 'marked'
import directives from './directives.js'
import scene from './scene'
import block from './block'

marked.setOptions({
  gfm: true,
  breaks: true
})

export default str => {
  const project = {
    scenes: []
  }

  const reg = /\s*?(\n---\n)\s*?/gm
  const scenes = str.split(reg)

  const arr = []
  scenes.forEach(d => {
    if (d !== '\n---\n') {
      // clean up the scene raw text
      const text = d.trim()

      // transform into HTML
      const srcHtml = marked(text)

      // parse the HTML to intercept block definitions
      const blk = block(srcHtml)

      // create the scene object
      const scn = scene(blk.src)

      // add additional blocks from definition, if any
      scn.blocks = scn.blocks.concat(blk.blocks)

      // check if there's only one block
      const oneBlock = scn.blocks.length === 1 ? scn.blocks[0] : null

      // parse directives and set into the scene
      const dir = directives(text)
      dir.forEach(d => {
        for (const k in d) {
          scn[k] = d[k]

          // only if there's one block, we propagate the properties also to the block level
          if (oneBlock) {
            oneBlock[k] = scn[k]
          }
        }
      })

      // add scene to array
      arr.push(scn)
    }
  })

  project.scenes = arr

  return project
}
