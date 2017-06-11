// @flow
import Cookies from "js-cookie"
import R from "ramda"

import type { Config } from "../../types/index"
import Splitster from "../../containers/Splitster"

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @returns {*}
 */
const parseCookies = (prefix: string = "splitster"): { [string]: Object } => {
  const cookies = Cookies.get()
  return R.reduce(
    (acc, key) => R.assoc(R.slice(prefix.length + 1, key.length, key), cookies[key], acc),
    {},
    R.filter(R.startsWith(`${prefix}_`), R.keys(cookies))
  )
}

const splitsterInit = (config: Config, user: Object): Splitster => {
  const def = parseCookies()

  console.log("def", def)
  return new Splitster(config, user, def)
}

export default splitsterInit