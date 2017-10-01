import { combineReducers } from 'redux'

import splitsterReducer from 'splitster-redux'

import todos from './todosReducer'

export default combineReducers({
  todos,
  splitster: splitsterReducer,
})
