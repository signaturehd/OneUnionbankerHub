import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class LaptopLeaseOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { detailsLaptopLease } = this.props

  console.log(detailsLaptopLease.LaptopLeaseDetails.Brand,
detailsLaptopLease.LaptopLeaseDetails.ColorFamily,
detailsLaptopLease.LaptopLeaseDetails.DeliveryType,
detailsLaptopLease.LaptopLeaseDetails.EstimatedCost,
detailsLaptopLease.LaptopLeaseDetails.GraphicsCard,
detailsLaptopLease.LaptopLeaseDetails.HardDriveCapacity,
detailsLaptopLease.LaptopLeaseDetails.Model,
detailsLaptopLease.LaptopLeaseDetails.OperatingSystem,
detailsLaptopLease.LaptopLeaseDetails.ProcessorType,
detailsLaptopLease.LaptopLeaseDetails.ScreenSize,
detailsLaptopLease.LaptopLeaseDetails.SystemMemory,
detailsLaptopLease.LaptopLeaseDetails.Term,
)

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <br/>
          <h2 className = { 'font-weight-bolder' }>Laptop Lease Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.Brand ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.Brand : 'NOT PROVIDED'} 
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Brand
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.ColorFamily ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.ColorFamily : 'NOT PROVIDED'} 
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Color Family
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.DeliveryType ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.DeliveryType : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Delivery Type
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.EstimatedCost ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.EstimatedCost : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Estimated Cost
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.GraphicsCard ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.GraphicsCard  : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Graphics Card
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.HardDriveCapacity ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.HardDriveCapacity : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Hard Drive Capacity
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.Model ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.Model : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Model
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.OperatingSystem ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.OperatingSystem  : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Operating System
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.ProcessorType ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.ProcessorType : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Processor Type
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.ScreenSize ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.ScreenSize : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Screen Size
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.SystemMemory ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.SystemMemory : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              System Memory
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             {detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.Term ? detailsLaptopLease.LaptopLeaseDetails && detailsLaptopLease.LaptopLeaseDetails.Term : 'NOT PROVIDED'}
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Term
            <br/>
            <br/>
            </h2>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

LaptopLeaseOtherDetailCardComponent.propTypes = {
  detailsLaptopLease : PropTypes.object,
}

export default LaptopLeaseOtherDetailCardComponent
