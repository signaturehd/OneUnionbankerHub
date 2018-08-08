import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class MaternityOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { detailsMaternity } = this.props

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Personal Data </h2>
          <br/>
        </div>
        <br/>
      </div>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Certification </h2>
          <br/>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>

            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Procedure
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

MaternityOtherDetailCardComponent.propTypes = {
  detailsOutpatient : PropTypes.object,
}

export default MaternityOtherDetailCardComponent
