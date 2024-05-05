// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from './user'
import master from './master'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  users,
  master
})

export default rootReducer
