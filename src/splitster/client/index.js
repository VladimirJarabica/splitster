// @flow
import type { Config } from "../../types/index"
import Splitster from "../../containers/Splitster"
import { parseCookies } from "../../tools/cookiesTools"

const splitsterInit = (config: Config, user: Object): Splitster => {
  const def = parseCookies()

  console.log("def", def)
  return new Splitster(config, user, def)
}

export default splitsterInit