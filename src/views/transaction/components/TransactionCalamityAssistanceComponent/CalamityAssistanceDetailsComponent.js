import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import moment from 'moment'

class CalamityAssistanceDetailsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details, transactionsPerson } = this.props
    const transactionID = details.transactionId
    return (
      <div className = { 'transaction-card-details-form' }>
        <div>
          <h2 className = { 'transaction-detail details-bold' }> Date Filed: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Reference Number: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Transaction Status: </h2>
          { details && details.details.AccountNo &&  <h2 className = { 'transaction-detail details-bold' }> Account Number: </h2> }
          { details && details.details.CalamityDetails.CalamityType.Calamity &&  <h2 className = { 'transaction-detail details-bold' }> Calamity: </h2> }
          { details && details.details.CalamityDetails.CalamityType.DateOfOccurrence &&  <h2 className = { 'transaction-detail details-bold' }> Date Of Occurance: </h2> }
        </div>
        <div>
          <h2 className = { 'transaction-detail' }> { details && moment(details.dateFiled).format('MMMM DD, YYYY') } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.ReferenceNumber }</h2>
          <h2 className = { 'transaction-detail' }> { details && details.status.name } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.AccountNo } </h2>
          <h2 className = { 'transaction-detail' }> { details && moment(details.details.CalamityDetails.DateOfOccurrence).format('MMMM DD, YYYY') } </h2>
        </div>
        <div>
          <h2>Damage Property</h2>
          {
            details &&
            details.details.CalamityDetails &&
            details.details.CalamityDetails.DamageProperty &&
            details.details.CalamityDetails.DamageProperty.map((damage, key) =>
              <div className = {'transaction-card-details-form'}>
                <div>
                  <h3>Acquisition Value</h3>
                  <h3>Description</h3>
                  <h3>Property Name</h3>
                  <h3>Property Type</h3>
                  <h3>Repair Cost</h3>
                </div>
                <div>
                  <h3>{damage.AcquisitionValue}</h3>
                  <h3>{damage.Description}</h3>
                  <h3>{damage.PropertyName}</h3>
                  <h3>{damage.PropertyType}</h3>
                  <h3>{damage.RepairCost}</h3>
                </div>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

export default CalamityAssistanceDetailsComponent
