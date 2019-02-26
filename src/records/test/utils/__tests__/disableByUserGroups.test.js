import disableByUserGroups from "../disableByUserGroups";

const TEST_1 = {
  userGroup: {
    lang: ["en", "de"],
    browser: "chrome"
  }
};
const TEST_2 = {
  userGroupExclude: {
    lang: ["en", "de"],
    browser: "chrome"
  }
};

const enabled = { disabled: false, disabledReason: null };
const disabledUserGroup = { disabled: true, disabledReason: "user_group" };
const disabledUserGroupExclude = {
  disabled: true,
  disabledReason: "user_group_exclude"
};

describe("disableByUserGroups", () => {
  it("should return identity function if user not specified", () => {
    expect(disableByUserGroups(null)(1)).toEqual(1);
  });
  it("should not change if already disabled", () => {
    expect(disableByUserGroups({})(["X", { disabled: true }])).toEqual([
      "X",
      { disabled: true }
    ]);
  });
  it("should not change if set in override", () => {
    expect(disableByUserGroups({}, { X: "abc" })(["X", {}])).toEqual(["X", {}]);
  });
  it("should not change if test user group is empty", () => {
    expect(disableByUserGroups({}, {})(["X", { userGroup: {} }])).toEqual([
      "X",
      { userGroup: {} }
    ]);
  });

  it("should corerctly disable by user group", () => {
    expect(
      disableByUserGroups({ lang: "en", browser: "chrome" }, {})([
        "TEST_1",
        TEST_1
      ])
    ).toEqual(["TEST_1", { ...TEST_1, ...enabled }]);
    expect(
      disableByUserGroups({ lang: "cz", browser: "chrome" }, {})([
        "TEST_1",
        TEST_1
      ])
    ).toEqual(["TEST_1", { ...TEST_1, ...disabledUserGroup }]);
    expect(
      disableByUserGroups({ lang: "en", browser: "safari" }, {})([
        "TEST_1",
        TEST_1
      ])
    ).toEqual(["TEST_1", { ...TEST_1, ...disabledUserGroup }]);
  });

  // ========
  // exclude
  it("should disable by user group exclude for all", () => {
    expect(
      disableByUserGroups({ lang: "en", browser: "chrome" }, {}, true)([
        "TEST_2",
        TEST_2
      ])
    ).toEqual(["TEST_2", { ...TEST_2, ...disabledUserGroupExclude }]);
  });
  it("should disable by user group exclude for at least one user group", () => {
    expect(
      disableByUserGroups({ lang: "cz", browser: "chrome" }, {}, true)([
        "TEST_2",
        TEST_2
      ])
    ).toEqual(["TEST_2", { ...TEST_2, ...disabledUserGroupExclude }]);
    expect(
      disableByUserGroups({ lang: "en", browser: "safari" }, {}, true)([
        "TEST_2",
        TEST_2
      ])
    ).toEqual(["TEST_2", { ...TEST_2, ...disabledUserGroupExclude }]);
  });
  it("should pass user group excklude", () => {
    expect(
      disableByUserGroups({ lang: "cz", browser: "safari" }, {}, true)([
        "TEST_2",
        TEST_2
      ])
    ).toEqual(["TEST_2", { ...TEST_2, ...enabled }]);
  });
});
