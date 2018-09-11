import moment from 'moment'
import { format } from '../../../utils/numberUtils'
import {
  MoneyValidation,
  RequiredAlphabetValidation,
  RequiredSymbolValidation,
  RequiredValidation,
  RequiredNumberValidation
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

export function checkedValidateInputNumber (number) {
  return new RequiredNumberValidation().isValid(number) ? number : ''
}

export function checkedValidateAddress (address) {
  return new RequiredAlphabetValidation().isValidAddress(address) ? address : ''
}

export function checkedReasonForLeave (benefitsCodeType) {
  let status =
    benefitsCodeType &&
    benefitsCodeType.toLowerCase()
  if(status === 'fl') {
    return 'Bereavement Leave'
  } else if (status === 'sl') {
    return 'Sick Leave'
  } else if (status === 'bl') {
    return 'Birthday Leave'
  } else if (status === 'el') {
    return 'Emergency'
  } else if (status === 'mn') {
    return 'Maternity-Normal'
  } else if (status === 'mc') {
    return 'Maternity-Caesarean'
  } else if (status === 'pl') {
    return 'Paternity Leave'
  } else if (status === 'br') {
    return 'Bar/Board Review Leave'
  } else if (status === 'vl') {
    return 'Vacation Leave'
  }
}
