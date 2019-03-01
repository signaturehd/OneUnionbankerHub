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
      pensionContributionHistoryData,
      changePaymentFunc
    } = this.props

    return (
      <div>
      <div>
        {
          pensionContributionHistoryData &&
          pensionContributionHistoryData.contributionHistory.map((resp, key) =>
            <div
              key = { key }
              className = { 'funds-component-history-grid funds-border-history' }>
              <div
                style = {{
                   margin: 'auto 5px'
                 }}
                className = { 'unionbank-color ' }>
                  <div className = { `funds-history-circle${ key === 0 ? 'active' : '' }` }></div>
              </div>
              <Card className = { 'funds-component-card-details-grid' }
              onClick = { () => changePaymentFunc(false , resp.id)  }>
                <div className = { 'funds-history-content-grid-row' }>
                  <h4 className = { 'text-align-left' }>
                    { resp.date }
                  </h4>
                  <h4 className = { 'text-align-left font-size-10px font-weight-lighter' }>
                    Type of plan/ package
                  </h4>
                </div>
                <div className = { 'funds-history-content-grid-row' }>
                  <h4 className = { 'text-align-left' }>
                   &#8369; { format(resp.amount.toFixed(2)) }
                  </h4>
                  <h4 className = { 'text-align-left font-size-10px font-weight-lighter' }>
                    Total Investment
                  </h4>
                </div>
                <div className = { 'funds-history-content-grid-row' }>
                  <h4 className = { 'text-align-left' }>
                    &#8369; { format(resp.unitBought.toFixed(2)) }
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
