import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PensionFundsPresenter'

import './styles/fundsStyle.css'

import PensionFundsDocumentsFragment from './fragments/PensionFundsDocumentsFragment'

class PensionFundsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
      stepperStatus: 1,
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
    this.setState({ pensionFundsData })
  }

  setPensionFundsDocumentsData (pensionFundsDocumentsData) {
    this.setState({ pensionFundsDocumentsData })
  }

  navigate () {
    this.props.history.push('/phenom')
  }

  render () {
    const {
      loader,
      pensionFundsData,
      pensionFundsDocumentsData,
      stepperStatus,
    } = this.state

    return (
      <div>
        {
          loader ?
          <CircularLoader show = { loader } />
          :
          <div  className = { 'funds-fragment' }>
            <div></div>
            <div>
              <PensionFundsDocumentsFragment
                stepperStatus = { stepperStatus }
                pensionFundsDocumentsData = { pensionFundsDocumentsData && pensionFundsDocumentsData.documents }/>
            </div>
            {
              // <PensionDetailsFragment pensionFundsData = { pensionFundsData } />
            }
            <div></div>
          </div>
        }
      </div>
    )
  }
}

export default ConnectView (PensionFundsFragment, Presenter)
