import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components'

import moment from 'moment'

class BereavementDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render() {
    const { details, transactionsPerson } = this.props
    const transactionID = details.transactionId
    return (
      <div className = { 'transaction-card-details-form' }>
        <div>
          <h2 className = { 'transaction-detail details-bold' }> Date Filed: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Reference Number: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Transaction Status: </h2>
          { details && details.details.AccountNo && <h2 className = { 'transaction-detail details-bold' }> Account Number: </h2> }
          <h2 className = { 'transaction-detail details-bold' }> Date of Death: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Date of Wake: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Internment Date: </h2>
          { details && details.details.BereavementDetails.Dependent.Name && <h2 className = { 'transaction-detail details-bold' }> Dependent Name: </h2> }
          { details && details.details.BereavementDetails.Amount && <h2 className = { 'transaction-detail details-bold' }> Amount: </h2> }
        </div>
        <div>
          <h2 className = { 'transaction-detail' }> { details && moment(details.dateFiled).format('MMM DD, YYYY') } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.ReferenceNumber } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.status.name } </h2>
          <h2 className = { 'transaction-detail' }> { details && moment(details.details.BereavementDetails.DateOfDeath).format('MMM DD, YYYY') } </h2>
          <h2 className = { 'transaction-detail' }> { details && moment(details.details.BereavementDetails.DateOfWake).format('MMM DD, YYYY') } </h2>
          <h2 className = { 'transaction-detail' }> { details && moment(details.details.BereavementDetails.InternmentDate).format('MMM DD, YYYY') } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.AccountNo } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.BereavementDetails.Dependent.Name } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.BereavementDetails.Amount } </h2>
        </div>
      </div>
    )
  }
}

export default BereavementDetailCardComponent
