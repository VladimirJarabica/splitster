import checkDisabled, { REASONS } from "../checkDisabled";

const enabled = {
  disabled: false,
  disabledReason: null
};

describe("checkDisabled", () => {
  it("should return enabled for empty override", () => {
    expect(checkDisabled(null)).toEqual(enabled);
  });
  it("should return enabled for not disabled test", () => {
    expect(checkDisabled("completely_fine")).toEqual(enabled);
  });
  REASONS.forEach(reason => {
    it(`should return disabled with proper reason: ${reason}`, () => {
      expect(checkDisabled(`__disabled_${reason}`)).toEqual({
        disabled: true,
        disabledReason: reason
      });
    });
  });

  // Edge case hack for backward compatibily
  it("should return config if reason is set as null", () => {
    expect(checkDisabled("__disabled_null")).toEqual({
      disabled: true,
      disabledReason: "config"
    });
  });
});
