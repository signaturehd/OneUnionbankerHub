import { combineReducers } from 'redux'

import samples from './SampleReducer'
import events from './EventReducer'

const rootReducer = combineReducers({
  samples,
  events,
})

export default rootReducer
