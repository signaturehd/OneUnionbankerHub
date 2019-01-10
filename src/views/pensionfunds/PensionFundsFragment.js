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
      showCoeModal: false,
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
      codeText,
      showCoeModal
    } = this.state

    return (
      <div>
        {
          showCoeModal &&
          <PensionCodeModals
            submitCodeFunc = { () =>{} }
            codeTextFunc = { (codeText) => this.setState({ codeText }) }
            codeText = { codeText }/>
        }
        {
          loader ?
          <CircularLoader show = { loader } />
          :
          <div  className = { 'funds-fragment' }>
            <div></div>
            <div>
              <PensionFundsDocumentsFragment
                statusCodeFunc = { (stepperStatus) => this.setState({ stepperStatus }) }
                stepperStatus = { stepperStatus }
                changeCheckedFunc = { (e, e1) => {
                  try {
                    this.presenter.setDocumentsCheckerPresenter(e, e1)
                  } catch(e) {
                    console.log(e)
                  }
                } }
                showCoeModalFunc = { (showCoeModal) => this.setState({ showCoeModal }) }
                pensionFundsDocumentsData = { pensionFundsDocumentsData && pensionFundsDocumentsData }/>
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
