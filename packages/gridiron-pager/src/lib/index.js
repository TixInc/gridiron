import * as components from './components'

const applyCapitalization = str => str.length <= 2 ? str.toUpperCase() : `${str[0].toUpperCase()}${str.slice(1)}`

/**
 * gridironPager
 * Requires dependencies { React } and returns a Pager component factory.
 */
export default function gridironPager (deps, defaults) {
  return Object.keys(components).reduce((libs, x) => ({ ...libs, [applyCapitalization(x)]: components[x](deps, defaults) }), {})
}
