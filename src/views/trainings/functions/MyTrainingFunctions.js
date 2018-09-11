import moment from 'moment'

export function checkedDate (date) {
  return date ? moment(date.format('MM/DD/YYYY')) : '(Not Yet Provided)'
}

export function indexDecreased (index) {
  if(Number(index) === 8) {
    return index
  } else {
    return index - 8
  }
}

export function indexIncreased (index) {
  return index + 8
}
