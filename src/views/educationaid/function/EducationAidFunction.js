import {
  MoneyValidation,
  RequiredValidation,
  RequiredAlphabetValidation,
  RequiredDecimalValidation,
  RequiredSymbolValidation
} from '../../../utils/validate'

export function checkedAmount (amount) {
  return new MoneyValidation().isValid(amount) ?
  amount : ''
}

export function checkedValidateText (text) {
  return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkedValidateDecimal (num) {
  return new RequiredDecimalValidation().isValid(num) ?
   num : ''
}

export function checkedValidateSymbol (value) {
  return !new RequiredSymbolValidation().isValid(value) ?
  value : ''
}

export function checkedValidateInput (input) {
  return new RequiredValidation().isValid(input) ? true : false
}

export function totalReimbursableAmount (computations, gwa, totalFee) {
  if (computations) {
    for (const i in computations) {
      if ((gwa >= computations[i].maximum && gwa <= computations[i].minimum) ||
          (gwa >= computations[i].minimum && gwa <= computations[i].maximum)) {
        return parseFloat(totalFee) * parseFloat(computations[i].percent)
      }
    }
  } else {
    return 0
  }
}
