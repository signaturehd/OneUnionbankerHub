import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class MaternityOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { detailsMaternity } = this.props

  const amount = TransactionPersonalFunction.checkedAmount(detailsMaternity)
  const deliveryDate = TransactionPersonalFunction.checkedDeliveryDate(detailsMaternity)
  const orDate = TransactionPersonalFunction.checkedORDate(detailsMaternity)
  const orNumber = TransactionPersonalFunction.checkedorNumber(detailsMaternity)
  const deliveryType = TransactionPersonalFunction.checkedType(detailsMaternity)
  const recipient = TransactionPersonalFunction.checkedRecipient(detailsMaternity)

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Personal Data </h2>
          <br/>
        </div>


        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { recipient }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Recipient
              </h2>
              <br/>
            </div>
        </div>

        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               { deliveryType }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Delivery type
            </h2>
            <br/>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               { orDate }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Official Receipt Date
            </h2>
            <br/>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               { orNumber }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Official Receipt Number
            </h2>
            <br/>
          </div>
        </div>

        <br/>
      </div>
      <div>
        <br/>
        <br/>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               { deliveryDate }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Delivery date
            </h2>
            <br/>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               &#8369; { amount  }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Amount
            </h2>
            <br/>
            <br/>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    </div>
    )
  }
}

MaternityOtherDetailCardComponent.propTypes = {
  detailsOutpatient : PropTypes.object,
}

export default MaternityOtherDetailCardComponent
