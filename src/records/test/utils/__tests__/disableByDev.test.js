import disableByDev from "../disableByDev";

const override = {
  TEST_1: "__disabled_dev",
  TEST_2: "abc"
};

const disabledDevTest = {
  disabled: true,
  disabledReason: "dev"
};

describe("disableByDev", () => {
  it("should disable by dev if specified in override", () => {
    expect(disableByDev(override)(["TEST_1", {}])).toEqual([
      "TEST_1",
      disabledDevTest
    ]);
  });
  it("should not change test if not disabled by dev", () => {
    expect(disableByDev(override)(["TEST_2", {}])).toEqual(["TEST_2", {}]);
  });
  it("should not change test if not specified in override", () => {
    expect(disableByDev(override)(["TEST_3", {}])).toEqual(["TEST_3", {}]);
  });
});
