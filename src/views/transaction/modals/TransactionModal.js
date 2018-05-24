import React, { Component } from 'react'
import PropTypes from 'prop-types'
import
{ Modal, CircularLoader }
from '../../../ub-components/'

import
DentalReimbursementModalFragment
from './dentalreimbursement/DentalReimbursementModalFragment'
import
OpticalModalFragment
from './optical/OpticalModalFragment'
import
DentalLOAModalFragment
from './dentalloa/DentalLOAModalFragment'

import './styles/transaction-modal.css'

function  TransactionDetails ( props )  {
  const transactionId = props.details.benefitType.id
  const transactionDetails = props.details
  if (transactionId == '6') {
     return <DentalReimbursementModalFragment  transactionDetails = { transactionDetails } /> // Dental Reimbursement Fragment
  } else if (transactionId == '7') {
     return <DentalLOAModalFragment  transactionDetails = { transactionDetails } /> // Dental Loa Fragment
  } else if (transactionId == '8') {
    return <OpticalModalFragment  transactionDetails = { transactionDetails } />  // Optical Fragment Fragment
  } else if (transactionId == '11') {
    return  <h2></h2> // Educational Reimbursement Personal
  } else if (transactionId == '12') {
    return <h2></h2> // Educational Reimbursement Dependent
  } else if (transactionId == '13') {
    return  <h2></h2> // Educational Grant Personal
  } else if (transactionId == '32') {
    return  <h2></h2> // Educational Grant Dependent
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
      transactionResponse,
      transaction,
      onClose
    } = this.props
    // TODO map the transaction details here

    return (
    <Modal
      isDismisable = { true }
      width = {70}
      onClose = { onClose }>

      <div>
        <h2> {transactionResponse && transactionResponse.benefitType.name}  </h2>
        {
          transactionResponse ?
          <TransactionDetails
           classname = { 'transaction-modal'}
           details = { transactionResponse }
           history = {history}/> ///Get Tranasction ID
          :
          <center>
            <h3> Please wait while we are getting your transaction </h3>
            <CircularLoader show = {true} />
          </center>
        }
      </div>
    </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default TransactionModal
