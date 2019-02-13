import SplitsterServer from "./SplitsterServer";

import { mergeDefaultConfig } from "../../records/config";

const init = (config, user, userId, override) => {
  const validConfig = mergeDefaultConfig(config);
  // TODO: in createValidConfig each test must me merged with test default config
  // also options should be merged
  return new SplitsterServer({ config: validConfig, user, userId, override });
};

export default init;
