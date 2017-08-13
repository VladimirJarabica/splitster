// @flow
import client from '../splitster/client/SplitsterClient'
import server from '../splitster/server/SplitsterServer'
import splitsterInit, { server as serverInit } from '../main'

import type { Config, SaveResults } from '../types'

export type ActionType =
  | 'splitster/INIT_SERVER'
  | 'splitster/INIT_CLIENT'
  | 'splitster/SERVER_TO_SAVE'
  | 'splitster/CLIENT_TO_SAVE'
  | 'splitster/SAVE_TO_CLIENT'
  | 'splitster/RUN'
  | 'splitster/SET'

export type Action = {
  type: ActionType,
}

/**
 * Create server (serverInit)
 * then change from server (server splitster)
 * to save (SaveResults)
 * and then to client (client splitster)
 */
const splitsterReducer = (
  state: client | SaveResults | server = {},
  action: Action,
) => {
  switch (action.type) {
    case 'splitster/INIT_SERVER':
      // $FlowFixMe
      return serverInit(action.config, action.user, state)
    case 'splitster/INIT_CLIENT':
      // $FlowFixMe
      return splitsterInit(action.config, action.user, state)
    case 'splitster/SERVER_TO_SAVE':
    case 'splitster/CLIENT_TO_SAVE':
      // $FlowFixMe
      return state.getSaveResults()
    case 'splitster/RUN':
      if (action.test) {
        // $FlowFixMe
        state.run(action.test)
      } else {
        // $FlowFixMe
        state.runAll()
      }
      return state
    case 'splitster/SET':
      // $FlowFixMe
      return state.set(action.testId, action.variantId)
    default:
      return state
  }
}

const initServer = (config: Config, user?: Object): Action => ({
  type: 'splitster/INIT_SERVER',
  config,
  user,
})

const initClient = (config: Config, user?: Object): Action => ({
  type: 'splitster/INIT_CLIENT',
  config,
  user,
})

const serverToSave = (): Action => ({
  type: 'splitster/SERVER_TO_SAVE',
})

const clientToSave = (): Action => ({
  type: 'splitster/CLIENT_TO_SAVE',
})

const run = (test: string): Action => ({
  type: 'splitster/RUN',
  test,
})

const set = (testId: string, variantId: string): Action => ({
  type: 'splitster/SET',
  testId,
  variantId,
})

export default {
  splitsterReducer,
  initServer,
  initClient,
  serverToSave,
  clientToSave,
  run,
  set,
}
