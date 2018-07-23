import PropTypes from 'prop-types'
import moment from 'moment'

class TransactionDetailsController {

  checkedBenefitType (details) {
    return  details ? details.name : '(Not Yet Provided)'
  }

  checkedDateFilled (details) {
    return details ? moment(details && details.dateFiled).format('dddd, MMMM d, YYYY, h:MM:ss A') : '(Not Yet Provided)'
  }

  checkedBenefitStatus (detailStatus) {
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
    }
  }

  checkedReferenceNumber (details) {
    return details ? details && details.ReferenceNumber  : '(Not Yet Provided)'
  }

  getBenefitLabelStatus (label) {
    return label ? label.name : '(Not Yet Provided)'
  }
}

export default TransactionDetailsController
