// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from './user'
import master from './master'
import ticket from './ticket'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  users,
  master,
  ticket
})

export default rootReducer
