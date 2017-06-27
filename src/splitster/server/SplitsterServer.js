// @flow
import * as SplitsterFn from "../../containers/SplitsterFn"

import {
  testsToSaveResults,
} from "../../tools/testToolsFn"

import type {
  Config,
  VariantConfig,
  SaveResults,
} from "../../types"
import type {
  Splitster,
} from "../../containers/SplitsterFn"
import type {
  Variants,
} from "../../containers/TestFn"

class SplitsterServer {
  state: Splitster

  constructor(config: Config, user: Object) {
    // TODO: def??
    this.state = SplitsterFn.constructSplitster(config, user)
  }

  getSaveResults = (): SaveResults =>
    testsToSaveResults(this.state.tests)

  run = (testId: string): void => {
    this.state = SplitsterFn.run(this.state, testId)
  }

  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)
  }

  get = (testId: string): VariantConfig => {
    this.state = SplitsterFn.willGet(this.state, testId)
    return SplitsterFn.get(this.state, testId)
  }

  getAll = (): Variants => {
    this.state = SplitsterFn.willGetAll(this.state)
    return SplitsterFn.getAll(this.state)
  }

  track = (testId: string) => {
    SplitsterFn.track(this.state, testId)
  }

  trackAll = () => {
    SplitsterFn.trackAll(this.state)
  }
}

export default SplitsterServer