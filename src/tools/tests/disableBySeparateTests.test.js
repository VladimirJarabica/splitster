import { mergeDefaultTests } from './testsTools'
import disableBySeparateTests, {
  getSeparateRunTestId,
} from './disableBySeparateTests'
import { mapDisabledProp, mapDisabledReasonProp } from './testsTools.test'

describe('#disableBySeparateTests', () => {
  const separateTests = mergeDefaultTests({
    one: { disabled: true },
    two: { disabled: false },
    three: { disabled: true },
    four: { disabled: false },
    five: { disabled: false },
  })
  it('should get right separate run test id', () => {
    expect(getSeparateRunTestId(separateTests, 0)).toEqual('two')
    expect(getSeparateRunTestId(separateTests, 1)).toEqual('four')
    expect(getSeparateRunTestId(separateTests, 2)).toEqual('five')
    expect(getSeparateRunTestId(separateTests, 3)).toEqual(undefined)
    expect(getSeparateRunTestId(separateTests)).toBeDefined()
    expect(getSeparateRunTestId(separateTests)).toMatch(/two|four|five/)
  })
  it('should disable except separate test', () => {
    expect(
      mapDisabledProp(
        disableBySeparateTests({ runTest: 0, separate: true })(separateTests),
      ),
    ).toEqual([true, false, true, true, true])
    expect(
      mapDisabledReasonProp(
        disableBySeparateTests({ runTest: 0, separate: true })(separateTests),
      ),
    ).toEqual([null, null, null, 'separate_test', 'separate_test'])
    expect(
      mapDisabledProp(
        disableBySeparateTests({ runTest: 2, separate: true })(separateTests),
      ),
    ).toEqual([true, true, true, true, false])
    expect(
      mapDisabledReasonProp(
        disableBySeparateTests({ runTest: 2, separate: true })(separateTests),
      ),
    ).toEqual([null, 'separate_test', null, 'separate_test', null])
    expect(
      mapDisabledProp(
        disableBySeparateTests({ runTest: 3, separate: true })(separateTests),
      ),
    ).toEqual([true, true, true, true, true])
    expect(
      mapDisabledReasonProp(
        disableBySeparateTests({ runTest: 3, separate: true })(separateTests),
      ),
    ).toEqual([null, 'separate_test', null, 'separate_test', 'separate_test'])
  })
})
