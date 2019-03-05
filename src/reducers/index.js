import { combineReducers } from 'redux'

import samples from './SampleReducer'
import events from './EventReducer'
import notify from './NotifyReducer'
import login from './LoginReducer'
import profile from './ProfileReducer'

const rootReducer = combineReducers({
  samples,
  notify,
  events,
  login,
  profile,
})

export default rootReducer
