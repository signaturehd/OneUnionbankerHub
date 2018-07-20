import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import moment from 'moment'

class TransactionDetailCardComponent extends Component {
    constructor (props) {
      super(props)
    }

    render () {
    const { details, transactionsPerson } = this.props
    const transactionID = details.transactionId

    return (
      <div>
        <div className = { 'transaction-card-details-form' }>
          <div>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div>
            <div>
              <h2> Date Filed: </h2>
            </div>
            <div>
              <h2> Reference Number: </h2>
            </div>
            <div>
              <h2> Transaction Status: </h2>
            </div>
            <div>
              { details && details.details.AccountNo &&  <h2 className = { 'transaction-detail details-bold' }> Account Number: </h2> }
            </div>
            <div>
              <h2> Patient Name: </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TransactionDetailCardComponent
