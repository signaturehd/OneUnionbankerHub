import {
  RequiredValidation,
  MinMaxNumberValidation,
  RequiredAlphabetValidation,
  RequiredDecimalValidation
} from '../../../utils/validate'

export function checkedValidateText (text) {
  return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkedValidateDecimal (num) {
  return new RequiredDecimalValidation().isValid(num) ?
   num : ''
}
export function checkedMinMaxNumber (num) {
  return new MinMaxNumberValidation().isValid(num) ?
   num : ''
}

export function checkedDesiredAmountFunc (num) {
  return new RequiredDecimalValidation().isValid(num) &&
  new MinMaxNumberValidation(0, 800).isValid(num) ?
    num : ''
}

export function checkedValidateInput (input) {
  return new RequiredValidation().isValid(input) ? true : false
}
