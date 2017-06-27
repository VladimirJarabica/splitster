// @flow
import SplitsterServer from "./SplitsterServer"

import type {
  Config,
  SaveResults,
} from "../../types"

const splitsterInit = (config: Config, user: Object, def?: SaveResults) =>
  new SplitsterServer(config, user, def)

export default splitsterInit
