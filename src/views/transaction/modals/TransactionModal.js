import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, CircularLoader } from '../../../ub-components/'

import './styles/transaction-modal.css'

function  TransactionDetails ( props )  {
  const transactionId = props.details.benefitType.id
  const transactionDetails = props.details
  if (transactionId == '6') {
     return <h1>Dental Reimubrsemments</h1> // Dental Reimbursement Fragment
  } else if (transactionId == '7') {
     return <h1>Dental Loa</h1> // Dental Loa Fragment
  } else if (transactionId == '8') {
    return <h1>Optical Reimbursement</h1> // Optical Fragment Fragment
  } else if (transactionId == '11') {
    return <h1>Educational Reimbursement Personal</h1> // Educational Reimbursement Personal
  } else if (transactionId == '12') {
    return <h1>Educational Reimbursement Dependent</h1> // Educational Reimbursement Dependent
  } else if (transactionId == '13') {
    return <h1>Educational Grant Personal</h1> // Educational Grant Personal
  } else if (transactionId == '32') {
    return <h1>Educational Grant Dependent</h1> // Educational Grant Dependent
  } else if (transactionId == '1') {
    return <h1>MPL</h1> // Loans
  } else {
    return <h1>No Transaction Occured please reload</h1> // No  Transaction
  }
 }

class TransactionModal extends Component {
  constructor (props) {
    super(props)
  }

 componentDidMount () {
    this.props.presenter()
 }

 render () {
    const {
      onClose,
      transactionResponse,
      transaction
    } = this.props
    // TODO map the transaction details here
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }
      >
        {
          transactionResponse ?
          <TransactionDetails details = { transactionResponse }  />
          :
          <center>
            <h3> Please wait while we are getting your transaction </h3>
            <CircularLoader show = {true} />
          </center>
        }
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default TransactionModal
