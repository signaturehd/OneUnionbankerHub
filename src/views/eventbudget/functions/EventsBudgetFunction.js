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

export function checkValidateMoney (amount) {
  return new MoneyValidation().isValid(amount) ?
    amount :
    ''
}

export function checkedValidateInputNumber (respNumber) {
  return new RequiredNumberValidation().isValid(respNumber) ?
    respNumber :
    ''
}

export function checkedValidateAlphabet (string) {
  return new RequiredAlphabetValidation().isValid(string) ?
    string :
    ''
}

export function checkedValidateAddress (address) {
  return new RequiredAlphabetValidation().isValidAddress(address) ?
    address :
    ''
}
