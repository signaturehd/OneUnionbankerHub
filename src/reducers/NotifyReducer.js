import { ADD_NOTIFY, REMOVE_NOTIFY, RESET_NOTIFY } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state = initialState, action) {
  const notifys = state.notify
  switch (action.type) {
    case ADD_NOTIFY:
      return { ...state, notify: [action.notifyObj, ...notifys] }
    case REMOVE_NOTIFY:
      return { ...state, notify: [
        ...notifys.slice(action.index, 0),
        ...notifys.slice(action.index + 1)
      ] }
    case RESET_NOTIFY:
      return { ...state, notify: [] }
    default:
      return state
  }
}
