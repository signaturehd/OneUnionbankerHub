import moment from 'moment'
import store from '../../../store'
import { NotifyActions } from '../../../actions'

export function checkedDate (date) {
  return date ? moment(date.format('MM/DD/YYYY')) : ''
}

export function checkedTitle (isFormReview) {
  return isFormReview ? 'Form Summary' : 'Annual Physical Exam'
}

export function notification (msg) {
  store.dispatch(NotifyActions.addNotify({
    title : 'Annual Physical Exam' ,
    message : msg,
    type : 'warning',
    duration : 2000
  }))
}
