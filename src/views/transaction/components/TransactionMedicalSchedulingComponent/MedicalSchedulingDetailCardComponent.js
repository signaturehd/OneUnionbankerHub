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
   const releasingCenter = TransactionPersonalFunction.checkReleasingCenter(details.details)

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
          <br/>
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
