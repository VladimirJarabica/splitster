// @flow
import R from "ramda"

import {
  getWinningVariant,
  reduceTracks,
} from "../tools/testTools"

import type {
  TestConfig,
  VariantConfig,
  TrackConfig,
  TestTracksConfig,
} from "../types"

// TODO: saving to cookies (add to option)
export default class Test {
  variants: { [string]: VariantConfig }
  runTrack: Array<TrackConfig>
  useTrack: Array<TrackConfig>
  endTrack: Array<TrackConfig>
  winningVariant: VariantConfig
  defVariant: VariantConfig
  disabled: boolean
  used: boolean = false

  constructor(config: TestConfig, tracks: TestTracksConfig, disabled: ?boolean = false) {
    this.variants = config.variants
    this.defVariant = R.find(R.propEq("def", true), R.values(this.variants))
    this.runTrack = reduceTracks(config.runTrack, tracks)
    this.useTrack = reduceTracks(config.useTrack, tracks)
    this.endTrack = reduceTracks(config.endTrack, tracks)
    this.disabled = disabled
  }

  run = (): void => {
    // TODO: apply usage
    if (this.disabled) {
      this.winningVariant = this.defVariant
    } else {
      // Save to cookies - need some wrapper to client vs server splitster

      this.runTracksArray(this.runTrack)

      // TODO: test get winning variant
      this.winningVariant = getWinningVariant(R.values(this.variants), this.defVariant)
    }
  }

  get = (): VariantConfig => {
    // TODO: track get
    if (!this.used) {
      this.runTracksArray(this.useTrack)
      this.used = true
    }
    return this.winningVariant
  }

  track = (): void => {
    // TODO: track success
    this.runTracksArray(this.endTrack)
  }

  // TODO: specify test result - for now returns just winning variant
  getResult = () => this.winningVariant

  runTracksArray = (tracks: Array<TrackConfig>) => {
    const result = this.getResult()
    R.forEach(
      (track: TrackConfig) => {
        track(result)
      },
      tracks
    )
  }
}