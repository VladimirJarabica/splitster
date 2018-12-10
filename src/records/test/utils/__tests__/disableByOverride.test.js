import * as R from 'ramda';
import disableByOverride from '../disableByOverride';

import { REASONS } from '../checkDisabled';

const override = R.fromPairs(
  REASONS.map((reason, index) => [`TEST_${index}`, `__disabled_${reason}`]),
);

describe('disableByOverride', () => {
  it('should leave test be if already disabled', () => {
    expect(
      disableByOverride(override)(['TEST_0', { disabled: true }]),
    ).toEqual(['TEST_0', { disabled: true }]);
  });
  REASONS.forEach((reason, index) => {
    it(`should correctly check disabled from override: ${reason}`, () => {
      expect(disableByOverride(override)([`TEST_${index}`, {}])).toEqual([
        `TEST_${index}`,
        { disabled: true, disabledReason: reason },
      ]);
    });
  });
});
