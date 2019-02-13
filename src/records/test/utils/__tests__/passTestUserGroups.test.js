import * as R from "ramda";

import passTestUserGroups, { getUserGroupRule } from "../passTestUserGroups";

const tautology = jest.fn(() => true);

const contradiction = jest.fn(arg => false);

const groupConfig = {
  lang: ["en", "us", "sk"],
  browser: "chrome"
};
const groupConfigWithTautology = {
  ...groupConfig,
  tautology
};
const groupConfigWithContradiction = {
  ...groupConfig,
  contradiction
};

describe("passTestUserGroups", () => {
  describe("getUserGroupRule", () => {
    it("should return arg if already function", () => {
      expect(getUserGroupRule(tautology)).toBe(tautology);
    });

    it("should return true for tautology subconfig", () => {
      const rule = getUserGroupRule(
        R.pick(["tautology"], groupConfigWithTautology)
      );
      expect(rule({})).toBe(true);
    });
    it("should return false for contradiction subconfig", () => {
      const rule = getUserGroupRule(
        R.pick(["contradiction"], groupConfigWithContradiction)
      );
      expect(rule({})).toBe(false);
    });

    it("should return correct rule for array config", () => {
      const rule = getUserGroupRule(R.pick(["lang"], groupConfig));
      expect(rule({ lang: "en" })).toBe(true);
      expect(rule({ lang: "cz" })).toBe(false);
    });
    it("should return correct rule for simple config", () => {
      const rule = getUserGroupRule(R.pick(["browser"], groupConfig));
      expect(rule({ browser: "chrome" })).toBe(true);
      expect(rule({ browser: "safari" })).toBe(false);
    });
    it("should get correct rules for multi config", () => {
      const rule = getUserGroupRule(groupConfig);
      expect(rule({ lang: "en", browser: "chrome" })).toBe(true);
      expect(rule({ lang: "cz", browser: "chrome" })).toBe(false);
      expect(rule({ lang: "en", browser: "safari" })).toBe(false);
      expect(rule({ lang: "cz", browser: "safari" })).toBe(false);
    });
    it("should get correct rules for multi config exclude", () => {
      const rule = getUserGroupRule(groupConfig, true);
      expect(rule({ lang: "en", browser: "chrome" })).toBe(true);
      expect(rule({ lang: "cz", browser: "chrome" })).toBe(true);
      expect(rule({ lang: "en", browser: "safari" })).toBe(true);
      expect(rule({ lang: "cz", browser: "safari" })).toBe(false);
    });
  });
  describe("passTestUserGroups", () => {
    it("should create user group config and check user agains it", () => {
      expect(
        passTestUserGroups(groupConfig, { lang: "en", browser: "chrome" })
      ).toBe(true);
      expect(
        passTestUserGroups(groupConfig, { lang: "cz", browser: "chrome" })
      ).toBe(false);
      expect(
        passTestUserGroups(groupConfig, { lang: "en", browser: "safari" })
      ).toBe(false);
      expect(
        passTestUserGroups(groupConfig, { lang: "cz", browser: "safari" })
      ).toBe(false);
    });
    it("should create user group config and check user agains it - exclude", () => {
      expect(
        passTestUserGroups(groupConfig, { lang: "en", browser: "chrome" }, true)
      ).toBe(true);
      expect(
        passTestUserGroups(groupConfig, { lang: "cz", browser: "chrome" }, true)
      ).toBe(true);
      expect(
        passTestUserGroups(groupConfig, { lang: "en", browser: "safari" }, true)
      ).toBe(true);
      expect(
        passTestUserGroups(groupConfig, { lang: "cz", browser: "safari" }, true)
      ).toBe(false);
    });

    it("should pass tautology config", () => {
      expect(
        passTestUserGroups(tautology, {
          lang: "en",
          browser: "chrome"
        })
      ).toBe(true);
    });
    it("should not pass contradiction config", () => {
      expect(
        passTestUserGroups(contradiction, {
          lang: "en",
          browser: "chrome"
        })
      ).toBe(false);
    });

    it("should pass tautology subconfig", () => {
      expect(
        passTestUserGroups(groupConfigWithTautology, {
          lang: "en",
          browser: "chrome"
        })
      ).toBe(true);
    });
    it("should not pass contradiction subconfig", () => {
      expect(
        passTestUserGroups(groupConfigWithContradiction, {
          lang: "en",
          browser: "chrome"
        })
      ).toBe(false);
    });
  });
});
