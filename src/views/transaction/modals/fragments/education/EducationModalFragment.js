import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from '../../../ub-components/'

import '../styles/transaction-modal.css'

class EducationModalFragment extends Component {
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
          <h1>Transaction Details</h1>
          :
          <center>
            <h3> Please wait while we are getting your transaction </h3>
            <CircularLoader show = {true} />
          </center>

        }
       

        <div>
        <h4> DateFiled : {transactionResponse && transactionResponse.dateFiled}</h4>
        <h4> Status: {transactionResponse && transactionResponse.status.name}</h4>
        <h4> Account No: {transactionResponse && transactionResponse.details.AccountNo}</h4>
        <h4> Reference No: {transactionResponse && transactionResponse.details.ReferenceNumber} </h4>
        <h4> Tuition Fee: {transactionResponse && transactionResponse.details.TuitionFee}</h4>
        <h4> Registration Fee: {transactionResponse && transactionResponse.details.RegistrationFee}</h4>
        <h4> College: {transactionResponse && transactionResponse.details.College}</h4>
        <h4> Course: {transactionResponse && transactionResponse.details.Course} </h4>
        <h4> Academic Year: {transactionResponse && transactionResponse.details.AcademicYear}</h4>
        <h4> Semester: {transactionResponse && transactionResponse.details.Semester}</h4>
        <h4> Grade : {transactionResponse && transactionResponse.details.Grade}</h4>
        <h4> Total Reimbursable Amount : {transactionResponse && transactionResponse.details.TotalReimbursableAmount}</h4>
        <h4>Attachments : {transactionResponse && transactionResponse.Attachments}</h4>
        <h4>Notice : {transactionResponse && transactionResponse.FormAgreements}</h4>






        </div>
      </Modal>
    )
  }
}

TransactionModal.propTypes = {
  onClose: PropTypes.func,
}

export default EducationModalFragment
