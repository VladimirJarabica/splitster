import { createTestsOpts } from './getNormalTests'

describe('test options', () => {
  it('without any params', () => {
    expect(createTestsOpts()).toEqual({
      winningVariant: null,
    })
  })
  it('default value', () => {
    expect(createTestsOpts('defValue')).toEqual({
      winningVariant: 'defValue',
    })
  })
})
