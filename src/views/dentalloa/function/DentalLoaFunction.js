import { RequiredValidation } from '../../../utils/validate'

export function checkedValidateInput (input) {
  return new RequiredValidation().isValid(input) ? true : false
}
