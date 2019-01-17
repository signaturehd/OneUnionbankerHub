import {
  RequiredValidation,
  RequiredAlphabetValidation
} from '../../../utils/validate'

export function checkedValidatedAlphabet (alphabet) {
  return new RequiredAlphabetValidation().isValidAddress(alphabet) ?
    alphabet : ''
}
