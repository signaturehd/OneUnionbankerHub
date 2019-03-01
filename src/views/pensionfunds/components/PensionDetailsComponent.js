import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import './styles/fundsComponentStyle.css'

import { format } from '../../../utils/numberUtils'

class PensionDetailsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pensionContributionData,
    } = this.props

    return (
      <div className = { 'funds-grid-details-income unionbank-white-color' }>
        <div
          style = {{
            borderRightColor: '#fff',
            borderRight: '.5px solid',
          }}
          className = { 'funds-grid-row-details line-spacing-2' }>
          <h4 className = { 'font-weight-normal font-size-24px' }>{ format(pensionContributionData && pensionContributionData.totalUnitsBought) }</h4>
          <div>
            <p style = {{
              margin: '10px 0px 0px',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.5'
              }}>
            <span className = { 'font-size-14px font-weight-bold' }>Total Units</span>
            <span className = { 'font-size-11px font-weight-lighter' }>(Net assets Value per unit)</span>
            </p>
          </div>
        </div>
        <div
          style = {{
            borderRightColor: '#fff',
            borderRight: '.5px solid',
          }}
          className = { 'funds-grid-row-details line-spacing-2' }>
          <h4 className = { 'font-weight-normal font-size-24px' }>{ format(pensionContributionData && pensionContributionData.totalInvestments) }</h4>
          <div>
            <p style = {{
              margin: '10px 0px 0px',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.5'
              }}>
            <span className = { 'font-size-14px font-weight-bold' }>Total Investment</span>
            <span className = { 'font-size-11px font-weight-lighter' }>(Net assets Value per unit)</span>
            </p>
          </div>
        </div>
        <div
          className = { 'funds-grid-row-details  line-spacing-2' }>
          <h4 className = { 'font-weight-normal font-size-24px' }>{ format(pensionContributionData && pensionContributionData.unitToday) }</h4>
          <div>
            <p style = {{
              margin: '10px 0px 0px',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.5'
              }}>
            <span className = { 'font-size-14px font-weight-bold' }>Unit Today</span>
            <span className = { 'font-size-11px font-weight-lighter' }>(Net assets Value per unit)</span>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PensionDetailsComponent
