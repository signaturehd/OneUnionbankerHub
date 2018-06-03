import { ADD_NOTIFY, REMOVE_NOTIFY, RESET_NOTIFY } from '../utils/actionUtil'

export function addNotify (notifyObj) {
  return { type: ADD_NOTIFY, notifyObj }
}

export function removeNotify (index) {
  return { type: REMOVE_NOTIFY, index }
}

export function resetNotify () {
  return { type: RESET_NOTIFY }
}
