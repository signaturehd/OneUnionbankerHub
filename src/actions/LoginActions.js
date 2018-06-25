import { SHOW_RELOGIN } from '../utils/actionUtil'

export function showReloginModal (reloginBool) {
  return { type: SHOW_RELOGIN, reloginBool }
}
