import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card, GenericButton } from '../../../../ub-components/'

import moment from 'moment'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'
import LaptopLeaseOtherDetailCardComponent from './LaptopLeaseOtherDetailCardComponent'

class LaptopLeaseDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const {
      details,
      onClickAgreements,
      onClickAttachments,
      claimLaptopLease
     } = this.props
     console.log(details.details)
     console.log(details.details.LaptopLeaseDetails.Brand)
     console.log(details.details.LaptopLeaseDetails.ColorFamily)
     console.log(details.details.LaptopLeaseDetails.DeliveryType)
     console.log(details.details.LaptopLeaseDetails.EstimatedCost)
     const transactionID = details.transactionId
     const dateFilled = TransactionPersonalFunction.checkedDateFilled(details)
     const acccountNumber = TransactionPersonalFunction.checkedAccountNumber(details.details)
     const referenceNumber = TransactionPersonalFunction.checkedReferenceNumber(details.details)
     const brand = TransactionPersonalFunction.checkedBrand(details.details)
     const colorFamily = TransactionPersonalFunction.checkedColorFamily(details.details)
     const estimatedCost = TransactionPersonalFunction.checkedEstimatedCost(details.details)
     const deliveryType = TransactionPersonalFunction.checkedDeliveryType(details.details) 
     const releasingCenter = TransactionPersonalFunction.checkedReleasingCenter(details.details)

    return (
      <div className = { 'transaction-component-details-form' }>
        <div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
            <div>
              <h2>
                { `Brand: ${brand}`}
              </h2>
              <br/>
            </div>
          </div>
           <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
            <div>
              <h2>
                { `Color Family: ${colorFamily}`}
              </h2>
              <br/>
            </div>
          </div>
           <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
            <div>
              <h2>
                { `Estimated Cost: ${estimatedCost}`}
              </h2>
              <br/>
            </div>
          </div>
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
                {`Reference Number: ${referenceNumber}`  }
              </h2>
              <br/>
            </div>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings global-icons-accountNumber' }></span>
            <div>
              <h2>
                { `Account Number: ${acccountNumber}` }
              </h2>
              <br/>
            </div>
          </div>
           <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
            <div>
              <h2>
                { `Releasing Center: ${releasingCenter}`}
              </h2>
              <br/>
            </div>
          </div>
           <div className = { 'transaction-icons-details-grid' }>
            <span className = { 'transaction-card-icon-settings global-icons-calendar ' }></span>
            <div>
              <h2>
                { `Delivery Type: ${deliveryType}`}
              </h2>
              <br/>
            </div>
          </div>
          <br/>
          <LaptopLeaseOtherDetailCardComponent
            detailsLaptopLease = { details.details }
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
          <div>
            <br/>
            <GenericButton
              className = { 'transaction-details-button' }
              text = { 'Claim' }
              onClick = { () => claimLaptopLease(transactionID) }
            />
            <br/>
          </div>
        </div>


      </div>
    )
  }
}

LaptopLeaseDetailCardComponent.propTypes = {
  details : PropTypes.object,
  transactionsPerson : PropTypes.array,
  onClickAttachments : PropTypes.func,
  onClickAgreements : PropTypes.func,
}

export default LaptopLeaseDetailCardComponent
