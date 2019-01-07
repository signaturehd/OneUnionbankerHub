import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PensionFundsPresenter'

import './styles/fundsStyle.css'

import PensionDetailsComponent from './components/PensionDetailsComponent'
import PensionFundsPaymentHistoryComponent from './components/PensionFundsPaymentHistoryComponent'

class PensionFundsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
    }
  }

  componentDidMount () {
    // this.presenter.getPensionFunds()
    this.presenter.getMockData()
  }

  showCircularLoader (loader) {
    this.setState({ loader })
  }

  setPensionFundsData (pensionFundsData) {
    console.log(pensionFundsData)
    this.setState({ pensionFundsData })
  }

  navigate () {
    this.props.history.push('/phenom')
  }

  render () {
    const {
      loader,
      pensionFundsData
    } = this.state
    console.log(pensionFundsData)
    return (
      <div>
        {
          loader ?
          <CircularLoader show = { loader } />
          :
          <div  className = { 'funds-fragment' }>
            <div></div>
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
            <div></div>
          </div>
        }
      </div>
    )
  }
}

export default ConnectView (PensionFundsFragment, Presenter)
