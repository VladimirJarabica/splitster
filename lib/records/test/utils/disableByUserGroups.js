'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assoc = require('ramda/src/assoc');

var _assoc2 = _interopRequireDefault(_assoc);

var _compose = require('ramda/src/compose');

var _compose2 = _interopRequireDefault(_compose);

var _isEmpty = require('ramda/src/isEmpty');

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _not = require('ramda/src/not');

var _not2 = _interopRequireDefault(_not);

var _identity = require('ramda/src/identity');

var _identity2 = _interopRequireDefault(_identity);

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _testOverridePersistance = require('./testOverridePersistance');

var _testOverridePersistance2 = _interopRequireDefault(_testOverridePersistance);

var _passTestUserGroups = require('./passTestUserGroups');

var _passTestUserGroups2 = _interopRequireDefault(_passTestUserGroups);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getDisabledReason = function getDisabledReason(exclude) {
  return exclude ? 'user_group_exclude' : 'user_group';
};

var disableByUserGroups = function disableByUserGroups(user, override) {
  var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!user) return _identity2.default;

  var checker = exclude ? _identity2.default : _not2.default;

  return function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        testId = _ref2[0],
        test = _ref2[1];

    var userGroup = exclude ? test.userGroupExclude : test.userGroup;

    if (test.disabled || (0, _testOverridePersistance2.default)(testId, override) || (0, _isEmpty2.default)(userGroup)) {
      return [testId, test];
    }

    var disabledByUserGroups = checker((0, _passTestUserGroups2.default)(userGroup, user || {}));

    return [testId, (0, _compose2.default)((0, _assoc2.default)('disabledReason', disabledByUserGroups ? getDisabledReason(exclude) : null), (0, _assoc2.default)('disabled', disabledByUserGroups))(test)];
  };
};

exports.default = disableByUserGroups;