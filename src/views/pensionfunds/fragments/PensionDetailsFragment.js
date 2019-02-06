import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import '../styles/fundsStyle.css'

import PensionDetailsComponent from '../components/PensionDetailsComponent'
import PensionFundsPaymentHistoryComponent from '../components/PensionFundsPaymentHistoryComponent'
import PensionFundsChartComponent from '../components/PensionFundsChartComponent'
import PensionCharTabsComponent from '../components/PensionCharTabsComponent'

import { format } from '../../../utils/numberUtils'

class PensionDetailsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      tabsId,
      tabsIdFunc,
      pensionFundsData,
      totalPensionFundsData,
      changePaymentFunc
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
              totalPensionFundsData= { totalPensionFundsData }/>
            <div>
            </div>
          </div>
          <br/>
          <br/>
          <h4 className = { 'letter-spacing-2 font-weight-lighter font-size-25px' }>Unit Summary</h4>
          <br/>
          <div className = { 'grid-global' }>
            <PensionCharTabsComponent
              tabsId = { tabsId }
              tabsIdFunc = { (tabsId) => tabsIdFunc(tabsId) }
              />
            <div></div>
          </div>
          <PensionFundsChartComponent />
        </div>
        <div>
          <PensionFundsPaymentHistoryComponent
            pensionFundsData = { pensionFundsData }
            changePaymentFunc = { (bool , id) => changePaymentFunc(bool , id) }/>
        </div>
      </div>
    )
  }
}

export default PensionDetailsFragment
