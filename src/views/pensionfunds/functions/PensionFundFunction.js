import {
  RequiredNumberValidation,
  MoneyValidation
} from '../../../utils/validate'

export function checkedValidateInputNumber (number) {
  return new RequiredNumberValidation().isValid(number) ?
    number :
    ''
}

export function checkedValidateInputMoney (number) {
  return new MoneyValidation().isValid(number) ?
    number :
    ''
}
