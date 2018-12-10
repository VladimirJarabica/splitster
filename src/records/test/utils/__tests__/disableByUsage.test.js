import disableByUsage from '../disableByUsage';

const override = {
  TEST_1: '__disabled_dev',
};

describe('disableByUsage', () => {
  it('should not touch if already disabled', () => {
    expect(disableByUsage(override)(['TEST_1', { disabled: true }])).toEqual([
      'TEST_1',
      { disabled: true },
    ]);
  });
  it('should not touch if override correctly set', () => {
    expect(disableByUsage(override)(['TEST_1', {}])).toEqual(['TEST_1', {}]);
  });
  it('should not touch if usage not specified', () => {
    expect(disableByUsage(override)(['TEST_XY', {}])).toEqual(['TEST_XY', {}]);
  });
  it('should disable by usage if random if bigger than test usage', () => {
    expect(disableByUsage({}, 50)(['TEST_1', { usage: 70 }])).toEqual([
      'TEST_1',
      { usage: 70 },
    ]);
    expect(disableByUsage({}, 50)(['TEST_1', { usage: 40 }])).toEqual([
      'TEST_1',
      { usage: 40, disabled: true, disabledReason: 'usage' },
    ]);
    expect(disableByUsage({}, 50)(['TEST_1', { usage: 50 }])).toEqual([
      'TEST_1',
      { usage: 50, disabled: true, disabledReason: 'usage' },
    ]);
  });
});
