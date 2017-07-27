// @flow
import {
  createTestsOpts,
  getSeparateTests,
  getTestsFromConfig,
} from "./splitsterToolsFn"
import type {
  TestsConfig,
} from "../types"

const testsConfig: TestsConfig = {
  "test_a": {
    defaultVariant: "a",
    variants: {
      a: 1,
      b: 2,
    },
  },
  "test_x": {
    defaultVariant: "x",
    variants: {
      x: 2,
      y: 1,
    },
  },
}

describe("splitsterToolsFn tests", () => {
  describe("test options", () => {
    it("without any params", () => {
      expect(createTestsOpts()).toEqual({disabled: false, winningVariant: null})
    })
    it("disabled no def", () => {
      expect(createTestsOpts(null, true)).toEqual({disabled: true, winningVariant: "__disabled"})
    })
    it("disabled with def", () => {
      expect(createTestsOpts(null, true)).toEqual({disabled: true, winningVariant: "__disabled"})
    })
    it("default value", () => {
      expect(createTestsOpts("defValue")).toEqual({disabled: false, winningVariant: "defValue"})
    })
  })

  describe("separate tests", () => {
    it("with runTest only", () => {
      expect(getSeparateTests(testsConfig, {})).toEqual({})
    })
  })

  describe("test from config", () => {
    describe("normal tests", () => {
    })
  })
})