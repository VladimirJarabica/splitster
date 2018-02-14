import { mergeDefaultTests } from './testsTools'
import disableByUsage from './disableByUsage'
import { mapDisabledProp, mapDisabledReasonProp } from './testsTools.test'

describe('#disableByUsage', () => {
  it('should disable by specified usage', () => {
    const testWithUsage = mergeDefaultTests({
      one: { usage: 10, disabled: false },
      three: { usage: 50, disabled: false },
      four: { usage: 100, disabled: false },
    })
    expect(mapDisabledProp(disableByUsage()(testWithUsage, 10))).toEqual([
      true,
      false,
      false,
    ])
    expect(mapDisabledReasonProp(disableByUsage()(testWithUsage, 10))).toEqual([
      'usage',
      null,
      null,
    ])
    expect(mapDisabledProp(disableByUsage()(testWithUsage, 55))).toEqual([
      true,
      true,
      false,
    ])
    expect(mapDisabledReasonProp(disableByUsage()(testWithUsage, 55))).toEqual([
      'usage',
      'usage',
      null,
    ])
    expect(mapDisabledProp(disableByUsage()(testWithUsage, 100))).toEqual([
      true,
      true,
      true,
    ])
    expect(
      mapDisabledReasonProp(disableByUsage()(testWithUsage, 100)),
    ).toEqual(['usage', 'usage', 'usage'])
  })
})
