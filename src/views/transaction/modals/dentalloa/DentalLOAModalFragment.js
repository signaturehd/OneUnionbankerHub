import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import TransactionDetailCardComponent from '../../components/TransactionDetailComponent/TransactionDetailCardComponent'
import TransactionFileCardComponent from '../../components/TransactionDetailComponent/TransactionFileCardComponent'
import TransactionFormAgreementCardComponent from '../../components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class DentalLOAModalFragment extends Component {
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

      <TransactionFormAgreementCardComponent form= {{
          formAgreements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        }} />

    </div>
  </div>
    )
  }
}
export default DentalLOAModalFragment
