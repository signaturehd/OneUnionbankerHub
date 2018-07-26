import moment from 'moment'
import { format } from '../../../utils/numberUtils'
import {
  MoneyValidation,
  RequiredAlphabetValidation,
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

export function checkedValidateSymbol (symbol) {
  return !new RequiredSymbolValidation().isValid(symbol) ?
    symbol : ''
}
