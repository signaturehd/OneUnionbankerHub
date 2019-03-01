import {
  RequiredNumberValidation
} from '../../../utils/validate'

export function checkedValidateInputNumber (number) {
  return new RequiredNumberValidation().isValid(number) ?
    number :
    ''
}
