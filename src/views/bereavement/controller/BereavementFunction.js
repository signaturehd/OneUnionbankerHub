import { RequiredAlphabetValidation } from '../../../utils/validate'

export function checkRequiredAlphabet (value, address) {
  const requiredValidation = new RequiredAlphabetValidation()
  return value ?
  requiredValidation.isValid(value) ?
  value : ''
  :
  requiredValidation.isValidAddress(address) ?
  address : ''
}

export function minimumLength (e) {
  return e < 15 ? true : false
}

export function errorMessage (value, message, message2) {
  return value ? message2 : message
}

export function dateFormat (value) {
  return value && value.format('MM/DD/YYYY')
}
