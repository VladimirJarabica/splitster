import mergeDefaultConfig from './mergeDefaultConfig'
import defaultConfig from './defaultConfig'

describe('merge default config', () => {
  it('should return default', () => {
    expect(mergeDefaultConfig({})).toEqual(defaultConfig)
  })
})
