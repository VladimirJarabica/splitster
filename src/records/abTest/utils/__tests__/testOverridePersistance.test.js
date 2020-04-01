import testOverridePersistance from "../testOverridePersistance";

const override = {
  TEST_1: "setProperly",
  TEST_2: "__disabled_config",
  TEST_3: "__disabled_null"
};

describe("#testOverridePersistance", () => {
  it("should check properly set", () => {
    expect(testOverridePersistance("TEST_1", override)).toBe(true);
  });
  it("should check unset", () => {
    expect(testOverridePersistance("TEST_XY", override)).toBe(false);
  });
  it("should check disabled config", () => {
    expect(testOverridePersistance("TEST_2", override)).toBe(false);
  });
  it("should check disabled null", () => {
    expect(testOverridePersistance("TEST_3", override)).toBe(false);
  });
});
