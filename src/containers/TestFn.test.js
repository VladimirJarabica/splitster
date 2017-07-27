// @flow

import R from "ramda"
import {
  constructTest,
  run,
  setAsUsed,
  get,
  willGet,
} from "./TestFn"
import type { Test, TestOptions } from "./TestFn"

const defaultTest: Test = {
  id: "",
  variants: {},
  runTrack: [],
  useTrack: [],
  endTrack: [],
  winningVariant: null,
  defaultVariant: undefined,
  disabled: false,
  used: false,
}

describe("testFn", () => {
  describe("construct test", () => {
    it("should construct test just with id", () => {
      expect(constructTest("abcd", {})).toEqual(R.assoc("id", "abcd", defaultTest))
    })
    it("disabled in options", () => {
      expect(constructTest("abcd", {}, null, {disabled: true}))
        .toEqual(R.merge(defaultTest, {id: "abcd", disabled: true}))
    })
    it("disabled by winning variant", () => {
      expect(constructTest("abcd", {}, null, {winningVariant: "__disabled"}))
        .toEqual(R.merge(defaultTest, {id: "abcd", disabled: true}))
    })
    it("both disabled", () => {
      expect(constructTest("abcd", {}, null, {disabled: true, winningVariant: "__disabled"}))
        .toEqual(R.merge(defaultTest, {id: "abcd", disabled: true}))
    })
    it("disabled but winning variant set", () => {
      expect(constructTest("abcd", {}, null, {disabled: true, winningVariant: "variantId"}))
        .toEqual(R.merge(defaultTest, {id: "abcd", disabled: true}))
    })
    it("should construct test with variants", () => {
      expect(constructTest("abcd", {variants: {a: 1, b: 2}}))
        .toEqual(R.merge(
          defaultTest,
          {
            id: "abcd",
            variants: {"a": {"id": "a", "ratio": 1, "value": "a"}, "b": {"id": "b", "ratio": 2, "value": "b"}}
          },
        ))
    })
  })

  describe("run test", () => {
    let counter = 0
    const increaseCounter = () => { counter++ }
    const runTest = constructTest("", {variants: {a: 1}, runTrack: increaseCounter})
    const variant = {id: "a", ratio: 1, value: "a"}

    it("run first and second time", () => {
      expect(run(runTest)).toEqual(R.assoc("winningVariant", variant, runTest))
      expect(counter).toBe(1)
      expect(run(run(runTest))).toEqual(R.assoc("winningVariant", variant, runTest))
      expect(counter).toBe(3)
    })
    it("run with winning variant set", () => {
      const variantSet = R.assoc("winningVariant", "set", runTest)
      expect(run(variantSet)).toEqual(variantSet)
    })
    it("run disabled test", () => {
      const disabledTest = R.merge(runTest, {disabled: true, defaultVariant: "def"})
      expect(run(disabledTest)).toEqual(R.assoc("winningVariant", "def", disabledTest))
    })
  })

  describe("set as used", () => {
    it("should set as used", () => {
      expect(setAsUsed(defaultTest)).toEqual(R.assoc("used", true, defaultTest))
    })
    it("should set as used multiple times", () => {
      expect(setAsUsed(setAsUsed(defaultTest))).toEqual(R.assoc("used", true, defaultTest))
    })
  })

  describe("get and will get", () => {
    let counter = 0
    const increaseCounter = () => { counter++ }
    const getTest = constructTest("", {variants: {a: 1, b: 2}, useTrack: increaseCounter, defaultVariant: "a"})
    const usedGetTest = R.assoc("used", true, getTest)
    const variantA = {id: "a", ratio: 1, value: "a"}
    const variantB = {id: "b", ratio: 2, value: "b"}

    it("will get once", () => {
      expect(willGet(getTest)).toEqual(usedGetTest)
      expect(counter).toBe(1)
    })
    it("will get multiple times", () => {
      // useTrack should be called just once
      expect(willGet(willGet(getTest))).toEqual(usedGetTest)
      expect(counter).toBe(2)
    })

    it("get - winning variant not set", () => {
      expect(get(getTest)).toEqual(variantA)
    })
    it("get - winning variant set", () => {
      const winnerSet = R.assoc("winningVariant", variantB, getTest)
      expect(get(winnerSet)).toEqual(variantB)
    })
  })
})