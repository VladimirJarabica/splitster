import { getWinningVariant } from "../getWinningVariant";
import { TestConfig } from "../../records/TestConfig";

const test: TestConfig = {
  id: "testie",
  version: 1,
  description: "",
  usage: 0,
  disabled: false,
  variants: {
    A: 1,
    B: 1,
    C: 1
  },
  defaultVariant: "X"
};
describe("get winning variant", () => {
  it("seed number in interval should return correct variant", () => {
    expect(getWinningVariant(test, 0)).toBe("A");
    expect(getWinningVariant(test, 0.2)).toBe("A");
    expect(getWinningVariant(test, 1 / 3)).toBe("A");

    expect(getWinningVariant(test, 1 / 3 + 0.001)).toBe("B");
    expect(getWinningVariant(test, 0.5)).toBe("B");
    expect(getWinningVariant(test, 1 / 3 + 1 / 3)).toBe("B");

    expect(getWinningVariant(test, 1 / 3 + 1 / 3 + 0.001)).toBe("C");
    expect(getWinningVariant(test, 1)).toBe("C");
  });
  it("bigger than interval should return default variant", () => {
    expect(getWinningVariant(test, 1.1)).toBe("X");
  });
});
