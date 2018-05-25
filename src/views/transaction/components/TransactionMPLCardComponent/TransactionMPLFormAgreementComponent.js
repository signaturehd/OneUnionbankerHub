import React, {Component} from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../../ub-components/'

class TransactionMPLFormAgreementComponent extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { details } = this.props
    console.log(details.FormAgreements)
    return (
      <Card className = { 'transaction-card-details' }>
        <h4>Form Agreements</h4>
        {
          details &&
          details.FormAgreements.map ((formAgreement, key) =>
          <center key = { key }>
              <div dangerouslySetInnerHTML = {{ __html : formAgreement.Form }}></div>
          </center>
          )
        }
      </Card>
    )
  }
}

export default TransactionMPLFormAgreementComponent
