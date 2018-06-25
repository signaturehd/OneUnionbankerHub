import { combineReducers } from 'redux'

import samples from './SampleReducer'
import events from './EventReducer'
import notify from './NotifyReducer'
import login from './LoginReducer'

const rootReducer = combineReducers({
  samples,
  notify,
  events,
  login
})

export default rootReducer
