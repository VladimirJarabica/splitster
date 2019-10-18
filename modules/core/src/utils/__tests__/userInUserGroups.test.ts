import {
  isUserInUserGroup,
  getNumberOfUserGroupsWhereUserIs,
  isNotUserInAllUserGroups,
  isUserInAnyUserGroups
} from "../userInUserGroups";

describe("user in user groups", () => {
  describe("user in user group", () => {
    const user = {
      lang: "en",
      age: 25
    };
    it("user should correctly (not) be in {string} user group ", () => {
      expect(isUserInUserGroup("lang", "en", user)).toBeTruthy();
      expect(isUserInUserGroup("lang", "de", user)).toBeFalsy();
    });
    it("user should correctly (not) be in {number} user group ", () => {
      expect(isUserInUserGroup("age", 25, user)).toBeTruthy();
      expect(isUserInUserGroup("age", 13, user)).toBeFalsy();
    });
    it("user should correctly (not) be in {array} user group ", () => {
      expect(isUserInUserGroup("lang", ["en", "de"], user)).toBeTruthy();
      expect(isUserInUserGroup("lang", ["de", "cz"], user)).toBeFalsy();
      expect(isUserInUserGroup("age", [13, 25], user)).toBeTruthy();
      expect(isUserInUserGroup("age", [13, 29], user)).toBeFalsy();
    });
  });

  const userGroups = {
    lang: "en",
    browser: ["chrome", "safari"],
    age: 25,
    iq: [100, 110]
  };
  describe("get number of user groups where user is", () => {
    it("should return correct number", () => {
      expect(getNumberOfUserGroupsWhereUserIs(userGroups, {})).toBe(0);
      expect(getNumberOfUserGroupsWhereUserIs(userGroups, { lang: "en" })).toBe(
        1
      );
      expect(getNumberOfUserGroupsWhereUserIs(userGroups, { lang: "de" })).toBe(
        0
      );
      expect(
        getNumberOfUserGroupsWhereUserIs(userGroups, {
          lang: "en",
          browser: "chrome",
          age: 25,
          iq: 110
        })
      ).toBe(4);
      expect(
        getNumberOfUserGroupsWhereUserIs(userGroups, {
          lang: "en",
          browser: "chrome",
          age: 25,
          iq: 0
        })
      ).toBe(3);
    });
  });
  describe("is not user in all user group", () => {
    it("check if user is NOT in all user groups", () => {
      expect(
        isNotUserInAllUserGroups(userGroups, {
          lang: "en",
          browser: "chrome",
          age: 25,
          iq: 110
        })
      ).toBeFalsy();
      expect(
        isNotUserInAllUserGroups(userGroups, {
          lang: "en",
          browser: "chrome",
          age: 25,
          iq: 0
        })
      ).toBeTruthy();
    });
  });
  describe("is user in any user group", () => {
    it("check if user is AT LEAST IN ONE user group", () => {
      expect(
        isUserInAnyUserGroups(userGroups, {
          lang: "en",
          browser: "mozzila",
          iq: 7
        })
      ).toBeTruthy();
      expect(
        isUserInAnyUserGroups(userGroups, {
          lang: "de",
          browser: "mozzila",
          iq: 7
        })
      ).toBeFalsy();
    });
  });
});
