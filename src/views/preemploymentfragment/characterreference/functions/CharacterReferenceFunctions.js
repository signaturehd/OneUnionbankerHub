import moment from 'moment'
import { format } from '../../../../utils/numberUtils'
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

export function checkValidateNumber (number) {
  return new RequiredNumberValidation().isValid(number) ?
  number : ''
}

export function checkedValidateInput (string) {
  return new RequiredValidation().isValid(string) ?
  string : ''
}