import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import '../styles/fundsStyle.css'

import PensionDetailsComponent from '../components/PensionDetailsComponent'
import PensionFundsPaymentHistoryComponent from '../components/PensionFundsPaymentHistoryComponent'

import { format } from '../../../utils/numberUtils'

class PensionDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pensionFundsData
    } = this.props

    return (
      <div className = { 'funds-grid-content' }>
        <div>
          <h4 className = { 'font-weight-bold font-size-30px letter-spacing-1' }>Retirement Pension Period</h4>
          <br/>
          <h4 className = { 'font-size-16px font-weight-ligther letter-spacing-1' }>Secure your future.</h4>
          <br/>
          <div className = { 'funds-grid-content-detail' }>
            <PensionDetailsComponent
              pensionFundsData= { pensionFundsData }/>
            <div></div>
          </div>
        </div>
        <div>
          <PensionFundsPaymentHistoryComponent
            pensionFundsData = { pensionFundsData }/>
        </div>
      </div>
    )
  }
}

export default PensionDetailsFragment
