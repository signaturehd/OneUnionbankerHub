import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
} from '../../../ub-components/'

import './styles/fundsComponentStyle.css'

class PensionFundsPaymentHistoryComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pensionFundsData
    } = this.props
    console.log(pensionFundsData)

    return (
      <div>
        <br/>
        <h4 className = { 'letter-spacing-1 font-weight-lighter font-size-26px' }>Payment History</h4>
      <div>
        {
          // pensionFundsData.paymentHistory.map((resp, key) =>
          //   <div
          //     key = { key }
          //     className = { 'funds-component-history-grid' }>
          //     <div className = { 'unionbank-color' }>0</div>
          //     <Card className = { 'funds-component-card-details-grid' }>
          //       <div>{ resp.datePayment }</div>
          //       <div>{ resp.totalInvestment }</div>
          //       <div>{ resp.totalReturn }</div>
          //     </Card>
          //   </div>
          // )
        }
        </div>
      </div>
    )
  }
}

PensionFundsPaymentHistoryComponent.propTypes = {
  pensionFundsData : PropTypes.array,
}


export default PensionFundsPaymentHistoryComponent
