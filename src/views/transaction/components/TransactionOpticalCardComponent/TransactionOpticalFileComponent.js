import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'
import './styles/transaction-optical-details-component.css'

class TransactionOpticalFileComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { details } = this.props
    return (
      <Card className = { 'transaction-card-details' }>
        <center><h4> Attachments </h4></center>
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

export default TransactionOpticalFileComponent
