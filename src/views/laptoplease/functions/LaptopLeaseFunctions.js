import {
  RequiredAlphabetValidation,
  RequiredNumberValidation,
  RequiredSymbolValidation,
  MoneyValidation
} from '../../../utils/validate'


export function checkedValidatedInput (respString) {
  return !new RequiredSymbolValidation().isValid(respString) ?
    respString :
    ''
}

export function checkedAmount (amount) {
  return new MoneyValidation().isValid(amount) ?
    amount  : ''
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
