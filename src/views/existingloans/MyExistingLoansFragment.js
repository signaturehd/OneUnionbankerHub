import React from 'react'
import PropTypes from 'prop-types'

import ConnectPartial from '../../utils/ConnectPartial'
import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MyExistingLoansPresenter'

import ExistingLoansSummaryCardComponent from './components/ExistingLoansSummaryCardComponent'

import {
  CircularLoader,
  Card,
  GenericButton,
  Line
} from '../../ub-components/'

import { format } from '../../utils/numberUtils'

import './styles/myExistingLoanStyle.css'

import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"

import moment from 'moment'

class MyExistingLoansFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      existingLoans : [],
      enabledLoader: false
    }
  }

  componentDidMount () {
    this.presenter.getNonExistingLoans()
    this.presenter.getExistingLoans()
  }

  showGetLoans (loans) {
    const { existingLoans } = this.state
    const arrayList = [...existingLoans]
    loans.map((resp) => {
      arrayList.push(resp)
    })
    this.setState({ existingLoans : arrayList })
  }

  showCircularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  render () {
    const { existingLoans, enabledLoader } = this.state
    const existingLoansTotal = existingLoans.map(function(resp) {
      return resp.balance
    })

    const totalAmount = existingLoansTotal.reduce((a, b) => a + b, 0)

    return (
      <div>
        <br/>
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
              <div className = { 'existing-loan-summary-grid-x2' }>
                <div>
                  Existing Loans Summary
                </div>
                <div>
                  <Line/>
                </div>
                <br/>
                <br/>
              </div>
            </div>
            <div className = { 'existing-loans-grid-header' }>
              <div>
              </div>
              <Card className = { 'existing-loan-card-balance existingloan-card-background' }>
                <div className = { 'existing-loans-grid-card' }>
                  <span />
                  <div className = { 'text-align-right' }>
                    <h2 className = { 'existing-loan-title-header' }>
                       &#8369;{ format(totalAmount) }
                    </h2>
                    <br/>
                    <h2>
                      Total Outstanding Balance
                    </h2>
                    <h2>
                      { moment().format('DD MMM YYYY') }
                    </h2>
                  </div>
                </div>
              </Card>
            </div>
            <div>
              <div className = { 'existing-loan-summary-grid-x2' }>
                <div>
                  <br/>
                  Recent Loans
                </div>
                <div>
                  <Line/>
                </div>
              </div>
              <br/>
                {
                 totalAmount == 0 ?
                 <h2>No record(s)</h2>
                 :
                 <ExistingLoansSummaryCardComponent
                   totalAmount = { totalAmount }
                   existingLoans = { existingLoans }
                   />
                 }
              <br/>
              </div>
              <div>
              <br/>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default ConnectPartial(MyExistingLoansFragment, Presenter)
