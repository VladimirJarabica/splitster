import * as R from 'ramda';

const REASONS = [
  'usage',
  'separate_test',
  'user_group',
  'user_group_exclude',
  'deadline',
  'dev',
];

const DISABLED_REGEX = /^(__disabled_)(\w+)$/;

const checkDisabled = override => {
  if (!override) {
    return {
      disabled: false,
      disabledReason: null,
    };
  }
  const [_, disabled, reason] = R.match(DISABLED_REGEX, override);

  if (Boolean(disabled) && R.contains(reason, REASONS)) {
    return {
      disabled: true,
      // TODO: temporary fix, remove 'null'
      disabledReason: reason === 'null' ? 'config' : reason,
    };
  }
  return {
    disabled: false,
    disabledReason: null,
  };
};

export default checkDisabled;
