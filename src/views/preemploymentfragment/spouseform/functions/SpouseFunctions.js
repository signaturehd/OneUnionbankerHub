import moment from 'moment'
import { format } from '../../../../utils/numberUtils'
import {
  RequiredAlphabetValidation,
  RequiredSymbolValidation,
  RequiredValidation,
  RequiredNumberValidation
} from '../../../../utils/validate'

export function checkValidateInput (text) {
   return new RequiredValidation().isValid(text) ?
   true : false
}

export function checkAlphabetInput (text) {
   return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkNumberInput (text) {
   return new RequiredNumberValidation().isValid(text) ?
   text : ''
}
