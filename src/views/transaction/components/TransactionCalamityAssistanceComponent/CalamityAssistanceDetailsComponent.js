import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import CalamityOtherDetails from './CalamityOtherDetailsComponent'

class CalamityAssistanceDetailsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      details,
      transactionsPerson,
      onClickAttachments,
      onClickAgreements,
     } = this.props

    const transactionID = details.transactionId
    const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
    const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
    const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details)
    const calamityType = TransactionPersonalFunction.checkedCalamityType(details.details.CalamityDetails)

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
              <br/>
            </div>
          </div>
          <CalamityOtherDetails
            detailsCalamity = { details && details.details }
            detailsCalamityDetails = { details && details.details.CalamityDetails }
          />
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
                  onClick = { () => onClickAttachments(true) }
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
              onClick = { () => onClickAgreements(true) }
            />
            <br/>
          </div>
        </div>
      </div>
    )
  }
}

CalamityAssistanceDetailsComponent.propTypes = {
  onClickAgreements : PropTypes.func,
  onClickAttachments : PropTypes.func,
  details : PropTypes.object,
  transactionsPerson : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

export default CalamityAssistanceDetailsComponent
