import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import TransactionPersonalController from '../../controller/TransactionPersonalController'

import moment from 'moment'

import '../styles/transactionCardComponent.css'

class TransactionDetailCardComponent extends Component {
    constructor (props) {
      super(props)
    }

    render () {
    const { details } = this.props
    const transactionID = details.transactionId
    const dateFilled = new TransactionPersonalController().checkedDateFilled(details)
    const acccountNumber = new TransactionPersonalController().checkedAccountNumber(details.details)
    const referenceNumber = new TransactionPersonalController().checkedReferenceNumber(details.details)
    const patient = new TransactionPersonalController().checkedPatient(details.details)

    return (
      <div className = { 'transaction-component-details-form' }>
        <div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
            <div>
              <h2>
                { dateFilled }
              </h2>
              <h4 className = { 'font-size-14px unionbank-color' }>
                Date Filled
              </h4>
              <br/>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-referenceNumber' }></span>
            <div>
              <h2>
                { referenceNumber }
              </h2>
              <h4  className = { 'font-size-14px unionbank-color' }>
                Reference Number
              </h4>
              <br/>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-accountNumber' }></span>
            <div>
              <h2>
                { acccountNumber }
              </h2>
              <h4  className = { 'font-size-14px unionbank-color' }>
                Account Number
              </h4>
              <br/>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-patient-name' }></span>
            <div>
              <h2>
                { patient }
              </h2>
              <h4  className = { 'font-size-14px unionbank-color' }>
                Patient Name
              </h4>
              <br/>
            </div>
          </div>
          <br/>
        </div>
        <div>
          <h4>Procedure</h4>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-procedure' }></span>
            {
              details && details.details.Procedures.map((procedure, key) =>
                <div
                  key>
                  <h2>Name : { procedure.Name }</h2>
                  <h2
                    className = { 'unionbank-color font-size-14px' }>
                    Amount : &#x20b1;{ procedure.Amount ? procedure.Amount : '(Not Yet Provided)' }
                  </h2>
                </div>
              )
            }
        </div>
      </div>
    </div>
    )
  }
}

export default TransactionDetailCardComponent
