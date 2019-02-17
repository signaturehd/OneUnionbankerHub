import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Line,
  Card,
  GenericButton
} from '../../../ub-components/'

import '../styles/fundsStyle.css'

import PensionDetailsComponent from '../components/PensionDetailsComponent'
import PensionFundsPaymentHistoryComponent from '../components/PensionFundsPaymentHistoryComponent'
import PensionFundsChartComponent from '../components/PensionFundsChartComponent'
import PensionCharTabsComponent from '../components/PensionCharTabsComponent'
import NoDataListedComponent from '../../common/components/NoDataListedComponent'

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
      changePaymentFunc,
      pensionChartData,
      contributionModal,
      pensionContributionData
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
            <div>
            </div>
          </div>
          <br/>
          <br/>
          <div className = { 'grid-global' }>
            <h4 className = { ' margin-auto letter-spacing-2 font-weight-lighter font-size-25px' }>Unit Summary</h4>
            <GenericButton
              className = { 'cursor-pointer profile-button-medium' }
              text = { 'Change Contribution Amount' }
              className = { 'funds-contribution-button' }
              onClick = { () => contributionModal() }
            />
          </div>
          <br/>
          <div className = { 'grid-global' }>
            <PensionCharTabsComponent
              tabsId = { tabsId }
              tabsIdFunc = { (tabsId) => tabsIdFunc(tabsId) }
              />
            <div></div>
          </div>
          <PensionFundsChartComponent
              pensionChartData = { pensionChartData }
          /><br/>
        </div>
        <div>
        {
          pensionFundsData && pensionFundsData !== 0 ?
          <PensionFundsPaymentHistoryComponent
            pensionFundsData = { pensionFundsData }
            changePaymentFunc = { (bool , id) => changePaymentFunc(bool , id) }/>
            :
          <NoDataListedComponent
            text = { ' No Pension Data' }/>
        }
        </div>
      </div>
    )
  }
}

export default PensionDetailsFragment
