import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

import VaccineRequisitionDetailCardComponent from './VaccineRequisitionDetailCardComponent'

class VaccineRequisitionDetailComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    details,
    onClickAgreements,
    viewTransactions
  } = this.props

  const transactionID = details.transactionId
  const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
  const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details.AccountNo)
  const releasingCenter = TransactionPersonalFunction.checkReleasingCenter(details.details)
  const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details.ReferenceNumber)

  return (
    <div  className = { 'transaction-component-details-form' }>
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
          acccountNumber &&
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-accountNumber' }></span>
            <div>
              <h2>
                { acccountNumber }
              </h2>
              <br/>
            </div>
          </div>
        }
        {
          releasingCenter &&
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-accountNumber' }></span>
            <div>
              <h2>
                { releasingCenter }
              </h2>
              <br/>
            </div>
          </div>
        }
        <br/>
        {
          details &&
          details.details.VaccinationDetails &&
          <VaccineRequisitionDetailCardComponent
            detailsVaccine = { details && details.details.VaccinationDetails }
          />
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
          <br/>
          <div
            className = { 'transaction-grid-button' }
          >

            <h3>Recipients Details</h3>
            {
              details &&
              details.details &&
              details.details.Recipients.map((recipient, key) => (
                <div>
                  <small>{recipient.Name}</small>
                  <GenericButton
                    className = { 'transaction-details-button full-width-button' }
                    text = { `${recipient.ApplicationMode} - View Details` }
                    onClick = { () => viewTransactions(recipient.VaccineDetails) }
                  />
                  <br/>
                </div>
              ))
            }
          </div>
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
