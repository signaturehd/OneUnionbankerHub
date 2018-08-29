import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class OutpatientOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { detailsOutpatient } = this.props

  const recipient = detailsOutpatient.OutpatientDetails.Recipient
  const procedure = detailsOutpatient.OutpatientDetails

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Recipient Details </h2>
          <br/>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { recipient.Name }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              { recipient.Relationship }
            </h2>
            <br/>
            <br/>
          </div>
        </div>
        <br/>
      </div>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Procedure Details </h2>
          <br/>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              {
                procedure.Procedures.map((resp, key) =>
                  <div className = { 'grid-global-rows' }>
                    <h4 className = { 'font-size-14px' }>Name : { resp.Name }</h4>
                    <h4 className = { 'font-size-14px' }>Amount : &#8369; { format(resp.Amount) }</h4>
                    <br/>
                  </div>
                )
              }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Procedures
            </h2>
            <br/>
            <br/>
          </div>
        </div>
        <br/>
        <br/>
      </div>
    </div>
    )
  }
}

OutpatientOtherDetailCardComponent.propTypes = {
  detailsOutpatient : PropTypes.object,
}

export default OutpatientOtherDetailCardComponent
