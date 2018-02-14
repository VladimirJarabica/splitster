import disableByDef, { checkDisabled } from './disableByDef'
import {
  testsConfig,
  mapDisabledProp,
  mapDisabledReasonProp,
} from './testsTools.test'

describe('#disableByDef', () => {
  describe('#checkDisabled', () => {
    it('should return correct disabled', () => {
      expect(checkDisabled()).toEqual({
        disabled: false,
        disabledReason: null,
      })
      expect(checkDisabled('irrelevant')).toEqual({
        disabled: false,
        disabledReason: null,
      })
      expect(checkDisabled('b')).toEqual({
        disabled: false,
        disabledReason: null,
      })
      expect(checkDisabled('__disabled_config')).toEqual({
        disabled: false,
        disabledReason: null,
      })
      expect(checkDisabled('__disabled_irrelevant')).toEqual({
        disabled: false,
        disabledReason: null,
      })
      expect(checkDisabled('__disabled_usage')).toEqual({
        disabled: true,
        disabledReason: 'usage',
      })
      expect(checkDisabled('__disabled_separate_test')).toEqual({
        disabled: true,
        disabledReason: 'separate_test',
      })
      expect(checkDisabled('__disabled_user_group')).toEqual({
        disabled: true,
        disabledReason: 'user_group',
      })
    })
  })
  describe('#disableByDef itself', () => {
    it('should return disabled by def', () => {
      const result = disableByDef({
        test_a: 'irrelevant',
        test_x: '__disabled_config',
        test_h: '__disabled_usage',
      })(testsConfig)
      expect(mapDisabledProp(result)).toEqual([false, false, true])
      expect(mapDisabledReasonProp(result)).toEqual([null, null, 'usage'])
    })
  })
})
