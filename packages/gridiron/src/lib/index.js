import gridironReact from 'gridiron-react'
import gridironStyles from '@tixinc/gridiron-styles'
import * as gridironThemes from '@tixinc/gridiron-themes'
import reactFormula from 'react-formula'
import reactFormulaStyles from 'react-formula-styles'
import * as reactFormulaThemes from 'react-formula-themes'
import reactPre from 'react-pre'
import reactPreStyles from 'react-pre-styles'
import * as reactPreThemes from 'react-pre-themes'
import reduxPager from 'redux-pager'

export  { gridironReact
        , gridironStyles
        , gridironThemes
        , reactFormula
        , reactFormulaStyles
        , reactFormulaThemes
        , reactPre
        , reactPreStyles
        , reactPreThemes
        , reduxPager
        }

export default function gridiron (deps, { themeName = 'mellow', ...defaults } = {}) {

  const pre = reactPre(deps, { ...defaults, styles: reactPreStyles, theme: reactPreThemes[themeName] })
  deps = { ...deps, ...pre }

  const formula = reactFormula(deps, { ...defaults, styles: reactFormulaStyles, theme: reactFormulaThemes[themeName] })
  deps = { ...deps, formula }

  const args = [ deps, { ...defaults, styles: gridironStyles, theme: gridironThemes[themeName] } ]

  return ({ ...pre
          , ...gridironReact(...args)
          , styles: gridironStyles
          , themes: gridironThemes
          , ...reduxPager(...args)
          , formula
          , reactFormulaStyles
          , reactFormulaThemes
          , reactPreStyles
          , reactPreThemes
          })
}
