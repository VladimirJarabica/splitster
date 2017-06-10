// @flow
import type { Config } from "../types"
import Splitster from "../containers/Splitster"

const splitsterInit = (config: Config, user: Object): Splitster => new Splitster(config, user)

export default splitsterInit