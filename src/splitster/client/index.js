// @flow
import SplitsterClient from "./SplitsterClient"

import type {
  Config,
} from "../../types"

const splitsterInit = (config: Config, user: Object) => new SplitsterClient(config, user)

export default splitsterInit
