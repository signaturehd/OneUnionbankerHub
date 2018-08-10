import {
  MoneyValidation,
  RequiredAlphabetValidation,
  RequiredDecimalValidation
} from '../../../utils/validate'

export function checkedAmount (amount) {
  return new MoneyValidation().isValid(amount) ?
  amount : ''
}

export function checkedValidateText (text) {
  return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkedValidateDecimal (num) {
  return new RequiredDecimalValidation().isValid(num) ?
   num : ''
}
