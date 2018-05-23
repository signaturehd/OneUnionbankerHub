import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './styles/transaction-details-component.css'

class TransactionFormAgreementCardComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { transactionDetails } = this.props
    return (
      <Card >
        {
          transactionDetails &&
          transactionDetails.FormAgreements.map((form, key) =>
            <div className = { 'transaction-form-agreement' } key = { key } dangerouslySetInnerHTML = {{ __html : form }}></div>
          )
        }
      </Card>
    )
  }
}

export default TransactionFormAgreementCardComponent
