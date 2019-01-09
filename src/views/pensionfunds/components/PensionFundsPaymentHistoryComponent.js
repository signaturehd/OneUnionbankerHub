import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
} from '../../../ub-components/'

import './styles/fundsComponentStyle.css'
import moment from 'moment'

import { format } from '../../../utils/numberUtils'

class PensionFundsPaymentHistoryComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pensionFundsData
    } = this.props

    return (
      <div>
        <br/>
        <h4 className = { 'letter-spacing-1 font-weight-lighter font-size-26px' }>Payment History</h4>
        <br/>
      <div>
        {
          pensionFundsData &&
          pensionFundsData.paymentHistory.map((resp, key) =>
            <div
              key = { key }
              className = { 'funds-component-history-grid funds-border-history' }>
              <div
                style = {{
                   margin: 'auto 5px'
                 }}
                className = { 'unionbank-color ' }>
                  <div className = { `funds-circle${ 'active' }` }></div>
              </div>
              <Card className = { 'funds-component-card-details-grid' }>
                <div className = { 'funds-history-content-grid-row' }>
                  <h4 className = { 'text-align-left' }>
                    { moment(resp.datePayment).format('MMM DD, YYYY') }
                  </h4>
                  <h4 className = { 'text-align-left font-size-10px font-weight-lighter' }>
                    Type of plan/ package
                  </h4>
                </div>
                <div className = { 'funds-history-content-grid-row' }>
                  <h4 className = { 'text-align-left' }>
                   &#8369; { format(resp.totalInvestment) }
                  </h4>
                  <h4 className = { 'text-align-left font-size-10px font-weight-lighter' }>
                    Total Investment
                  </h4>
                </div>
                <div className = { 'funds-history-content-grid-row' }>
                  <h4 className = { 'text-align-left' }>
                    &#8369; { format(resp.totalInvestment) }
                  </h4>
                  <h4 className = { 'text-align-left font-size-10px font-weight-lighter' }>
                    Total Return
                  </h4>
                </div>
              </Card>
            </div>
          )
        }
        </div>
      </div>
    )
  }
}

PensionFundsPaymentHistoryComponent.propTypes = {
  pensionFundsData : PropTypes.object,
}


export default PensionFundsPaymentHistoryComponent
