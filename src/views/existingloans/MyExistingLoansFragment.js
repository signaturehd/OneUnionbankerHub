import React from 'react'
import PropTypes from 'prop-types'

import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MyExistingLoansPresenter'

import ExistingLoansSummaryCardComponent from './components/ExistingLoansSummaryCardComponent'
import ExistingLoansHistoryCardComponent from './components/ExistingLoansHistoryCardComponent'

import {
  CircularLoader,
  Card,
  GenericButton,
  Line
} from '../../ub-components/'

import { format } from '../../utils/numberUtils'

import './styles/myExistingLoanStyle.css'

import moment from 'moment'

class MyExistingLoansFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      existingLoans : [],
      enabledLoader: false,
    }
  }

  componentDidMount () {
    this.presenter.getExistingLoans()
  }

  showGetExistingLoans (existingLoans) {
    this.setState({ existingLoans })
  }

  showCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  render () {
    const { existingLoans, enabledLoader } = this.state
    return (
      <div>
        {
          enabledLoader ?

          <div className = { 'existing-loans-loader' }>
            <center>
              <CircularLoader show = { true } />
            </center>
          </div>
          :
          <div className = { 'existing-loans-grid-container' }>
            <div>
              {
                existingLoans.map((resp, key) =>
                <div className = { 'text-align-center' }>
                  <h2>
                    &#8369; { format(resp.balance) }
                  </h2>
                  <h2>
                    Outstanding Balance
                  </h2>
                  <h2>
                    { moment(resp.date).format('DD MMM YYYY') }
                  </h2>
                </div>
                )
              }
            </div>
            <div>
              <div className = { 'existing-loan-summary-grid-x2' }>
                <div>
                  Existing Loans Summary
                </div>
                <div>
                  <Line/>
                </div>
              </div>
              <br/>
              <ExistingLoansSummaryCardComponent
                existingLoans = { existingLoans }
                />
              <br/>
            </div>
            <div>
              <div className = { 'existing-loan-summary-grid-x2' }>
                <div>
                  Loans History
                </div>
                <div>
                  <Line/>
                </div>
              </div>
              <br/>
              <ExistingLoansHistoryCardComponent
                existingLoans = { existingLoans }
                />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ConnectPartial(MyExistingLoansFragment, Presenter)
