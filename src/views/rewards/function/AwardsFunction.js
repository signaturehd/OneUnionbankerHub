import {
  RequiredValidation,
  RequiredAlphabetValidation
} from '../../../utils/validate'

import moment from 'moment'

export function checkedValidated () {

}

export function checkedValidatedAlphabet (alphabet) {
  return new RequiredAlphabetValidation().isValid(alphabet) ?
    alphabet : ''
}
