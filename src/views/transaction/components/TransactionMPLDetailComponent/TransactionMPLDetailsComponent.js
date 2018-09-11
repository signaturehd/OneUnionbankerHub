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
  const {
    details,
    onClickAttachmentsMPL,
    onClickAgreementsMPL
  } = this.props

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
      <div className = { 'transaction-attachments-agreements-grid' }>
        <div>
          <br/>
            {
              details &&
              details.details &&
              details.details.Attachments ?

              <GenericButton
                className = { 'transaction-details-button' }
                text = { 'View Attachments' }
                onClick = { () => onClickAttachmentsMPL(true) }
              /> :
              <div></div>
            }
            <br/>
        </div>
        <div>
          <br/>
          <GenericButton
            className = { 'transaction-details-button' }
            text = { 'View Agreements' }
            onClick = { () => onClickAgreementsMPL(true) }
          />
          <br/>
        </div>
      </div>
    </div>
    )
  }
}

TransactionMPLDetailComponent.propTypes = {
  details : PropTypes.object,
  onClickAttachmentsMPL : PropTypes.func,
  onClickAgreementsMPL : PropTypes.func
}

export default TransactionMPLDetailComponent
