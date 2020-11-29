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
      const text = d.trim()

      const srcHtml = marked(text)

      const blk = block(srcHtml)

      const scn = scene(blk.src)
      scn.blocks = scn.blocks.concat(blk.blocks)

      const props = {}

      const dir = directives(text)
      dir.forEach(d => {
        for (const k in d) {
          props[k] = d[k]
        }
      })

      for (const p in props) {
        scn[p] = props[p]
        // scn.blocks.forEach(block => {
        //   block[p] = props[p]
        // })
      }

      arr.push(scn)
    }
  })

  project.scenes = arr

  return project
}
