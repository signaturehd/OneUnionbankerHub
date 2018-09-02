import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import moment from 'moment'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import BereavementOtherDetailCardComponent from './BereavementOtherDetailCardComponent'

class BereavementDetailCardComponent extends Component {
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
   const amountValue = TransactionPersonalFunction.checkedAmountFormat(details.details.BereavementDetails.Amount)

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
          <br/>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2>
              Amount : &#8369; { amountValue }
              </h2>
              <br/>
              <br/>
            </div>
          </div>
          <BereavementOtherDetailCardComponent
            detailsBereavement = { details && details.details }
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

BereavementDetailCardComponent.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  onClickAttachments : PropTypes.func,
  onClickAgreements : PropTypes.func,
}

export default BereavementDetailCardComponent
