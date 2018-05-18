import { ADD_NOTIFY, REMOVE_NOTIFY } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state = initialState.notify, action) {
  switch (action.type) {
    case ADD_NOTIFY:
      return [ ...state, action.notifyObj ]
    case REMOVE_NOTIFY:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}
