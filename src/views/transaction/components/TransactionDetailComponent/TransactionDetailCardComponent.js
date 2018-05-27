import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

class TransactionDetailCardComponent extends Component {
    constructor(props) {
      super(props)
    }

    render() {
    const { details, transactionsPerson } = this.props
    let transactionID = details.transactionId
    
    return (
      <Card className = { 'transaction-card-details-form' }>
        <div>
          <h2 className = { 'transaction-detail details-bold' }> Date Filed: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Reference Number: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Transaction Status: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Account Number: </h2>
          <h2 className = { 'transaction-detail details-bold' }> Patient Name: </h2>
        </div>
        <div>
          <h2 className = { 'transaction-detail' }> { details && details.dateFiled } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.ReferenceNumber }</h2>
          <h2 className = { 'transaction-detail' }> { details && details.status.name } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.AccountNo } </h2>
            {
              transactionsPerson && transactionsPerson.map(( person ) =>
                  transactionID === person.id &&
                  <h2 key = {person.id} > { person.fullName } </h2>
              )
            }
        </div>
      </Card>
    )
  }
}

export default TransactionDetailCardComponent
