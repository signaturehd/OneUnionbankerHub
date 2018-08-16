import {
  RequiredAlphabetValidation,
  RequiredNumberValidation,
  RequiredSymbolValidation
} from '../../../utils/validate'


export function checkedValidatedInput (respString) {
  return !new RequiredSymbolValidation().isValid(respString) ?
    respString :
    ''
}

export function checkedValidateInputNumber (respNumber) {
  return new RequiredNumberValidation().isValid(respNumber) ?
    respNumber :
    ''
}

export function checkedValidateAlphabet (respNumber) {
  return new RequiredAlphabetValidation().isValid(respNumber) ?
    respNumber :
    ''
}
