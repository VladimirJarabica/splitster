// @flow
import SplitsterServer from "./SplitsterServer"

import type {
  Config,
} from "../../types"

const splitsterInit = (config: Config, user: Object) => new SplitsterServer(config, user)

export default splitsterInit
