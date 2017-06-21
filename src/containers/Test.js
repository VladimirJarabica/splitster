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

export type TestOptions = {|
  disabled: ?boolean,
  // alreadySet: ?boolean,
  winningVariant: ?string,
|}

const defaultTestOptions: TestOptions = {
  disabled: false,
  // alreadySet: false,
  winningVariant: null,
}

// TODO: saving to cookies (add to option)
export default class Test {
  variants: { [string]: VariantConfig }
  runTrack: Array<TrackConfig>
  useTrack: Array<TrackConfig>
  endTrack: Array<TrackConfig>
  // If winning variant is set, run() will return it.
  // So if in constructor opts is specified a winning variant id, run will not be triggered
  winningVariant: VariantConfig
  defVariant: VariantConfig
  disabled: boolean
  // Defines whether the test has been used at least once. Will be changed by first calling splitster.get("test_id")
  used: boolean = false
  // Value is set from cookies - there will be no calculations for winning variant
  // alreadySet: boolean = false

  constructor(config: TestConfig, tracks: TestTracksConfig, opts: TestOptions) {
    const {
      disabled,
      // alreadySet,
      winningVariant,
    }: TestOptions = Object.assign({}, defaultTestOptions, opts)
    this.variants = config.variants
    this.defVariant = R.find(R.propEq("def", true), R.values(this.variants))
    this.runTrack = reduceTracks(config.runTrack, tracks)
    this.useTrack = reduceTracks(config.useTrack, tracks)
    this.endTrack = reduceTracks(config.endTrack, tracks)
    this.disabled = disabled
    if (winningVariant) {
      this.winningVariant = this.variants[winningVariant]
    }
    // this.alreadySet = alreadySet
  }

  run = (): void => {
    // TODO: apply usage

    if (!this.winningVariant) {
      this.winningVariant = this.disabled
        ? this.defVariant
        : getWinningVariant(R.values(this.variants), this.defVariant)
    }

    this.runTracksArray(this.runTrack)


    // if (this.disabled) {
    //   this.winningVariant = this.defVariant
    // } else {
    //   // Save to cookies - need some wrapper to client vs server splitster
    //
    //   this.runTracksArray(this.runTrack)
    //
    //   // TODO: test get winning variant
    //   this.winningVariant = getWinningVariant(R.values(this.variants), this.defVariant)
    // }
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