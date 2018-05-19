import { CHANGE_TOKEN_EVENT } from '../utils/actionUtil'

export function addNotify ( title, message, type, duration ) {
  return { type: ADD_NOTIFY, title, message, type, duration }
}
