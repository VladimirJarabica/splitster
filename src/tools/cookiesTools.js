// @flow
import R from 'ramda'

import type { SaveResults } from '../types'
import type { Tests, Variants } from '../containers/Test'
import type { DisabledReason, TestsConfig } from '../types/index'

/**
 * How cookies will set
 *
 * Tests:
 * {prefix}_{test}_{test-id}={winning_variant_id}
 * splitster_test_button_color=red
 * splitster_test_show_widget=show
 *
 * Variants will be in config,
 * tracks will be in config
 * ... so basically tests are enough for now
 */

export const filterCookiesByPrefix = (
  cookies: SaveResults,
  prefix: string = 'splitster_',
): Array<string> => R.filter(R.startsWith(prefix), R.keys(cookies))

/**
 * Parse cookies with keys {prefix_test_id} to {test_id}
 * @param prefix
 * @param cookies
 * @returns {*}
 */
export const parseCookies = (
  cookies: SaveResults,
  prefix: string = 'splitster_',
): SaveResults =>
  R.reduce(
    (acc, key) =>
      R.assoc(R.slice(prefix.length, key.length, key), cookies[key], acc),
    {},
    filterCookiesByPrefix(cookies, prefix),
  )

const alphabetSort = (a, b) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}
// ======
// cookies to save results
// key: splitster
// cookies: abc=1|def=0
export const parseSplicedCookieNames = (cookies: string) => {
  const pairs = cookies.split('|')

  return R.map(pair => {
    const [key, value] = pair.split('=')
    return {
      key,
      value: value[0] === 'd' ? value : parseInt(value, 10),
    }
  })(pairs)
}

export const findTestId = (codeOrId: string, tests: Tests) => {
  if (tests[codeOrId]) {
    return codeOrId
  }
  return R.compose(
    R.prop('id'),
    R.find(test => test.code === codeOrId),
    R.values,
    R.mapObjIndexed((test, id) => ({ id, code: test.code })),
  )(tests)
}

export const findVariantId = (value: number, variants: Variants) =>
  R.compose(R.prop(value), R.sort(alphabetSort), R.keys)(variants)

export const DISABLED_REASONS: { index: number, reason: string } = [
  { index: 0, reason: 'usage' },
  { index: 1, reason: 'separate_test' },
  { index: 2, reason: 'user_group' },
  { index: 3, reason: 'config' },
]

export const getDisabledReasonByIndex = (index: number): string =>
  R.compose(
    R.prop('reason'),
    R.find(disabledReason => disabledReason.index === index),
  )(DISABLED_REASONS)

export const getDisabledIndexByReason = (reason: string): string =>
  R.compose(
    R.prop('index'),
    R.find(disabledReason => disabledReason.reason === reason),
  )(DISABLED_REASONS)

export const parseSplicedCookies = (
  cookies: string,
  tests: TestsConfig,
): SaveResults =>
  R.compose(
    R.reduce((acc, pair) => {
      const testId = findTestId(pair.key, tests)
      if (!testId) return acc
      if (pair.value[0] === 'd') {
        // Test is disabled
        const disabledReason = parseInt(pair.value[1], 10)
        return R.assoc(
          testId,
          `__disabled_${getDisabledReasonByIndex(disabledReason)}`,
          acc,
        )
      }
      const variantId = findVariantId(pair.value, tests[testId].variants)
      if (!variantId) return acc
      return R.assoc(testId, variantId, acc)
    }, {}),
    parseSplicedCookieNames,
  )(cookies)

// ====
// save results to cookies
export const getVariantPosition = (variants: Variants, variantId: string) => {
  return R.compose(R.indexOf(variantId), R.sort(alphabetSort), R.keys)(variants)
}

export const saveResultsToSpliced = (results: SaveResults, tests: Tests) => {
  return R.compose(
    R.join('|'),
    R.map(({ key, value }) => `${key}=${value}`),
    R.values,
    R.mapObjIndexed((val, k) => {
      const test = tests[k]
      const key = test.code || test.id

      if (R.startsWith('__disabled_', val)) {
        return {
          key,
          value: `d${getDisabledIndexByReason(val.split('__disabled_')[1])}`,
        }
      }
      const value = getVariantPosition(test.variants, val)
      return {
        key,
        value,
      }
    }),
  )(results)
}

// // TODO: write tests
// export const parseTest = (test: Test, prefix: string = "splitster_"): string =>
//   test.winningVariant ? test.winningVariant.id : ""

// export const parseTestIds = (testIds: Array<string>, splitster: Splitster, prefix: string = "splitster_"): Cookies =>
//   R.reduce(
//     (acc, testId) => R.assoc(`${prefix}test_${testId}`, parseTest(splitster.tests[testId]), acc),
//     {},
//     testIds,
//   )

// TODO: write tests
// TODO: unnecessary?
// export const parseTests = (tests: Tests, prefix: string = "splitster_"): Cookies =>
//   R.reduce(
//     (acc, key) => R.assoc(`${prefix}test_${key.id}`, parseTest(key), acc),
//     {},
//     R.values(tests),
//   )
