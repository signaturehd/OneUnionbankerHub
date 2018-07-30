import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import moment from 'moment'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import MedicalSchedulingOtherDetailCardComponent from './MedicalSchedulingOtherDetailCardComponent'

class MedicalSchedulingDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const {
      details,
      transactionsPerson,
      onClickAgreements,
     } = this.props

   const transactionID = details.transactionId
   const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
   const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
   const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details)
   const amountValue = TransactionPersonalFunction.checkedAmountFormat(details.details.MedicalScheduleDetails.Amount)

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
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2>
                &#8369; { amountValue }
              </h2>
              <br/>
              <br/>
            </div>
          </div>
          <MedicalSchedulingOtherDetailCardComponent
            detailsMedicalScheduling = { details && details.details }
          />
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

MedicalSchedulingDetailCardComponent.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  onClickAgreements : PropTypes.func,
}

export default MedicalSchedulingDetailCardComponent
