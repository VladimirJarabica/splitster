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
} from "../types"

export const getDefaultVariant = (variants: VariantsConfig, defaultVariant: string): VariantConfig =>
  variants[defaultVariant] || R.find(R.propEq("def", true), R.values(variants))

export const getTrack = (testTrack: TestTrackConfig, tracks: TracksConfig): TrackConfig =>
  typeof testTrack === "string"
    ? tracks[testTrack]
    : testTrack

export const getTracks = (testTracks: TestTracksConfig, tracks: TracksConfig): Array<TrackConfig> =>
  Array.isArray(testTracks)
    ? R.map(R.partialRight(getTrack, [tracks]), testTracks)
    : [getTrack(testTracks, tracks)]

// TODO: type test result
export const runTracks = (tracks: Array<TrackConfig>, result): void =>
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
  console.log("winningVariant", winningVariant)
  return winningVariant || defaultVariant
}