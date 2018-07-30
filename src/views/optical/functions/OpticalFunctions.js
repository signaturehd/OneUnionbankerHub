import {
  MoneyValidation,
  RequiredValidation,
  RequiredSymbolValidation
} from '../../../utils/validate'

import moment from 'moment'

export function checkedValidated () {

}

export function checkedAmount (amount) {
  return new MoneyValidation().isValid(amount) ?
    amount  : ''
}

export function checkedValidateSymbol (symbol) {
  return !new RequiredSymbolValidation().isValid(symbol) ?
    symbol : ''
}


/* (e.g) July 5, 2018 */
export function checkedMDYDate (date) {
  return date ?
         moment(date.format('MM/DD/YYYY')) : '(Not Yet Provided)'
}
