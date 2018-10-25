import {
  filterCookiesByPrefix,
  parseCookies,
  findTestId,
  findVariantId,
  parseSplicedCookieNames,
  parseSplicedCookies,
  getVariantPosition,
  saveResultsToSpliced,
} from './cookiesTools'

describe('filter cookies', () => {
  test('default prefix', () => {
    expect(
      filterCookiesByPrefix({
        splitster_1: 1,
        not_splitster_1: 1,
        splitster_2: 2,
        splitster_3: 3,
      }),
    ).toEqual(['splitster_1', 'splitster_2', 'splitster_3'])
    expect(filterCookiesByPrefix({ splitster_test_1: 1 })).toEqual([
      'splitster_test_1',
    ])
    expect(filterCookiesByPrefix({ not_splitster_test_1: 1 })).toEqual([])
  })
  test('custom prefix', () => {
    expect(
      filterCookiesByPrefix(
        { tests_1: 1, not_tests_1: 1, tests_2: 2, tests_3: 3 },
        'tests_',
      ),
    ).toEqual(['tests_1', 'tests_2', 'tests_3'])
    expect(filterCookiesByPrefix({ custom_1: 1 }, 'custom_')).toEqual([
      'custom_1',
    ])
  })
})

describe('cookies parsing', () => {
  test('default prefix', () => {
    expect(
      parseCookies({
        splitster_1: 1,
        not_splitster_1: 1,
        splitster_2: 2,
        splitster_3: 3,
      }),
    ).toEqual({ '1': 1, '2': 2, '3': 3 })
    expect(parseCookies({ splitster_test_1: 1 })).toEqual({ test_1: 1 })
  })
  test('custom prefix', () => {
    expect(
      parseCookies(
        { tests_1: 1, not_tests_1: 1, tests_2: 2, tests_3: 3 },
        'tests_',
      ),
    ).toEqual({ '1': 1, '2': 2, '3': 3 })
    expect(parseCookies({ custom_1: 1 }, 'custom_')).toEqual({ '1': 1 })
  })
  test('nested', () => {
    expect(
      parseCookies(
        parseCookies({ splitster_tests_1: 1 }, 'splitster_'),
        'tests_',
      ),
    ).toEqual({ '1': 1 })
  })
})

describe('spliced cookie parsing', () => {
  test('should correctly parse', () => {
    expect(parseSplicedCookieNames('abc=1|def=0')).toEqual([
      { key: 'abc', value: 1 },
      { key: 'def', value: 0 },
    ])
  })
  test('find test id by id', () => {
    expect(
      findTestId('kek', {
        kek: 1,
        bur: 2,
      }),
    ).toEqual('kek')
  })
  test('find test id by code', () => {
    expect(
      findTestId('kek', {
        kekistan: {
          code: 'kek',
        },
        bur: 2,
      }),
    ).toEqual('kekistan')
  })
  test('find variant id', () => {
    expect(
      findVariantId(0, {
        x: 1,
        a: 2,
      }),
    ).toEqual('a')
  })
  test('parseSplicedCookies', () => {
    const tests = {
      kekistan: {
        code: 'kek',
        variants: {
          k: 1,
          a: 2,
        },
      },
      bur: {
        variants: {
          h: 1,
          m: 2,
        },
      },
      lololol: {
        code: 'lol',
        variant: {
          u: 5,
          v: 9,
        },
      },
      tst: {},
    }
    expect(parseSplicedCookies('kek=0|bur=1|lol=d0|tst=d2', tests)).toEqual({
      kekistan: 'a',
      bur: 'm',
      lololol: '__disabled_usage',
      tst: '__disabled_user_group',
    })
  })
})

describe('save results to spliced form', () => {
  test('getVariantPosition', () => {
    expect(
      getVariantPosition(
        {
          kek: 1,
          bur: 1,
          lol: 1,
        },
        'kek',
      ),
    ).toEqual(1)
  })
  test('saveResultsToSpliced', () => {
    expect(
      saveResultsToSpliced(
        {
          kekistan: 'a',
          bur: 'b',
          lololol: 'c',
          tst: '__disabled_user_group',
          abc: '__disabled_config',
        },
        {
          kekistan: {
            id: 'kekistan',
            code: 'kek',
            variants: {
              a: 1,
            },
          },
          bur: {
            id: 'bur',
            variants: {
              a: 1,
              b: 1,
            },
          },
          lololol: {
            id: 'lololol',
            code: 'lol',
            variants: {
              a: 1,
              b: 1,
              c: 1,
            },
          },
          tst: {
            id: 'tst',
          },
          abc: {
            id: 'abc',
          },
        },
      ),
    ).toEqual('kek=0|bur=1|lol=2|tst=d2|abc=d3')
  })
})
