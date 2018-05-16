import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../ub-components/'

import './styles/transaction-modal.css'

class TransactionModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      transactionID: []
    }
  }

 componentDidMount () {
    this.props.presenter()
 }

 render () {
    const { onClose, transactionResponse } = this.props
    // TODO map the transaction details here
    console.log(transactionResponse)
    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>

        <div>
         
         <h4> DateFiled : {transactionResponse && transactionResponse.dateFiled}</h4>
        <h4> Status: {transactionResponse && transactionResponse.status.name}</h4>
        <h4> Account No: {transactionResponse && transactionResponse.details.AccountNo}</h4>
        <h4> Reference No: {transactionResponse && transactionResponse.details.ReferenceNumber} </h4>
        <h4> Amount: {transactionResponse && transactionResponse.details.DesiredAmount}</h4>
        <h4> Purpose of Availment: {transactionResponse && transactionResponse.details.PurposeOfAvailment}</h4>
        <h4> Mode of Loan: {transactionResponse && transactionResponse.details.ModeOfLoan}</h4>
        <h4> Term: {transactionResponse && transactionResponse.details.Term.Name} </h4>
        <h4> Rate: {transactionResponse && transactionResponse.details.Term.Rate}</h4>
        <h4> Duration: {transactionResponse && transactionResponse.details.Term.Term}</h4>
        



        </div>
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default TransactionModal
