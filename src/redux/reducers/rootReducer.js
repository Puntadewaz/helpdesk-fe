// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import users from '@src/views/store/user'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  users
})

export default rootReducer
