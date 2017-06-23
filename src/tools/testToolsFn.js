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

export const getDefaultVariant = (variants: VariantsConfig, defaultVariant: string): VariantConfig =>
  variants[defaultVariant] || R.find(R.propEq("def", true), R.values(variants))

export const getTrack = (testTrack: ?TestTrackConfig, tracks: ?TracksConfig = {}): ?TrackConfig => {
  if (testTrack && tracks) {
    if (typeof testTrack === "string") {
      return tracks[testTrack]
    }
    return testTrack
  }
  return null
}

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

export const getWinningVariant = (variants: Array<VariantConfig>, defaultVariant: VariantConfig): VariantConfig => {
  const ratioSum = R.sum(R.map((variant: VariantConfig) => variant.ratio, variants))

  let rand = Random.integer(1, ratioSum)(Random.engines.nativeMath)

  const winningVariant: VariantConfig = R.find((variant: VariantConfig) => {
    rand -= variant.ratio
    return rand <= 0
  }, variants)
  return winningVariant || defaultVariant
}