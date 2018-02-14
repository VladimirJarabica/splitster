import { mapDisabledProp, mapDisabledReasonProp } from './testsTools.test'
import disableByDeadline from './disableByDeadline'

describe('#disableByDeadline', () => {
  const now = new Date()
  const yesterdayString = `${now.getFullYear()}-${now.getMonth() +
    1}-${now.getDate() - 1}`
  const tomorrowString = `${now.getFullYear()}-${now.getMonth() +
    1}-${now.getDate() + 1}`

  it('should correctly disable by string and date object', () => {
    const result = disableByDeadline([
      {
        deadline: yesterdayString,
        disabled: false,
        disabledReason: null,
      },
      {
        deadline: new Date(yesterdayString),
        disabled: false,
        disabledReason: null,
      },
    ])
    expect(mapDisabledProp(result)).toEqual([true, true])
    expect(mapDisabledReasonProp(result)).toEqual(['deadline', 'deadline'])
  })
  it('should correctly enable by string and date object', () => {
    const result = disableByDeadline([
      {
        deadline: tomorrowString,
        disabled: false,
        disabledReason: null,
      },
      {
        deadline: new Date(tomorrowString),
        disabled: false,
        disabledReason: null,
      },
    ])
    expect(mapDisabledProp(result)).toEqual([false, false])
    expect(mapDisabledReasonProp(result)).toEqual([null, null])
  })
})
