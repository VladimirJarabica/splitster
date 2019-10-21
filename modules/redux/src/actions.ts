import { Config, Override } from "@splitster/core";

type Init = {
  type: "@splitster/INIT";
  payload: {
    config: Config;
    user?: any;
    userId: string;
    override?: Override;
  };
};
type ToSaveResults = {
  type: "@splitster/TO_SAVE_RESULTS";
};

type Set = {
  type: "@splitster/SET";
  payload: {
    testId: string;
    variantId: string;
  };
};

export type Action = Init | ToSaveResults | Set;

export const init = ({
  config,
  user,
  userId,
  override
}: {
  config: Config;
  user?: any;
  userId: string;
  override?: { [testId: string]: string };
}): Init => ({
  type: "@splitster/INIT",
  payload: {
    config,
    user,
    userId,
    override
  }
});

export const toSaveResults = (): ToSaveResults => ({
  type: "@splitster/TO_SAVE_RESULTS"
});

export const set = (testId: string, variantId: string): Set => ({
  type: "@splitster/SET",
  payload: { testId, variantId }
});
