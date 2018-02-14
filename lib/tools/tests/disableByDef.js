'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkDisabled = undefined;

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _mapObjIndexed = require('ramda/src/mapObjIndexed');

var _mapObjIndexed2 = _interopRequireDefault(_mapObjIndexed);

var _contains = require('ramda/src/contains');

var _contains2 = _interopRequireDefault(_contains);

var _match = require('ramda/src/match');

var _match2 = _interopRequireDefault(_match);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkDisabled = exports.checkDisabled = function checkDisabled(def) {
  if (!def) {
    return {
      disabled: false,
      disabledReason: null
    };
  }

  var _R$match = (0, _match2.default)(/^(__disabled_)(\w+)$/, def),
      _R$match2 = _slicedToArray(_R$match, 3),
      _ = _R$match2[0],
      disabled = _R$match2[1],
      reason = _R$match2[2];

  var reasons = ['usage', 'separate_test', 'user_group'];

  if (Boolean(disabled) && (0, _contains2.default)(reason, reasons)) {
    return {
      disabled: true,
      disabledReason: reason
    };
  }
  return {
    disabled: false,
    disabledReason: null
  };
};

var disableByDef = function disableByDef() {
  var def = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (tests) {
    return (0, _mapObjIndexed2.default)(function (test, testId) {
      if (test.disabled) {
        return test;
      }
      return (0, _merge2.default)(test, checkDisabled(def[testId]));
    })(tests);
  };
};

exports.default = disableByDef;