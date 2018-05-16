import { ADD_NOTIFY } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFY:
      return Object.assign({}, state, {
        token: action.token
      })

    default:
      return state
  }
}
