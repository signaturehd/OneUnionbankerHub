import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import TransactionMPLPurposeComponent from './TransactionMPLPurposeComponent'

import moment from 'moment'

class TransactionMPLDetailComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { details, onClickAttachments, onClickAgreements } = this.props

  const transactionID = details.transactionId
  const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
  const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
  const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details)
  const patient = TransactionPersonalFunction.checkedPatient(details.details)

  return (
    <div className = { 'transaction-component-details-form' }>
      <div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
          <div>
            <h2>
              { dateFilled }
            </h2>
            <br/>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-referenceNumber' }></span>
          <div>
            <h2>
              { referenceNumber }
            </h2>
            <br/>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-accountNumber' }></span>
          <div>
            <h2>
              { acccountNumber }
            </h2>
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
            </h4>
            <br/>
          </div>
        </div>
        {
          details &&
          details.details &&
          details.details.Procedures ?
            <TransactionMPLPurposeComponent
              procedure = { details && details.details }
            />
            :
            <div></div>
        }
        <br/>
      </div>
      <div>
        <br/>
        <br/>
          {
            details &&
            details.details &&
            details.details.Attachments ?

            <GenericButton className = { 'transaction-details-button' }
              text = { 'View Attachments' }
              onClick = { () => onClickAttachments(true) }
            /> :
            <div></div>
          }
        <br/>
        <br/>
        <GenericButton className = { 'transaction-details-button' }
          text = { 'View Agreements' }
          onClick = { () => onClickAgreements(true) }
        />
        <br/>
      </div>
    </div>
    )
  }
}

export default TransactionMPLDetailComponent
