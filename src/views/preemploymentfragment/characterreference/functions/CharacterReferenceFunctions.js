import moment from 'moment'
import {
  RequiredAlphabetValidation,
  RequiredSymbolValidation,
  RequiredValidation,
  RequiredEmailValidation,
  RequiredNumberValidation
} from '../../../../utils/validate'

export function checkedValidateText (text) {
  return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkValidateEmail (email) {
  return new RequiredEmailValidation().isValid(email) ?
  email : ''
}

export function checkNoSymbol (symbol) {
  return ! new RequiredSymbolValidation().isValid(symbol) ?
  symbol : ''
}

export function checkValidateNumber (number) {
  return new RequiredNumberValidation().isValid(number) ?
  number : ''
}

export function checkedValidateInput (string) {
  return new RequiredValidation().isValid(string) ?
  string : ''
}
