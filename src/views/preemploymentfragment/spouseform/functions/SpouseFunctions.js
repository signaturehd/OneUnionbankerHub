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
   text : ''
}