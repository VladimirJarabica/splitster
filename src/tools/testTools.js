// @flow
import R from "ramda"
import Random from "random-js"

import type {
  VariantConfig,
  TrackConfig,
  TracksConfig,
  TestTrackConfig,
  TestTracksConfig,
} from "../types"

export const getWinningVariant = (variants: Array<VariantConfig>, defVariant: VariantConfig): VariantConfig => {
  const ratioSum = R.sum(R.map((variant: VariantConfig) => variant.ratio, variants))

  let rand = Random.integer(0, ratioSum)(Random.engines.nativeMath)

  const winningVariant: VariantConfig = R.find((variant: VariantConfig) => {
    rand -= variant.ratio
    return rand < 0
  }, variants)

  return winningVariant || defVariant
}

const reduceTrack = (configTrack: TestTrackConfig, tracks: TrackConfig): TrackConfig => {
  return typeof configTrack === "string" ? tracks[configTrack] : configTrack
}
export const reduceTracks = (configTracks: TestTracksConfig, tracks: TracksConfig): TrackConfig => {
  return Array.isArray(configTracks)
    ? R.map(R.partialRight(reduceTrack, [tracks]), configTracks)
    : [reduceTrack(configTracks, tracks)]
}