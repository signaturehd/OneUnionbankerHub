import React, { Component } from 'react'
import PropTypes from 'prop-types'


class CarLeaseFormAgreementCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { details } = this.props
    return (
      <div className = { 'transaction-card-details' }>
        <h4 className = { 'details-bold' }>Form Agreements</h4>
        {
          details && details.details.FormAgreements.map ((formAgreement, key) =>
          <center key = { key }>
              <div dangerouslySetInnerHTML = {{ __html : formAgreement }}></div>
          </center>
          )
        }
      </div>
    )
  }
}

export default CarLeaseFormAgreementCardComponent
