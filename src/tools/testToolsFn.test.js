// @flow
import {
  getVariant,
  getVariants,
  getDefaultVariant,
  getTrack,
  getTracks,
  testToSaveResults,
  testsToSaveResults,
} from "./testToolsFn"

describe("testToolsFn tests", () => {
  const variantsConfig = {
    "VAR_1": 3,
    "VAR_2": {value: "VAR_2", ratio: 2, def: true},
    "VAR_3": {value: "VAR_3", ratio: 3},
  }
  const variants = {
    "VAR_1": {id: "VAR_1", value: "VAR_1", ratio: 3},
    "VAR_2": {id: "VAR_2", value: "VAR_2", ratio: 2, def: true},
    "VAR_3": {id: "VAR_3", value: "VAR_3", ratio: 3},
  }

  const tracksConfig = {
    "ONE": () => "ONE",
    "TWO": () => "TWO",
    "THREE": () => "THREE",
  }
  describe("get variants", () => {
    it("single variant", () => {
      expect(getVariant("VAR_1", variantsConfig)).toEqual(variants["VAR_1"])
      expect(getVariant("VAR_2", variantsConfig)).toEqual(variants["VAR_2"])
      expect(getVariant("VAR_3", variantsConfig)).toEqual(variants["VAR_3"])
    })
    it("all variants", () => {
      expect(getVariants(variantsConfig)).toEqual(variants)
    })
    it("get default variant by id", () => {
      expect(getDefaultVariant(variants, "VAR_1")).toEqual(variants["VAR_1"])
      expect(getDefaultVariant(variants, "VAR_3")).toEqual(variants["VAR_3"])
    })
    it("get default variant by def", () => {
      expect(getDefaultVariant(variants)).toEqual(variants["VAR_2"])
      expect(getDefaultVariant(variants, "BAD_ID")).toEqual(variants["VAR_2"])
    })
  })

  describe("get tracks", () => {
    it("single track", () => {
      expect(getTrack("ONE", tracksConfig)()).toEqual("ONE")
      expect(getTrack(() => "ONE")()).toEqual("ONE")
    })
    it("multiple tracks", () => {
      expect(getTracks(["ONE", "TWO"], tracksConfig).map(fn => fn())).toEqual(["ONE", "TWO"])
      expect(getTracks(["TWO", "ONE", () => "THREE"], tracksConfig).map(fn => fn())).toEqual(["TWO", "ONE", "THREE"])
    })
  })


  describe("tests to save results", () => {
    it("single test", () => {
      // TODO: finish
    })
  })
})