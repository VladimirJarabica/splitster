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
  TestId,
  TestConfig,
  DisabledReason,
  TracksConfig,
  Result,
} from '../types'

export type TestOptions = {
  winningVariant?: ?string,
}

export type Variant = {|
  id: string,
  value: string,
  ratio: number,
|}

export type Variants = { [string]: Variant }

export type Test = {|
  id: string,
  code: string, // unique code
  variants: Variants,
  runTrack: Array<TrackConfig>,
  useTrack: Array<TrackConfig>,
  endTrack: Array<TrackConfig>,
  usage: number,
  description: ?string,

  winningVariant: ?Variant,
  defaultVariant: Variant,

  disabled: boolean,
  disabledReason: ?DisabledReason,

  used: boolean,
  version: number,
|}

export type Tests = { [TestId]: Test }

const defaultTestOptions: TestOptions = {}

export const constructTest = (
  id: string,
  config: TestConfig,
  tracks: ?TracksConfig = {},
  options: TestOptions,
): Test => {
  const { winningVariant }: TestOptions = R.merge(defaultTestOptions, options)

  const variants: Variants = getVariants(config.variants)

  return {
    id,
    variants,
    runTrack: getTracks(config.runTrack, tracks),
    useTrack: getTracks(config.useTrack, tracks),
    endTrack: getTracks(config.endTrack, tracks),
    usage: R.pathOr(100, 'usage', config),
    description: config.description,

    winningVariant:
      !config.disabled && winningVariant ? variants[winningVariant] : null,
    defaultVariant: getDefaultVariant(variants, config.defaultVariant),

    disabled: config.disabled,
    disabledReason: config.disabledReason,

    used: false,
    version: config.version,
  }
}

export const run = (test: Test): Test => {
  if (!test.disabled) {
    runTracks(test.runTrack, test)
  }

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
  if (test.used) {
    return test
  }

  if (!test.disabled) {
    runTracks(test.useTrack, test)
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

export const track = (test: Test): void => {
  if (!test.disabled) {
    runTracks(test.endTrack, test)
  }
}

// TODO: For now return VariantConfig - specify test result
export const getResult = (test: Test): Result => test
