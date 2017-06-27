"use strict";

var _cookiesTools = require("./cookiesTools");

describe("filter cookies", function () {
  test("default prefix", function () {
    expect((0, _cookiesTools.filterCookiesByPrefix)({ "splitster_1": 1, "not_splitster_1": 1, "splitster_2": 2, "splitster_3": 3 })).toEqual(["splitster_1", "splitster_2", "splitster_3"]);
    expect((0, _cookiesTools.filterCookiesByPrefix)({ "splitster_test_1": 1 })).toEqual(["splitster_test_1"]);
    expect((0, _cookiesTools.filterCookiesByPrefix)({ "not_splitster_test_1": 1 })).toEqual([]);
  });
  test("custom prefix", function () {
    expect((0, _cookiesTools.filterCookiesByPrefix)({ "tests_1": 1, "not_tests_1": 1, "tests_2": 2, "tests_3": 3 }, "tests_")).toEqual(["tests_1", "tests_2", "tests_3"]);
    expect((0, _cookiesTools.filterCookiesByPrefix)({ "custom_1": 1 }, "custom_")).toEqual(["custom_1"]);
  });
});

describe("cookies parsing", function () {
  test("default prefix", function () {
    expect((0, _cookiesTools.parseCookies)({ "splitster_1": 1, "not_splitster_1": 1, "splitster_2": 2, "splitster_3": 3 })).toEqual({ "1": 1, "2": 2, "3": 3 });
    expect((0, _cookiesTools.parseCookies)({ "splitster_test_1": 1 })).toEqual({ "test_1": 1 });
  });
  test("custom prefix", function () {
    expect((0, _cookiesTools.parseCookies)({ "tests_1": 1, "not_tests_1": 1, "tests_2": 2, "tests_3": 3 }, "tests_")).toEqual({ "1": 1, "2": 2, "3": 3 });
    expect((0, _cookiesTools.parseCookies)({ "custom_1": 1 }, "custom_")).toEqual({ "1": 1 });
  });
  test("nested", function () {
    expect((0, _cookiesTools.parseCookies)((0, _cookiesTools.parseCookies)({ "splitster_tests_1": 1 }, "splitster_"), "tests_")).toEqual({ "1": 1 });
  });
});