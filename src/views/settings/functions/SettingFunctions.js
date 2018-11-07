import {
  RequiredNumberValidation,
} from '../../../utils/validate'


export function checkedValidateInputNumber (respNumber) {
  return new RequiredNumberValidation().isValid(respNumber) ?
    respNumber :
    ''
}
