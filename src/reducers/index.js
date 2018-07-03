import { combineReducers } from 'redux'

import samples from './SampleReducer'
import events from './EventReducer'
import notify from './NotifyReducer'
import login from './LoginReducer'
import onboardingObj from './OnBoardingReducer'

const rootReducer = combineReducers({
  samples,
  notify,
  events,
  login,
  onboardingObj
})

export default rootReducer
