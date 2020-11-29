import yaml from 'yaml'

export default str => {
  const res = []
  let reg = /(?=<!--)([\s\S]*?)-->/mig
  const matches = str.match(reg)
  if (matches) {
    matches.forEach(c => {
      reg = /<!--([\s\S]*?)-->/mig
      const rg = reg.exec(c)
      const prp = rg[1] ? rg[1].trim() : null

      if (prp) {
        try {
          res.push(yaml.parse(prp))
        } catch (e) {
        // console.log(e)
        }
      }
    })
  }

  return res
}
