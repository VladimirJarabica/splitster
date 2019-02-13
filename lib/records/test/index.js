"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTestsFromConfig = exports.getTestFromConfig = undefined;

var _toPairs2 = require("ramda/src/toPairs");

var _toPairs3 = _interopRequireDefault(_toPairs2);

var _map2 = require("ramda/src/map");

var _map3 = _interopRequireDefault(_map2);

var _fromPairs2 = require("ramda/src/fromPairs");

var _fromPairs3 = _interopRequireDefault(_fromPairs2);

var _compose2 = require("ramda/src/compose");

var _compose3 = _interopRequireDefault(_compose2);

var _disableByDev = require("./utils/disableByDev");

var _disableByDev2 = _interopRequireDefault(_disableByDev);

var _disableByOverride = require("./utils/disableByOverride");

var _disableByOverride2 = _interopRequireDefault(_disableByOverride);

var _disableByConfig = require("./utils/disableByConfig");

var _disableByConfig2 = _interopRequireDefault(_disableByConfig);

var _disableByUserGroups = require("./utils/disableByUserGroups");

var _disableByUserGroups2 = _interopRequireDefault(_disableByUserGroups);

var _disableByUsage = require("./utils/disableByUsage");

var _disableByUsage2 = _interopRequireDefault(_disableByUsage);

var _setWinningVariant = require("./utils/setWinningVariant");

var _setWinningVariant2 = _interopRequireDefault(_setWinningVariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1. disable by dev (developer specified it in override)
// 2. disable by config (test configuration contains `disabled: true`)
// 3. disable by previous disable (override is `__disabled_reason`)
// 4. disable by user group (user is not in some of the user group)
// 5. disable by user group exclude (user is in some if the exclusion user group)
// 6. disable by usage if override does not already have value (random)
// 7. set value if not disabled (if not disabled, based on user id set value)
var getTestFromConfig = exports.getTestFromConfig = function getTestFromConfig(_ref) {
  var override = _ref.override,
      user = _ref.user,
      userId = _ref.userId;
  return (0, _compose3.default)((0, _setWinningVariant2.default)(userId), (0, _disableByUsage2.default)(override), (0, _disableByUserGroups2.default)(user, override, true), // user group exclude
  (0, _disableByUserGroups2.default)(user, override),
  // disableByDeadline,
  _disableByConfig2.default, (0, _disableByOverride2.default)(override), (0, _disableByDev2.default)(override));
};

var getTestsFromConfig = exports.getTestsFromConfig = function getTestsFromConfig(tests, opts) {
  return (0, _compose3.default)(_fromPairs3.default, (0, _map3.default)(getTestFromConfig(opts)), _toPairs3.default)(tests);
};