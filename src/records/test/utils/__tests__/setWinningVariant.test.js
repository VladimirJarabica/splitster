import * as R from "ramda";

import setWinningVariant, { getWinningVariant } from "../setWinningVariant";

describe("setWinningVariant", () => {
  describe("getWinningVariant", () => {
    const variants = R.toPairs({
      x: { ratio: 1 },
      y: { ratio: 3 },
      z: { ratio: 6 }
    });
    it("should get correct winning variant", () => {
      expect(getWinningVariant(variants, "x", 0)).toEqual("x");
      expect(getWinningVariant(variants, "x", 0.1)).toEqual("x");
      expect(getWinningVariant(variants, "x", 0.2)).toEqual("y");
      expect(getWinningVariant(variants, "x", 0.3)).toEqual("y");
      expect(getWinningVariant(variants, "x", 0.5)).toEqual("z");
    });
    it("should return default variant if number exceeds", () => {
      expect(getWinningVariant(variants, "x", 1.1)).toEqual("x");
    });
  });
  describe("setWinningVariant", () => {
    it("should set default if test is disabled", () => {
      expect(
        setWinningVariant("")(["x", { defaultVariant: "x", disabled: true }])
      ).toEqual([
        "x",
        { defaultVariant: "x", winningVariant: "x", disabled: true }
      ]);
    });
    const test = {
      variants: {
        x: { ratio: 1 },
        y: { ratio: 3 },
        z: { ratio: 6 }
      },
      defaultVariant: "x"
    };
    it("should set correct winning variant", () => {
      expect(setWinningVariant("", 0)(["x", test])).toEqual([
        "x",
        { ...test, winningVariant: "x" }
      ]);
      expect(setWinningVariant("", 0.1)(["x", test])).toEqual([
        "x",
        { ...test, winningVariant: "x" }
      ]);
      expect(setWinningVariant("", 0.2)(["x", test])).toEqual([
        "x",
        { ...test, winningVariant: "y" }
      ]);
      expect(setWinningVariant("", 0.3)(["x", test])).toEqual([
        "x",
        { ...test, winningVariant: "y" }
      ]);
      expect(setWinningVariant("", 0.5)(["x", test])).toEqual([
        "x",
        { ...test, winningVariant: "z" }
      ]);
    });
    it("should set default winning variant", () => {
      expect(setWinningVariant("", 1.1)(["x", test])).toEqual([
        "x",
        { ...test, winningVariant: "x" }
      ]);
    });
  });
});
