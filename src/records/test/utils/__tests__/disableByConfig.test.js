import disableByConfig from "../disableByConfig";

const disabledTest = {
  id: "X",
  disabled: true
};

const enabledTest = {
  id: "X",
  disabled: false
};

const disabledTestReason = {
  id: "X",
  disabled: true,
  disabledReason: "usage"
};

describe("disableByConfig", () => {
  it("should return disabled config if disabled and not yet specified reason", () => {
    expect(disableByConfig(["X", disabledTest])).toEqual([
      "X",
      { ...disabledTest, disabledReason: "config" }
    ]);
  });
  it("should let test be if not disabled", () => {
    expect(disableByConfig(["X", enabledTest])).toEqual(["X", enabledTest]);
  });
  it("should let test be if disabled and reason specified", () => {
    expect(disableByConfig(["X", disabledTestReason])).toEqual([
      "X",
      disabledTestReason
    ]);
  });
});
