import { SHOW_RELOGIN } from '../utils/actionUtil'
import initialState from './initialState'

export default function reducer (state = initialState.showReloginModal, action) {
  switch (action.type) {
    case SHOW_RELOGIN:
      return (state, action.reloginBool)
    default:
      return state
  }
}
