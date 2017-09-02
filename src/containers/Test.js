// @flow
import R from 'ramda'

import {
  getVariants,
  getDefaultVariant,
  getTracks,
  runTracks,
  getWinningVariant,
} from '../tools/testTools'

import type {
  TrackConfig,
  TestConfig,
  TracksConfig,
  Result,
} from '../types'

export type TestOptions = {|
  winningVariant?: string,
|}

export type Variant = {|
  id: string,
  def?: boolean,
  value: string,
  ratio: number,
|}

export type Variants = { [string]: Variant }

export type Test = {|
  id: string,
  variants: Variants,
  runTrack: Array<TrackConfig>,
  useTrack: Array<TrackConfig>,
  endTrack: Array<TrackConfig>,

  winningVariant: ?Variant,
  defaultVariant: Variant,
  disabled: boolean,

  used: boolean,
|}

export type Tests = { [string]: Test }

const defaultTestOptions: TestOptions = {}

export const constructTest = (
  id: string,
  config: TestConfig,
  tracks: ?TracksConfig = {},
  options: TestOptions,
): Test => {
  const { winningVariant }: TestOptions = R.merge(defaultTestOptions, options)
  const variants = getVariants(config.variants)
  const isDisabled = config.disabled || false

  const winningVariantSet = Boolean(!isDisabled && winningVariant)

  return {
    id,
    variants,
    defaultVariant: getDefaultVariant(variants, config.defaultVariant),
    runTrack: getTracks(config.runTrack, tracks),
    useTrack: getTracks(config.useTrack, tracks),
    endTrack: getTracks(config.endTrack, tracks),
    disabled: isDisabled,
    // TODO: maybe create function for this long check
    winningVariant:
      winningVariantSet && winningVariant ? variants[winningVariant] : null,
    used: winningVariantSet,
  }
}

export const run = (test: Test): Test => {
  runTracks(test.runTrack)

  if (test.winningVariant) {
    return test
  }

  return R.assoc(
    'winningVariant',
    test.disabled
      ? test.defaultVariant
      : getWinningVariant(R.values(test.variants), test.defaultVariant),
    test,
  )
}

export const setAsUsed = (test: Test): Test => R.assoc('used', true, test)

export const willGet = (test: Test): Test => {
  if (!test.used) {
    runTracks(test.useTrack)
  }
  return setAsUsed(test)
}

export const get = (test: Test): Variant =>
  test.winningVariant || test.defaultVariant

export const set = (test: Test, variantId: string): Test =>
  R.assoc(
    'winningVariant',
    R.pathOr(test.winningVariant, ['variants', variantId], test),
    test,
  )

export const track = (test: Test): void => runTracks(test.endTrack)

// TODO: For now return VariantConfig - specify test result
export const getResult = (test: Test): Result => test.winningVariant
