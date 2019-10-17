import * as R from "ramda";
import { TestConfig } from "../records/TestConfig";
import { Variants } from "../records/Variants";

export const getWinningVariant = (
  testConfig: Pick<TestConfig, "variants" | "defaultVariant">,
  seedNumber: number
): string => {
  const sortedEntries = R.compose<
    Variants,
    [string, number][],
    [string, number][]
  >(
    R.sortBy(R.nth(0)), // sort by id
    v => Object.entries<number>(v)
  )(testConfig.variants);

  const ratioSum = R.compose(
    R.sum,
    R.map(entry => entry[1])
  )(sortedEntries);

  // Seed number (from interval [0, 1]) is interpolated to interval [0-ratio sum]
  let floater = seedNumber * ratioSum;

  const winningVariant = R.find(entry => {
    floater -= entry[1];
    return floater <= 0;
  }, sortedEntries);
  return winningVariant ? winningVariant[0] : testConfig.defaultVariant;
};
