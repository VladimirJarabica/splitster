import R from 'ramda'
import disableByConfig from './disableByConfig'
import {
  testsConfig,
  testsDef,
  mapDisabledProp,
  mapDisabledReasonProp,
} from './testsTools.test'

describe('#disableByConfig', () => {
  const testsConfigDisabled = R.compose(
    R.assocPath(['test_a', 'disabled'], true),
    R.assocPath(['test_h', 'disabled'], true),
  )(testsConfig)
  it('without def', () => {
    const result1 = disableByConfig()(testsConfig)
    expect(mapDisabledProp(result1)).toEqual([false, false, false])
    expect(mapDisabledReasonProp(result1)).toEqual([null, null, null])
  })
  it('rewrite disabled in def by not disabled in config', () => {
    const result1 = disableByConfig({
      test_a: '__disabled_config',
    })(testsConfig)
    expect(mapDisabledProp(result1)).toEqual([false, false, false])
    expect(mapDisabledReasonProp(result1)).toEqual([null, null, null])
    const result2 = disableByConfig({
      test_a: '__disabled_config',
      test_x: '__disabled_config',
      test_h: '__disabled_config',
    })(testsConfig)
    expect(mapDisabledProp(result2)).toEqual([false, false, false])
    expect(mapDisabledReasonProp(result2)).toEqual([null, null, null])
  })
  it('disable by config', () => {
    const result1 = disableByConfig()(testsConfigDisabled)
    expect(mapDisabledProp(result1)).toEqual([true, false, true])
    expect(mapDisabledReasonProp(result1)).toEqual(['config', null, 'config'])
  })
  it('rewrite winning variant by disabled in config', () => {
    const result1 = disableByConfig(testsDef)(testsConfigDisabled)
    expect(mapDisabledProp(result1)).toEqual([true, false, true])
    expect(mapDisabledReasonProp(result1)).toEqual(['config', null, 'config'])
  })
})
