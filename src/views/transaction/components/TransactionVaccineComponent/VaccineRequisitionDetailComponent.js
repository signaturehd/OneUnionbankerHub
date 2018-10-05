import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class VaccineRequisitionDetailComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    details,
    onClickAgreements
  } = this.props

  const transactionID = details.transactionId
  const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
  const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
  const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details)

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
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
        {
          acccountNumber !== '(Not Yet Provided)' &&
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-accountNumber' }></span>
            <div>
              <h2>
                { acccountNumber }
              </h2>
            </div>
          </div>
        }
        <br/>
      </div>
      <div className = { 'transaction-attachments-agreements-grid' }>
        <div>
          <br/>
          <GenericButton
            className = { 'transaction-details-button' }
            text = { 'View Agreements' }
            onClick = { () => onClickAgreements(true) }
          />
          <br/>
        </div>
      </div>
    </div>
    )
  }
}

VaccineRequisitionDetailComponent.propTypes = {
  details : PropTypes.object,
}

export default VaccineRequisitionDetailComponent
