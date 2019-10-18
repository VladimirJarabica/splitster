import { getTestResult, getSeedNumber } from "../getTestResult";
import { TestConfig } from "../../records/TestConfig";

jest.mock("random-js", () => ({
  __esModule: true,
  // Mock to always return 50
  integer: () => () => 50
}));

jest.mock("seedrandom", () => () => () => 0.5);

const test: TestConfig = {
  id: "testie",
  version: 1,
  description: "",
  usage: null,
  disabled: false,
  userGroup: {},
  userGroupExclude: {},
  variants: {
    A: 1,
    B: 1,
    C: 1
  },
  defaultVariant: "X"
};

describe("get test config", () => {
  describe("set by override", () => {
    it("should return by override without version", () => {
      expect(
        getTestResult({
          testConfig: test,
          userId: "",
          override: { [test.id]: "B" }
        }).value
      ).toBe("B");
    });
    it("should return by override with version", () => {
      expect(
        getTestResult({
          testConfig: test,
          userId: "",
          override: { [`${test.id}_${test.version}`]: "B" }
        }).value
      ).toBe("B");
    });
    it("should return by override with version prio to without version", () => {
      expect(
        getTestResult({
          testConfig: test,
          userId: "",
          override: { [`${test.id}_${test.version}`]: "B", [test.id]: "C" }
        }).value
      ).toBe("B");
    });
  });
  describe("set by disabled", () => {
    const testDisabled = { ...test, disabled: true };
    it("should return disabled by dev", () => {
      expect(getTestResult({ testConfig: testDisabled, userId: "" })).toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "dev"
      });
    });
  });
  describe("set by usage", () => {
    it("should not satisfy the usage", () => {
      expect(
        getTestResult({ testConfig: { ...test, usage: 0 }, userId: "" })
      ).toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "usage"
      });
      expect(
        getTestResult({ testConfig: { ...test, usage: 50 }, userId: "" })
      ).toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "usage"
      });
    });
    it("should satisfy the usage", () => {
      expect(
        getTestResult({ testConfig: { ...test, usage: 51 }, userId: "" })
      ).not.toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "usage"
      });
      expect(
        getTestResult({ testConfig: { ...test, usage: 100 }, userId: "" })
      ).not.toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "usage"
      });
    });
  });

  const userGroups = {
    lang: "en",
    browser: ["chrome", "safari"],
    age: 25,
    iq: [100, 110]
  };
  describe("set by user groups", () => {
    it("should correctly set disabled by user group", () => {
      expect(
        getTestResult({
          testConfig: { ...test, userGroup: userGroups },
          userId: "",
          user: { lang: "en", browser: "chrome", age: 25, iq: 110 }
        })
      ).not.toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "userGroup"
      });
      expect(
        getTestResult({
          testConfig: { ...test, userGroup: userGroups },
          userId: "",
          user: { lang: "cz" }
        })
      ).toEqual({
        value: test.defaultVariant,
        disabled: true,
        disabledReason: "userGroup"
      });
    });
  });
});

it("test seed random", () => {
  expect(getSeedNumber("kek")).toBe(0.5);
});
