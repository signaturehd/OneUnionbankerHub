import { RequiredAlphabetValidation } from '../../../utils/validate'

export function checkRequiredAlphabet (value) {
  return new RequiredAlphabetValidation().isValid(value) ?
  value : ''
}
