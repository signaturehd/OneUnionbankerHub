import {
  RequiredValidation
} from '../../../utils/validate'

export function checkedValidateInput (input) {
  return new RequiredValidation().isValid(input) ? true : false
}

export function format (n = 0) {
  var parts = parseFloat(n).toFixed(2).split(".")
  return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "")
}
