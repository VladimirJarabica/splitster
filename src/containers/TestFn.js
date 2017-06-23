// @flow
import R from "ramda"

import {
  getVariants,
  getDefaultVariant,
  getTracks,
  runTracks,
  getWinningVariant,
} from "../tools/testToolsFn"

import type {
  VariantConfig,
  VariantsConfig,
  TrackConfig,
  TestConfig,
  TracksConfig,
  Result,
} from "../types"

export type TestOptions = {|
  disabled?: boolean,
  winningVariant?: string,
|}

export type Variant = {|
  id: string,
  def?: boolean,
  value: string,
  ratio: number,
|}

export type Test = {|
  id: string,
  variants: VariantsConfig,
  runTrack: Array<TrackConfig>,
  useTrack: Array<TrackConfig>,
  endTrack: Array<TrackConfig>,

  winningVariant: ?VariantConfig,
  defaultVariant: VariantConfig,
  disabled: boolean,

  used: boolean,
|}

export type Tests = { [string]: Test }
export type Variants = { [string]: Variant }

const defaultTestOptions: TestOptions = {
  disabled: false,
}

export const constructTest = (id: string, config: TestConfig, tracks: ?TracksConfig = {}, options: TestOptions): Test => {
  const {
    disabled,
    winningVariant,
  }: TestOptions = R.merge(defaultTestOptions, options)
  const variants = getVariants(config.variants)
  return {
    id,
    variants: getVariants(variants),
    defaultVariant: getDefaultVariant(variants, config.defaultVariant),
    runTrack: getTracks(config.runTrack, tracks),
    useTrack: getTracks(config.useTrack, tracks),
    endTrack: getTracks(config.endTrack, tracks),
    disabled: disabled || false,
    winningVariant: winningVariant ? variants[winningVariant] : null,
    used: false,
  }
}

export const run = (test: Test): Test => {
  runTracks(test.runTrack)

  if (test.winningVariant) {
    return test
  }

  return R.assoc(
    "winningVariant",
    test.disabled ? test.defaultVariant : getWinningVariant(R.values(test.variants), test.defaultVariant),
    test
  )
}

export const setAsUsed = (test: Test): Test => R.assoc("used", true, test)

export const willGet = (test: Test): Test => {
  if (!test.used) {
    runTracks(test.useTrack)
  }
  return setAsUsed(test)
}

export const get = (test: Test): VariantConfig => test.winningVariant || test.defaultVariant

export const track = (test: Test): void => runTracks(test.endTrack)

// TODO: For now return VariantConfig - specify test result
export const getResult = (test: Test): Result => test.winningVariant

