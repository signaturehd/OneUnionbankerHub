import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import './styles/transaction-details-component.css'

class TransactionDetailCardComponent extends Component {
    constructor(props) {
      super(props)
    }

    render() {
    const { details } = this.props
    return (
      <Card className = { 'transaction-card-details-form' }>
        <div>
          <h2 className = { 'transaction-detail' }> Date Filed: </h2>
          <h2 className = { 'transaction-detail' }> Reference Number: </h2>
          <h2 className = { 'transaction-detail' }> Transaction Status: </h2>
          <h2 className = { 'transaction-detail' }> Account Number: </h2>
          <h2 className = { 'transaction-detail' }> Patient Name: </h2>
        </div>
        <div>
          <h2 className = { 'transaction-detail' }> { details && details.dateFiled } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.details.ReferenceNumber }</h2>
          <h2 className = { 'transaction-detail' }> { details && details.status.name } </h2>
          <h2 className = { 'transaction-detail' }> { details && details.AccountNo } </h2>
          <h2 className = { 'transaction-detail' }> Name of Patient </h2>
        </div>
      </Card>
    )
  }
}

export default TransactionDetailCardComponent
