// @flow
import SplitsterClient from "./SplitsterClient"

import { mergeDefaultConfig } from "../../tools/splitsterToolsFn"

import type {
  Config,
  SaveResults,
} from "../../types"

const splitsterInit = (config: Config, user?: ?Object, def?: SaveResults) =>
  new SplitsterClient(mergeDefaultConfig(config), user, def)

export default splitsterInit
