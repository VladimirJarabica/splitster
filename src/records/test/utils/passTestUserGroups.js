import * as R from 'ramda';

export const getUserGroupRule = userGroupSubConfig => {
  if (typeof userGroupSubConfig === 'function') return userGroupSubConfig;
  // { key: "string", key: ["string", "string"]}
  const rules = R.map(
    key => user => {
      const allowedValues = Array.isArray(userGroupSubConfig[key])
        ? userGroupSubConfig[key]
        : [userGroupSubConfig[key]];

      return R.contains(R.prop(key, user), allowedValues);
    },
    R.keys(userGroupSubConfig),
  );
  return R.allPass(rules);
};

export const getUserGroup = userGroupConfig => {
  if (typeof userGroupConfig === 'function') {
    return [userGroupConfig];
  }

  const userGroupSubConfigs = Array.isArray(userGroupConfig)
    ? userGroupConfig
    : [userGroupConfig];

  return R.map(getUserGroupRule, userGroupSubConfigs);
};

export const checkUserToUserGroup = (user, userGroup) =>
  R.allPass(userGroup)(user);

const passTestUserGroups = (userGroup, user) => {
  if (R.isEmpty(userGroup)) return true;

  if (Array.isArray(userGroup)) {
    return R.allPass(
      R.map(
        _userGroup => R.partial(passTestUserGroups, [_userGroup]),
        userGroup,
      ),
    )(user);
  }

  //   if (typeof testUserGroup === 'string') {
  //     return checkUserToUserGroup(user, userGroups[testUserGroup]);
  //   }

  return checkUserToUserGroup(user, getUserGroup(userGroup));
};

export default passTestUserGroups;
