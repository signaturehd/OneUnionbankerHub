import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, MultipleFileUploader, GenericButton, CircularLoader } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class CarLeaseOtherDetailsComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      file: [{
        name : 'Equity Form'
      }],
    }
  }

  render () {
    const {
      details,
      detailsCarLease,
      transactionID,
      onConfirmation,
      setFileCarlease,
      fiileCarlease,
      onUploadAttachments,
      setEquityFileCarlease,
      equityAttachments,
      loader,
      onConfirmationReleaseFunc,
      onUploadAttachmentsFunc
    } = this.props

    const {
      file
    } = this.state

    const carBrand = TransactionPersonalFunction.checkedCarBrand(detailsCarLease)
    const carModel = TransactionPersonalFunction.checkedModel(detailsCarLease)
    const LeaseMode = TransactionPersonalFunction.checkedLeaseMode(detailsCarLease)
    const insurancePayment = TransactionPersonalFunction.checkedInsurancePayment(detailsCarLease)
    const Amount = TransactionPersonalFunction.checkedCarAmount(detailsCarLease)
    const EquityAmount = TransactionPersonalFunction.checkedEquityAmount(detailsCarLease)

  return (
    <div className = { 'transaction-with-attachments' }>
      {
        loader &&
        <CircularLoader
          show = { loader }
          validateLoading = { false }
        />
      }
      <div className = { 'transaction-component-otherdetails-form' }>
        <div>
          <div>
            <br/>
            <br/>
            <h2 className = { 'font-weight-bolder' }> Car Leases Details </h2>
            <br/>
          </div>
          <div className = { 'transaction-icons-details-grid' }>
            <span></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { carBrand }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Car Brand
              </h2>
              <br/>
            </div>
          </div>
          <div
             className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
               { carModel }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Car Model
              </h2>
              <br/>
            </div>
          </div>
          <div
             className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
               { LeaseMode }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
               LeaseMode
              </h2>
              <br/>
            </div>
          </div>
           <div>
             <div
                className = { 'transaction-icons-details-grid' }>
               <span className = { ' transaction-card-icon-settings' }></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   { detailsCarLease.CarDetails.Color.PrimaryColor }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Primary Color
                 </h2>
                 <br/>
               </div>
             </div>
             <div
                className = { 'transaction-icons-details-grid' }>
               <span className = { ' transaction-card-icon-settings' }></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   { detailsCarLease.CarDetails.Color.SecondaryColor }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Secondary Color
                 </h2>
                 <br/>
               </div>
             </div>
             <div
                className = { 'transaction-icons-details-grid' }>
               <span className = { ' transaction-card-icon-settings' }></span>
               <div>
                 <h2 className = { 'font-weight-ligter' }>
                   { detailsCarLease.CarDetails.Color.ChosenColor }
                 </h2>
                 <h2 className = { 'unionbank-color font-size-12px' }>
                   Chosen Color
                 </h2>
                 <br/>
               </div>
             </div>
           </div>
         </div>
         <div>
          <div>
            <br/>
            <br/>
            <h2 className = { 'font-weight-bolder' }></h2>
              Cost
            <br/>
            <br/>
          </div>
          <div
             className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { Amount }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Amount
               <br/>
               <br/>
              </h2>
            </div>
          </div>
          <div
             className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { EquityAmount }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Equity Amount
               <br/>
               <br/>
              </h2>
            </div>
          </div>
          <div
             className = { 'transaction-icons-details-grid' }>
            <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { insurancePayment }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Insurance Payment
               <br/>
               <br/>
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <div>

              {
                details.status.id === 18 &&
                <div>
                  <GenericButton
                    text = { 'I Confirm' }
                    onClick = { () => onConfirmationReleaseFunc(transactionID) }
                    />
                </div>
              }
            </div>
            <div>
              <br/>
              {
                details.status.id === 13 &&
                <div className = { 'grid-global' }>
                  <div>
                    <GenericButton
                      onClick = { () => onConfirmation(transactionID, 1) }
                      text = { 'I Confirm' }
                      />
                  </div>
                  <div>
                    <GenericButton
                      onClick = { () => onConfirmation(transactionID, 0) }
                      text = { 'Cancel' }
                      />
                  </div>
                </div>
              }
              {
                details.status.id === 14 &&

                <div>
                  <center>
                    {
                    equityAttachments &&  equityAttachments.length !== 0 &&

                      <MultipleFileUploader
                        fileArray = { file }
                        placeholder = { 'Equity Attachments' }
                        setFile = { (file) => {
                          this.setState({ file })
                        } }
                        />
                    }
                    <GenericButton
                      onClick = { () => onUploadAttachments(transactionID, file) }
                      text = { 'I Confirm' }
                      />
                  </center>
                </div>
              }
            </div>
          </div>
        </div>
        <br/>
      </div>
    </div>
    )
  }
}

CarLeaseOtherDetailsComponent.propTypes = {
  details: PropTypes.func,
  detailsCarLease : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  onConfirmation : PropTypes.func,
  onUploadAttachments : PropTypes.func,
  onConfirmationReleaseFunc : PropTypes.func,
  setFileCarlease : PropTypes.func
}

export default CarLeaseOtherDetailsComponent
