import moment from 'moment'

  export function checkedBenefitType (details) {
    return  details ? details.name : '(Not Yet Provided)'
  }

  export function checkedDateFilled (details) {
    return details ?
           moment(details && details.dateFiled).format('dddd, MMMM DD, YYYY, h:MM:ss A') : '(Not Yet Provided)'
  }

  export function checkedBenefitStatus (detailStatus) {
    let status =
      detailStatus &&
      detailStatus.name.toLowerCase()
    if(status === 'cancelled') {
      return 'cancel'
    } else if (status === 'for crediting') {
      return 'crediting'
    } else if (status === 'credited') {
      return 'credited'
    } else if (status === 'for reconciliation') {
      return 'reconciliation'
    } else if (status === 'cleared') {
      return 'clear'
    } else if (status === 'for processing') {
      return 'process'
    } else if (status === 'confirmation') {
      return 'confirmation'
    } else if (status === 'for confirmation'){
      return 'confirmation'
    }
  }

  export function checkedReferenceNumber (details) {
    return details ? details && details.ReferenceNumber  : '(Not Yet Provided)'
  }

  export function getBenefitLabelStatus (label) {
    return label ? label.name : '(Not Yet Provided)'
  }
