import main from './main'
import utils from './utils'
import defaults from './defaults'
import { colors, fonts } from './thememap'

export default {
  parse: main,
  findIndex: utils.findIndex,
  findRange: utils.findRange,
  setting: defaults,
  colorsMap: colors,
  fontsMap: fonts
}
