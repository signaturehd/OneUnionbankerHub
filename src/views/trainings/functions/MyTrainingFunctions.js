import moment from 'moment'

export function checkedDate (date) {
  return date ? moment(date.format('MM/DD/YYYY')) : '(Not Yet Provided)'
}

export function indexDecreased (index) {
  if(Number(index) === 3) {
    return index
  } else {
    return index - 3
  }
}

export function indexIncreased (index) {
  return index + 3
}
