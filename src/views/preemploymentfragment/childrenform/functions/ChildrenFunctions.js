import moment from 'moment' 

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
	  return 'Living'
	} else {
	  return 'Deceased'
	}
}