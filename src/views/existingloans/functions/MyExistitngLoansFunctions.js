import moment from 'moment'
import { format } from '../../../utils/numberUtils'

export function checkedDesiredAmount (balance) {
  return balance && balance ? format(balance) : '(Not Yet Provided)'
}

/* (e.g) July 5, 2018 */
export function checkedMDYDate (date) {
  return date ?
         date &&
         moment(date).format('MMMM DD, YYYY') : '(Not Yet Provided)'
}
