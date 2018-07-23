import PropTypes from 'prop-types'
import moment from 'moment'

class TransactionPersonalController {

  checkedDateFilled (details) {
    return details ? details && moment(details && details.dateFiled).format('MMMM d, YYYY') : '(Not Yet Provided)'
  }

  checkedAccountNumber (details) {
    return details ? details && details.AccountNo : '(Not Yet Provided)'
  }

  checkedReferenceNumber (details) {
    return details ? details && details.ReferenceNumber : '(Not Yet Provided)'
  }

  checkedPatient (patient) {
    return patient ? patient && patient.Recipient : '(Not Yet Provided)'
  }

  indexDecreased (index) {
    if(Number(index) === 4) {
      return index
    } else {
      return index - 4
    }
  }

  indexIncreased (index) {
    return index + 4
  }

  checkedBenefitStatus (detailStatus) {
    if(detailStatus === 'cancelled') {
      return 'cancel'
    } else if (detailStatus === 'for crediting') {
      return 'crediting'
    } else if (detailStatus === 'credited') {
      return 'credited'
    } else if (detailStatus === 'for reconciliation') {
      return 'reconciliation'
    } else if (detailStatus === 'cleared') {
      return 'clear'
    } else if (detailStatus === 'for processing') {
      return 'process'
    }
  }
}

export default TransactionPersonalController
