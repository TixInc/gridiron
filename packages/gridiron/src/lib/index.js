import gridironReact from '@tixinc/gridiron-react'
import gridironStyles from '@tixinc/gridiron-styles'
import * as gridironThemes from '@tixinc/gridiron-themes'
import reactFormula from '@tixinc/react-formula'
import reactFormulaStyles from '@tixinc/react-formula-styles'
import * as reactFormulaThemes from '@tixinc/react-formula-themes'
import reduxPager from '@tixinc/redux-pager'

export  { gridironReact
        , gridironStyles
        , gridironThemes
        , reactFormula
        , reactFormulaStyles
        , reactFormulaThemes
        , reduxPager
        }

export default function gridiron (deps, { themeName = 'mellow', ...defaults } = {}) {

  const formula = reactFormula(deps, { ...defaults, styles: reactFormulaStyles, theme: reactFormulaThemes[themeName] ? reactFormulaThemes[themeName] : reactFormulaThemes.mellow })
  deps = { ...deps, formula }

  const args = [ deps, { ...defaults, styles: gridironStyles, theme: gridironThemes[themeName] } ]

  return ({ ...gridironReact(...args)
          , styles: gridironStyles
          , themes: gridironThemes
          , ...reduxPager(...args)
          , formula
          , reactFormulaStyles
          , reactFormulaThemes
          })
}
