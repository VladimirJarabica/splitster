import { hasTest } from './Splitster'

describe('#Splitster_tests', () => {
  describe('#hasTest', () => {
    it('should correctly check if test exists', () => {
      const spltister = {
        tests: {
          bur: 'bur',
          kek: null,
        },
      }
      expect(hasTest(spltister, 'bur')).toBe(true)
      expect(hasTest(spltister, 'kek')).toBe(true)
      expect(hasTest(spltister, 'lol')).toBe(false)
    })
  })
})
