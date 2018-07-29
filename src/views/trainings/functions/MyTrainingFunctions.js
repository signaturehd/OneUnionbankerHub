import moment from 'moment'

export default checkedDate (date) {
  return date ? moment(date.format('MM/DD/YYYY')) : '(Not Yet Provided)'
}
