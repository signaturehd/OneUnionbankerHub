import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

class TransactionMPLPurposeComponent extends Component {
    constructor (props) {
      super(props)
    }

    render () {
    const { details } = this.props
    return (
      <div className = { 'transaction-card-details-form' }>
      <div>
        <h2 className = { 'transaction-detail details-bold' }> Purpose of Availement: </h2>
        <h2 className = { 'transaction-detail details-bold' }> Mode of Loan: </h2>
        <h2 className = { 'transaction-detail details-bold' }> Amortization: </h2>
        <h2 className = { 'transaction-detail details-bold' }> Desired Amount: </h2>
        <h2 className = { 'transaction-detail details-bold' }> Name: </h2>
        <h2 className = { 'transaction-detail details-bold' }> Credit Ratio: </h2>
        <h2 className = { 'transaction-detail details-bold' }> Term: </h2>
      </div>
      <div>
        <h2 className = { 'transaction-detail' }> { details && details.details.PurposeOfAvailment } </h2>
        <h2 className = { 'transaction-detail' }> { details && details.details.ModeOfLoan }</h2>
        <h2 className = { 'transaction-detail' }> &#x20b1; { details && details.details.Amortization } </h2>
        <h2 className = { 'transaction-detail' }> &#x20b1; { details && details.details.DesiredAmount } </h2>
        <h2 className = { 'transaction-detail' }>
        { details && details.details.Term.Name }
        </h2>
        <h2 className = { 'transaction-detail' }>
        { details && details.details.Term.Rate }
        </h2>
        <h2 className = { 'transaction-detail' }>
        { details && details.details.Term.Term }
        </h2>
        </div>
      </div>
    )
  }
}

export default TransactionMPLPurposeComponent
