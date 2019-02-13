import * as R from "ramda";
import jsCookies from "js-cookie";

import SplitsterClient from "../index";
import { getTestsFromConfig } from "../../records/test";

class SplitsterBrowser extends SplitsterClient {
  constructor(...args) {
    super(...args);

    if (!this.options.cookies.disabled && !jsCookies.get("splitster_user_id")) {
      // Save user_id to cookies
      jsCookies.set("splitster_user_id", this.userId);
    }
  }

  set(testId, variantId, cookie = true) {
    console.log("here", testId, variantId, cookie, super.set);
    const result = super.set(testId, variantId, cookie);
    if (cookie) {
      // Dev only for replacing also cookie.
      // You need to handle parsing by yourself in `override` object
      const cookieKey = `splitster_${testId}`;
      jsCookies(cookieKey, variantId);
    }

    return result;
  }
}

export default SplitsterBrowser;
