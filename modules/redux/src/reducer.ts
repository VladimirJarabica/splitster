import { SplitsterClient, Override } from "@splitster/core";

import { Action } from "./actions";

/**
 * Create server (serverInit)
 * then change from server (server splitster)
 * to save (SaveResults)
 * and then to client (client splitster)
 */
export const splitsterReducer = (
  state: SplitsterClient | Override = {},
  action: Action
): SplitsterClient | Override => {
  switch (action.type) {
    case "@splitster/INIT":
      return new SplitsterClient({
        config: action.payload.config,
        userId: action.payload.userId,
        user: action.payload.user,
        override: action.payload.override
      });
    case "@splitster/TO_SAVE_RESULTS":
      if (state instanceof SplitsterClient) {
        return state.getSaveResults();
      }
      return state;
    case "@splitster/SET":
      if (state instanceof SplitsterClient) {
        const copy = state.clone();
        copy.set(action.payload.testId, action.payload.variantId);
        return copy;
      }
      return state;
    default:
      return state;
  }
};
