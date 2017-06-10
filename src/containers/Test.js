// @flow
import R from "ramda"

import type {
  TestConfig,
  VariantConfig,
  TrackConfig,
} from "../types"

export default class Test {
  variants: { [string]: VariantConfig }
  winningVariant: VariantConfig
  disabled: boolean

  constructor(config: TestConfig, tracks: { [string]: TrackConfig }, disabled: ?boolean = false) {
    console.log("test constructor", config)
    this.variants = config.variants
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