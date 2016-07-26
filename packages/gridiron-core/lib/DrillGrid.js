'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Connect = exports.DefaultProps = exports.PropTypes = undefined;

var _CoreGrid = require('./CoreGrid');

var CoreGrid = _interopRequireWildcard(_CoreGrid);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Interface factory for <DrillGrid /> components.
 */
var PropTypes = exports.PropTypes = function PropTypes(React) {
  return { cols: React.PropTypes.array.isRequired
    //, rows: React.PropTypes.array.isRequired
    , data: React.PropTypes.object.isRequired,
    mapDrill: React.PropTypes.func.isRequired,
    styles: React.PropTypes.object.isRequired,
    maxHeight: React.PropTypes.number
  };
};

/**
 * DefaultProps factory for <CoreGrid /> components.
 */
var DefaultProps = exports.DefaultProps = function DefaultProps(React) {
  return {};
};

/**
 * Creates a react-redux style connect function tailed for <DrillGrid />
 * @param  {function}  options.connect  react-redux connect function dependency.
 * @param  {...Object} options.rest     The rest of the connect related dependencies.
 * @return {Grid}                       A higher order <Grid /> component.
 */
var Connect = exports.Connect = CoreGrid.Connect;