import { UserGroups, UserGroup } from "../records/TestConfig";

export const isUserInUserGroup = (
  property: string,
  userGroup: UserGroup,
  user: any
) => {
  const userProperty = user[property];

  if (Array.isArray(userGroup)) {
    return userGroup.includes(userProperty);
  }
  return userProperty === userGroup;
};

export const getNumberOfUserGroupsWhereUserIs = (
  userGroups: UserGroups,
  user: any
) => {
  const entries = Object.entries(userGroups);
  const filtered = entries.filter(([property, userGroup]) =>
    isUserInUserGroup(property, userGroup, user)
  );
  return filtered.length;
};

export const isNotUserInAllUserGroups = (userGroups: UserGroups, user: any) => {
  const numOfUserGroups = getNumberOfUserGroupsWhereUserIs(userGroups, user);
  return numOfUserGroups !== Object.values(userGroups).length;
};

export const isUserInAnyUserGroups = (userGroups: UserGroups, user: any) => {
  const numOfUserGroups = getNumberOfUserGroupsWhereUserIs(userGroups, user);
  return numOfUserGroups > 0;
};
