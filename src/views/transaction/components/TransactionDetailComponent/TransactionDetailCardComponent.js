import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import './styles/transaction-details-component.css'

class TransactionDetailCardComponent extends Component {
    constructor(props) {
      super(props)
    }

    render() {
    const { transactionDetails } = this.props
    return (
      <Card>
        <h5 className = "title" > { transactionDetails && transactionDetails.dateFiled } </h5>
        <h6 className = { 'text-title-detail' }> DATE FILED </h6>

        <h5 className = "title"> { transactionDetails && transactionDetails.status.name } </h5>
        <h6 className = { 'text-title-detail' }> TRANSACTION STATUS </h6>

        <h5 className = "title"> { transactionDetails && transactionDetails.details.AccountNo } </h5>
        <h6 className = { 'text-title-detail' }> ACCOUNT NUMBER </h6>

        <h5 className = "title"> { transactionDetails && transactionDetails.details.ReferenceNumber } </h5>
        <h6 className = { 'text-title-detail' }> REFERENCE NUMBER </h6>
        {
          transactionDetails && transactionDetails &&
          transactionDetails.details.Procedures.map((amount) =>
            <h5 className = "title"> { amount && amount.Amount } </h5>
          )
        }
        <h6 className = { 'text-title-detail' }> AMOUNT </h6>

      </Card>
    )
  }
}

export default TransactionDetailCardComponent
