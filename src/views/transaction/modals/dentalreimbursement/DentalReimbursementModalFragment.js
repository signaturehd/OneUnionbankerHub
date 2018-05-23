import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import TransactionDetailCardComponent from '../../components/TransactionDetailComponent/TransactionDetailCardComponent'
import TransactionFileCardComponent from '../../components/TransactionDetailComponent/TransactionFileCardComponent'
import TransactionFormAgreementCardComponent from '../../components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class DentalReimbursementModalFragment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { transactionDetails } = this.props

    return (

    <div className = { 'transaction-container' }>
      <div>
      <TransactionDetailCardComponent transactionDetails={ transactionDetails } />

      <TransactionFileCardComponent transactionDetails = { transactionDetails.details } />

    </div>

    <div className = { 'transaction-container' }>

      <TransactionFormAgreementCardComponent transactionDetails = { transactionDetails.details } />

    </div>
  </div>
    )
  }
}
export default DentalReimbursementModalFragment
