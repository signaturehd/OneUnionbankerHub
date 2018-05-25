import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

import './styles/transaction-details-component.css'

class TransactionFormAgreementCardComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { details } = this.props
    return (
      <Card className = { 'transaction-card-details' }>
        <h4>Form Agreements</h4>
        {
          details && details.details.FormAgreements.map ((formAgreement, key) =>
          <center key = { key }>
              <div dangerouslySetInnerHTML = {{ __html : formAgreement }}></div>
          </center>
          )
        }
      </Card>
    )
  }
}

export default TransactionFormAgreementCardComponent
