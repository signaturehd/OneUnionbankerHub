import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class TransactionMPLPurposeComponent extends Component {
    constructor (props) {
      super(props)
    }

    render () {
    const { details } = this.props

    const purposeOfAvailement = TransactionPersonalFunction.checkedPurposeOfAvailement(details.details)
    const modeOfLoan = TransactionPersonalFunction.checkedModeOfLoan(details.details)
    const amortization = TransactionPersonalFunction.checkedAmortization(details.details)
    const desiredAmount = TransactionPersonalFunction.checkedDesiredAmount(details.details)
    const name = TransactionPersonalFunction.checkPurposeName(details.details)
    const creditRatio = TransactionPersonalFunction.checkedCreditRatio(details.details)
    const termTerm = TransactionPersonalFunction.checkedTerm(details.details)
    const rate = TransactionPersonalFunction.checkedRate(details.details)

    return (
      <div className = { 'transaction-component-details-form' }>
        <div>
          <div>
            <h2 className = { 'font-weight-bolder' }> Loan Details </h2>
            <br/>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings' }></span>
            <div>
              <h2>
                { purposeOfAvailement }
              </h2>
              <h2 className = { 'unionbank-color font-size-14px' }>
                { modeOfLoan }
                <br/>
                <br/>
              </h2>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings' }></span>
            <div>
              <h2>
                { name }
              </h2>
              <h2 className = { 'unionbank-color font-size-14px' }>
                <br/>
                <br/>
              </h2>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings' }></span>
            <div>
              <h2>
                   &#8369;  { desiredAmount }
              </h2>
              <h2 className = { 'unionbank-color font-size-14px' }>
                Amount
              </h2>
              <br/>
            </div>
          </div>
          <div>
            <h2 className = { 'font-weight-bolder' }> Term of Payment </h2>
            <br/>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2>
                { termTerm } months
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Duration
                <br/>
                <br/>
              </h2>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2>
                { rate }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Term Rate
                <br/>
                <br/>
              </h2>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2>
                { creditRatio } %
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Credit Ratio
                <br/>
                <br/>
              </h2>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2>
                 &#8369; { amortization }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Amortization
                <br/>
                <br/>
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionMPLPurposeComponent
