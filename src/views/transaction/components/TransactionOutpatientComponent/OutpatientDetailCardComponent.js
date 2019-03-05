import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import moment from 'moment'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import OutpatientOtherDetailCardComponent from './OutpatientOtherDetailCardComponent'

class OutpatientDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
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
   const releasingCenter = TransactionPersonalFunction.checkReleasingCenter(details.details)
   const amountValue = TransactionPersonalFunction.checkedAmountFormat(details.details.OutpatientDetails.Amount)

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
            <OutpatientOtherDetailCardComponent
              detailsOutpatient = { details && details.details }
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

OutpatientDetailCardComponent.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  onClickAttachments : PropTypes.func,
  onClickAgreements : PropTypes.func,
}

export default OutpatientDetailCardComponent
