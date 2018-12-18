import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton, MultipleAttachments } from '../../../../ub-components/'

import moment from 'moment'
import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import EventsBudgetOtherDetailCardComponent from './EventsBudgetOtherDetailCardComponent'

import store from '../../../../store'
import { NotifyActions } from '../../../../actions/'

class EventsBudgetDetailCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attachmentArray: [{
        name : 'Events Budget Attachments'
      }],
      showAttachment : true
    }
    this.addAttachmentsFunc = this.addAttachmentsFunc.bind(this)
  }

  addAttachmentsFunc (attachment) {
    const attachmentTemp = [...attachment]
    attachmentTemp.push({
      name : 'Events Budget Attachments'
    })
    this.setState({ attachmentArray : attachmentTemp })
  }

  render() {
    const {
      details,
      onClickAgreements,
      onClickAttachments,
      onSubmitEventsReceiptFunc
     } = this.props

     const {
       attachmentArray
     } = this.state

     const transactionID = details.transactionId
     const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
     const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
     const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details)

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
          <br/>
          <EventsBudgetOtherDetailCardComponent
            details = { details && details.details }
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
        <div>

        {
          details &&
          details.status &&
          details.status.id === 30 &&
          <div>
            <div className = { 'text-align-right' }>
              <GenericButton
                className = { 'cursor-pointer profile-button-small global-button' }
                text = { 'Add Attachments' }
                onClick = { () => this.addAttachmentsFunc(attachmentArray) }
                />
            </div>
            <MultipleAttachments
              placeholder = { '' }
              fileArray = { attachmentArray }
              setFile = { (attachmentArray) =>
                  this.setState({ attachmentArray })
              }
            />

            <center>
               <GenericButton
                 onClick = { () => onSubmitEventsReceiptFunc(transactionID, attachmentArray) }
                 text = { 'Submit' }
               />
             <br/>
             <br/>
           </center>
          </div>
        }
      </div>
    </div>
    )
  }
}

EventsBudgetDetailCardComponent.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  onClickAttachments : PropTypes.func,
  onClickAgreements : PropTypes.func,
}

export default EventsBudgetDetailCardComponent
