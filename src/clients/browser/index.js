import SplitsterBrowser from './SplitsterBrowser';

import { mergeDefaultConfig } from '../../records/config';

const init = (config, user, userId, override) => {
  const validConfig = mergeDefaultConfig(config);
  // TODO: in createValidConfig each test must me merged with test default config
  // also options should be merged
  return new SplitsterBrowser({ config: validConfig, user, userId, override });
};

export default init;
