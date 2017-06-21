import { filterCookiesByPrefix, parseCookies } from "./cookiesTools"

describe("filter cookies", () => {
  test("default prefix", () => {
    expect(filterCookiesByPrefix({"splitster_1": 1, "not_splitster_1": 1, "splitster_2": 2, "splitster_3": 3}))
      .toEqual(["splitster_1", "splitster_2", "splitster_3"])
    expect(filterCookiesByPrefix({"splitster_test_1": 1}))
      .toEqual(["splitster_test_1"])
    expect(filterCookiesByPrefix({"not_splitster_test_1": 1}))
      .toEqual([])
  })
  test("custom prefix", () => {
    expect(filterCookiesByPrefix({"tests_1": 1, "not_tests_1": 1, "tests_2": 2, "tests_3": 3}, "tests_"))
      .toEqual(["tests_1", "tests_2", "tests_3"])
    expect(filterCookiesByPrefix({"custom_1": 1}, "custom_"))
      .toEqual(["custom_1"])
  })
})

describe("cookies parsing", () => {
  test("default prefix", () => {
    expect(parseCookies({"splitster_1": 1, "not_splitster_1": 1, "splitster_2": 2, "splitster_3": 3}))
      .toEqual({"1": 1, "2": 2, "3": 3})
    expect(parseCookies({"splitster_test_1": 1}))
      .toEqual({"test_1": 1})
  })
  test("custom prefix", () => {
    expect(parseCookies({"tests_1": 1, "not_tests_1": 1, "tests_2": 2, "tests_3": 3}, "tests_"))
      .toEqual({"1": 1, "2": 2, "3": 3})
    expect(parseCookies({"custom_1": 1}, "custom_"))
      .toEqual({"1": 1})
  })
  test("nested", () => {
    expect(parseCookies(parseCookies({"splitster_tests_1": 1}, "splitster_"), "tests_"))
      .toEqual({"1": 1})
  })
})
