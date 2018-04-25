// @flow
import * as SplitsterFn from '../../containers/Splitster'

import { testsToSaveResults } from '../../tools/testTools'

import type { Config, SaveResults } from '../../types'
import type { Splitster } from '../../containers/Splitster'
import type { Variant, Variants } from '../../containers/Test'

class SplitsterServer {
  state: Splitster

  constructor(config: Config, user: Object, def?: SaveResults) {
    // TODO: def??
    this.state = SplitsterFn.constructSplitster(config, user, def)
  }

  getSaveResults = (): SaveResults => testsToSaveResults(this.state.tests)

  run = (testId: string): void => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      return
    }
    this.state = SplitsterFn.run(this.state, testId)
  }

  runAll = (): void => {
    this.state = SplitsterFn.runAll(this.state)
  }

  get = (testId: string): ?Variant => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      console.warn(
        `Splitster: Trying to access not existing test: ${testId}, your value will be null.`,
      )
      return {
        value: null,
      }
    }
    this.state = SplitsterFn.willGet(this.state, testId)
    return SplitsterFn.get(this.state, testId)
  };

  getAll = (): Variants => {
    this.state = SplitsterFn.willGetAll(this.state)
    return SplitsterFn.getAll(this.state)
  }

  track = (testId: string) => {
    if (!SplitsterFn.hasTest(this.state, testId)) {
      return
    }
    SplitsterFn.track(this.state, testId)
  }

  trackAll = () => {
    SplitsterFn.trackAll(this.state)
  }
}

export default SplitsterServer
