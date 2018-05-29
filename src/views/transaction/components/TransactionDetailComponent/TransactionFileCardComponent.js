import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

class TransactionFileCardComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { details } = this.props
    return (
      <Card className = { 'transaction-card-details' }>
        <center><h4 className = { 'details-bold' }> Attachments </h4></center>
          <div className = { 'transaction-attachments-container' }>
            <img
              className = { 'transaction-attachments _img-ub-logo' }
              src={ require('../../../../images/union-logo.png') }/>
            <img
              className = { 'transaction-attachments _img-ub-logo' }
              src={ require('../../../../images/union-logo.png') }/>
          </div>
      </Card>
    )
  }
}

export default TransactionFileCardComponent