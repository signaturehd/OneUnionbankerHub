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
    return <h1>{ transactionDetails.dateFiled }</h1> // Optical Fragment Fragment
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
