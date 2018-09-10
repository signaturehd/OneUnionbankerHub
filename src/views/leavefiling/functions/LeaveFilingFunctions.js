import moment from 'moment'

export function checkedReasonForLeave (benefitsCodeType) {
  let status =
    benefitsCodeType &&
    benefitsCodeType.toLowerCase()
  if(status === 'fl') {
    return 'Bereavement Leave'
  } else if (status === 'sl') {
    return 'Sick Leave'
  } else if (status === 'bl') {
    return 'Birthday Leave'
  } else if (status === 'el') {
    return 'Emergency'
  } else if (status === 'mn') {
    return 'Maternity-Normal'
  } else if (status === 'mc') {
    return 'Maternity-Caesarean'
  } else if (status === 'pl') {
    return 'Paternity Leave'
  } else if (status === 'br') {
    return 'Bar/Board Review Leave'
  } else if (status === 'vl') {
    return 'Vacation Leave'
  }
}
