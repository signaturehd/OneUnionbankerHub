import moment from 'moment'
import {
  RequiredAlphabetValidation,
  RequiredSymbolValidation,
  RequiredValidation,
  RequiredEmailValidation,
  RequiredNumberValidation
} from '../../../../utils/validate'


export function checkedDateFilled (birthDate) {
	return birthDate ?
       moment(birthDate).format('MMMM DD, YYYY') : '(Not Yet Provided)'
}


export function checkGender (gender) {
	if(gender === 'M') {
	  return 'Male'
	} else {
	  return 'Female'
	}
}

export function checkStatus (status) {
	if(status === 1) {
    return 'Deceased'
	} else {
    return 'Living'
	}
}

export function checkedValidateText (text) {
  return new RequiredAlphabetValidation().isValid(text) ?
   text : ''
}

export function checkNoSymbol (symbol) {
  return ! new RequiredSymbolValidation().isValid(symbol) ?
  symbol : ''
}

export function checkValidateNumber (number) {
  return new RequiredNumberValidation().isValid(number) ?
  number : ''
}
