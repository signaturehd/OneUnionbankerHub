import {
  RequiredValidation
} from '../../../utils/validate'

export function checkedValidateInput (input) {
  return new RequiredValidation().isValid(input) ? true : false
}

export function checkedValidateAmount (value) {
  return value && value.replace(/[^0-9]/g, '')
}
