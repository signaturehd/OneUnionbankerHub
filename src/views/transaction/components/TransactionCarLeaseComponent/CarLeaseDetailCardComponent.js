import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import moment from 'moment'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import CarLeaseOtherDetailsComponent from './CarLeaseOtherDetailsComponent'

class CarLeaseDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const {
      details,
      transactionsPerson,
      onClickAttachments,
      onClickAgreements,
      onConfirmationFunc,
      setFileCarlease,
      setEquityFileCarlease,
      equityAttachments,
      fileCarLease,
      attachments,
      onUploadAttachments,
      loader,
      onConfirmationReleaseFunc,
      requiredCarleaseAttachments
     } = this.props

   const transactionID = details.transactionId
   const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
   const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
   const releasingCenter = TransactionPersonalFunction.checkReleasingCenter(details.details)
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
          <CarLeaseOtherDetailsComponent
            attachments = { attachments }
            details = { details }
            loader = { loader }
            onUploadAttachments = { (id, file) => onUploadAttachments(id, file) }
            fileCarlease = { fileCarLease }
            transactionID = { transactionID }
            setEquityFileCarlease = { (file) => setEquityFileCarlease(file) }
            equityAttachments = { equityAttachments }
            onConfirmationReleaseFunc = { (resp) => onConfirmationReleaseFunc(resp)}
            setFileCarlease = { (resp) => setFileCarlease(resp) }
            onConfirmation = { (id, status) => onConfirmationFunc(id, status) }
            detailsCarLease = { details && details.details }
            requiredCarleaseAttachments = { requiredCarleaseAttachments }
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

CarLeaseDetailCardComponent.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  fileCarLease : PropTypes.array,
  onClickAttachments : PropTypes.func,
  onClickAgreements : PropTypes.func,
  onConfirmationFunc : PropTypes.func,
}

export default CarLeaseDetailCardComponent
