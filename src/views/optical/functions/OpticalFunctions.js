import {
  MoneyValidation,
  RequiredValidation
} from '../../../utils/validate'

export function checkedValidated () {

}

export function checkedAmount (amount) {
  return new MoneyValidation().isValid(amount) ?
    amount  : ''
}
