import { SAMPLE_ACTION } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state, action) {
  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
    case SAMPLE_ACTION:
      return Object.assign({}, state, {
        sampleState: action.sampleState,
      })

    default:
      return state
  }
}
