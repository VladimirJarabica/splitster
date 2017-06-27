// @flow
import SplitsterClient from "./SplitsterClient"

import type {
  Config,
  SaveResults,
} from "../../types"

const splitsterInit = (config: Config, user?: ?Object, def?: SaveResults) =>
  new SplitsterClient(config, user, def)

export default splitsterInit
