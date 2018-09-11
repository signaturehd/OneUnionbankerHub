import moment from 'moment'
import { format } from '../../../utils/numberUtils'

export function checkedDesiredAmount (balance) {
  return balance && balance ? format(balance) : '(Not Yet Provided)'
}

/* (e.g) July 5, 2018 */
export function checkedMDYDate (date) {
  return date ?
         moment(date).format('MMMM DD, YYYY') : '(Not Yet Provided)'
}

export function checkIcon (icon) {
  let iconDefault = icon

  if (iconDefault === 'Salary Loan') {
    return 'salary'
  } else if (iconDefault === 'Motorcycle Loan') {
    return 'motorcycle'
  } else if (iconDefault === 'Housing Assistance Loan') {
    return 'housingassistance'
  } else if (iconDefault === 'Computer Loan') {
    return 'computer'
  } else if (iconDefault === 'Emergency Loan' ) {
    return 'emergency'
  }
}
