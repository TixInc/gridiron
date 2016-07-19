import * as components from './components'

const applyCapitalization = str => str.length <= 2 ? str.toUpperCase() : `${str[0].toUpperCase()}${str.slice(1)}`

/**
 * reactFormula
 * Requires dependencies { React } and returns a decorated component.
 */
export default function reactFormula (deps, defaults) {
  return Object.keys(components).reduce((libs, x) => ({ ...libs, [applyCapitalization(x)]: components[x](deps, defaults) }), {})
}

export { default as factories } from './components/factories'
