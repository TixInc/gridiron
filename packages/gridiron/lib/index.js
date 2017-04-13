'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxPager = exports.reactFormulaThemes = exports.reactFormulaStyles = exports.reactFormula = exports.gridironThemes = exports.gridironStyles = exports.gridironReact = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = gridiron;

var _gridironReact = require('@tixinc/gridiron-react');

var _gridironReact2 = _interopRequireDefault(_gridironReact);

var _gridironStyles = require('@tixinc/gridiron-styles');

var _gridironStyles2 = _interopRequireDefault(_gridironStyles);

var _gridironThemes = require('@tixinc/gridiron-themes');

var gridironThemes = _interopRequireWildcard(_gridironThemes);

var _reactFormula = require('@tixinc/react-formula');

var _reactFormula2 = _interopRequireDefault(_reactFormula);

var _reactFormulaStyles = require('@tixinc/react-formula-styles');

var _reactFormulaStyles2 = _interopRequireDefault(_reactFormulaStyles);

var _reactFormulaThemes = require('@tixinc/react-formula-themes');

var reactFormulaThemes = _interopRequireWildcard(_reactFormulaThemes);

var _reduxPager = require('@tixinc/redux-pager');

var _reduxPager2 = _interopRequireDefault(_reduxPager);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.gridironReact = _gridironReact2.default;
exports.gridironStyles = _gridironStyles2.default;
exports.gridironThemes = gridironThemes;
exports.reactFormula = _reactFormula2.default;
exports.reactFormulaStyles = _reactFormulaStyles2.default;
exports.reactFormulaThemes = reactFormulaThemes;
exports.reduxPager = _reduxPager2.default;
function gridiron(deps) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _ref$themeName = _ref.themeName,
      themeName = _ref$themeName === undefined ? 'mellow' : _ref$themeName,
      defaults = _objectWithoutProperties(_ref, ['themeName']);

  var formula = (0, _reactFormula2.default)(deps, _extends({}, defaults, { styles: _reactFormulaStyles2.default, theme: reactFormulaThemes[themeName] ? reactFormulaThemes[themeName] : reactFormulaThemes.mellow }));
  deps = _extends({}, deps, { formula: formula });

  var args = [deps, _extends({}, defaults, { styles: _gridironStyles2.default, theme: gridironThemes[themeName] })];

  return _extends({}, _gridironReact2.default.apply(undefined, args), { styles: _gridironStyles2.default,
    themes: gridironThemes
  }, _reduxPager2.default.apply(undefined, args), { formula: formula,
    reactFormulaStyles: _reactFormulaStyles2.default,
    reactFormulaThemes: reactFormulaThemes
  });
}