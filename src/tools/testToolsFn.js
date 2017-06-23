// @flow
import R from "ramda"
import Random from "random-js"

import type {
  VariantConfig,
  VariantsConfig,
  TestTrackConfig,
  TestTracksConfig,
  TrackConfig,
  TracksConfig,
  Result,
} from "../types"
import type {
  Variant,
  Variants,
} from "../containers/TestFn"

export const getVariant = (variantId: string, variants: VariantsConfig): Variant =>
  R.assoc("id", variantId, variants[variantId])

export const getVariants = (variants: VariantsConfig): Variants =>
  R.reduce(
    (acc, key) =>
      R.assoc(key, getVariant(key, variants), acc),
    {},
    R.keys(variants),
  )

// TODO: write tests
export const getDefaultVariant = (variants: Variants, defaultVariant: string): Variant =>
  variants[defaultVariant] || R.find(R.propEq("def", true), R.values(variants))

// TODO: write tests
export const getTrack = (testTrack: ?TestTrackConfig, tracks: ?TracksConfig = {}): ?TrackConfig => {
  if (testTrack && tracks) {
    if (typeof testTrack === "string") {
      return tracks[testTrack]
    }
    return testTrack
  }
  return null
}

// TODO: write tests
export const getTracks = (testTracks: ?TestTracksConfig, tracks: ?TracksConfig = {}): Array<TrackConfig> => {
  if (Array.isArray(testTracks)) {
    return R.filter(Boolean, R.map(R.partialRight(getTrack, [tracks]), testTracks))
  }
  if (Boolean(testTracks)) {
    return R.filter(Boolean, R.map(R.partialRight(getTrack, [tracks]), [getTrack(testTracks, tracks)]))
  }
  return []
}

// TODO: type test result
export const runTracks = (tracks: Array<TrackConfig>, result: Result): void =>
  R.forEach(
    (track: TrackConfig) => {
      track(result)
    },
    tracks
  )

// TODO: write tests ?? random
export const getWinningVariant = (variants: Array<VariantConfig>, defaultVariant: VariantConfig): VariantConfig => {
  const ratioSum = R.sum(R.map((variant: VariantConfig) => variant.ratio, variants))

  let rand = Random.integer(1, ratioSum)(Random.engines.nativeMath)

  const winningVariant: VariantConfig = R.find((variant: VariantConfig) => {
    rand -= variant.ratio
    return rand <= 0
  }, variants)
  return winningVariant || defaultVariant
}