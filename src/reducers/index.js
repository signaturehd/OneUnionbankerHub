import { combineReducers } from 'redux'

import samples from './SampleReducer'
import events from './EventReducer'
import notify from './NotifyReducer'

const rootReducer = combineReducers({
  samples,
  notify,
  events,
})

export default rootReducer
