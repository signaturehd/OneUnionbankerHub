import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import TransactionOpticalDetailsComponent from '../../components/TransactionOpticalCardComponent/TransactionOpticalDetailsComponent'
import TransactionOpticalFileComponent from '../../components/TransactionOpticalCardComponent/TransactionOpticalFileComponent'
import TransactionFormAgreementCardComponent from '../../components/TransactionDetailComponent/TransactionFormAgreementCardComponent'

class OpticalModalFragment extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { transactionDetails } = this.props

    return (
    <div className = { 'transaction-container' }>
      <div>
      <TransactionOpticalDetailsComponent transactionDetails={ transactionDetails } />
      <TransactionOpticalFileComponent transactionDetails = { transactionDetails.details } />
    </div>
    <div className = { '_transaction-container' }>
      <TransactionFormAgreementCardComponent form= {{
          formAgreements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
        }} />
    </div>
  </div>
    )
  }
}
export default OpticalModalFragment
