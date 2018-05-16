import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../ub-components/'

import '../styles/transaction-modal.css'

class DentalLOAModalFragment extends Component {
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
        <h4> Transaction Status: {transactionResponse && transactionResponse.status.name}</h4>
        <h4> Account No: {transactionResponse && transactionResponse.details.AccountNo}</h4>
        <h4> Reference No: {transactionResponse && transactionResponse.details.ReferenceNumber} </h4> 
        <h4> Procedures: {transactionResponse && transactionResponse.Procedures.Name} </h4>
        <h4> Agreement: {transactionResponse && transactionResponse.FormAgreements}</h4>




        </div>
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default DentalLOAModalFragment
