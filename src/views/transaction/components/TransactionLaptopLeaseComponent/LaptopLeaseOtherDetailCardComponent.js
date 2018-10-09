import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class LaptopLeaseOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const { detailsLaptopLease } = this.props

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>

    </div>
    )
  }
}

LaptopLeaseOtherDetailCardComponent.propTypes = {
  detailsLaptopLease : PropTypes.object,
}

export default LaptopLeaseOtherDetailCardComponent
