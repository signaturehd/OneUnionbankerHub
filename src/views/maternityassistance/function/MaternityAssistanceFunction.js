import moment from 'moment'
import { format } from '../../../utils/numberUtils'
import {
  MoneyValidation,
  RequiredAlphabetValidation,
  RequiredSymbolValidation,
  RequiredValidation
} from '../../../utils/validate'

export function checkedAmount (amount) {
  return new MoneyValidation().isValid(amount) ?
   amount : ''
}

export function checkedValidateText (text) {
  return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkedValidateSymbol (symbol) {
  return !new RequiredSymbolValidation().isValid(symbol) ?
    symbol : ''
}

export function checkedValidateInput (input) {
  return new RequiredValidation().isValid(input) ? true : false
}

/* (e.g) July 5, 2018 */
export function checkedMDYDate (date) {
  return date ?
         moment(date.format('MM/DD/YYYY')) : '(Not Yet Provided)'
}
