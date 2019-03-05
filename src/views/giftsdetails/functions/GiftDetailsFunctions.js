import {
  RequiredNumberValidation
} from '../../../utils/validate'

export function checkedValidateNumberInput (input) {
  return new RequiredNumberValidation().isValid(input) ? input : ''
}
