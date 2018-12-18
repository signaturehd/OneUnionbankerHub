import {
  RequiredSymbolValidation
} from '../../../utils/validate'

import moment from 'moment'

export function checkNotSymbol (data) {
  return !new RequiredSymbolValidation().isValid(data) ?
    data  : ''
}
