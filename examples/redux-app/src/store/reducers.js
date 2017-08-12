import { combineReducers } from 'redux'

import { splitsterRedux } from './../../../../src/main'

import todos from './todosReducer'

export default combineReducers({
  todos,
  splitster: splitsterRedux.splitsterReducer,
})
