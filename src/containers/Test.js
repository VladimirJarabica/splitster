// @flow
import R from "ramda"

import type {
  TestConfig,
  VariantConfig,
  TrackConfig,
  TracksConfig,
  TestTrackConfig,
  TestTracksConfig,
} from "../types"


const reduceTrack = (configTrack: TestTrackConfig, tracks: TrackConfig): TrackConfig => {
  return typeof configTrack === "string" ? tracks[configTrack] : configTrack
}
const reduceTracks = (configTracks: TestTracksConfig, tracks: TracksConfig): TrackConfig => {
  return Array.isArray(configTracks)
    ? R.map(R.partialRight(reduceTrack, [tracks]), configTracks)
    : [reduceTrack(configTracks, tracks)]
}

export default class Test {
  variants: { [string]: VariantConfig }
  runTrack: TracksConfig
  useTrack: TracksConfig
  endTrack: TracksConfig
  winningVariant: VariantConfig
  disabled: boolean

  constructor(config: TestConfig, tracks: TestTracksConfig, disabled: ?boolean = false) {
    this.variants = config.variants
    this.runTrack = reduceTracks(config.runTrack, tracks)
    this.useTrack = reduceTracks(config.useTrack, tracks)
    this.endTrack = reduceTracks(config.endTrack, tracks)
    this.disabled = disabled
  }

  run = (): void => {
    // TODO: track run
    // Randomly get winning variant by ratio
    if (this.disabled) {
      this.winningVariant = R.find(R.propEq("def", true), R.values(this.variants))
    } else {
      // TODO: get winning variant
      this.winningVariant = R.find(R.propEq("def", true), R.values(this.variants))
    }
  }

  get = (): VariantConfig => {
    // TODO: track get
    return this.winningVariant
  }

  track = (): void => {
    // TODO: track success
    console.log("track")
  }
}