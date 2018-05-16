import { CHANGE_TOKEN_EVENT } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOKEN_EVENT:
      return Object.assign({}, state, {
        token: action.token
      })

    default:
      return state
  }
}
