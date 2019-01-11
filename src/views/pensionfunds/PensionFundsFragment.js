import React from 'react'
import { Switch, Route, createBrowserHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/PensionFundsPresenter'

import './styles/fundsStyle.css'

import PensionFundsDocumentsFragment from './fragments/PensionFundsDocumentsFragment'
import PensionDetailsFragment from './fragments/PensionDetailsFragment'
import PensionCodeModals from './modals/PensionCodeModals'

import {
  CircularLoader
} from '../../ub-components/'

class PensionFundsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
      stepperStatus: 1,
      showCodeModal: false,
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
      showCodeModal
    } = this.state

    return (
      <div>
        {
          showCodeModal &&
          <PensionCodeModals
            submitCodeFunc = { () =>{} }
            codeTextFunc = { (codeText) => this.setState({ codeText }) }
            codeText = { codeText }/>
        }
        {
          loader ?
          <CircularLoader
            validateLoading = { true }
            show = { loader } />
          :
          <div  className = { 'funds-fragment' }>
            <div></div>
            <div>
              {
                stepperStatus === 4 ?
                <PensionDetailsFragment pensionFundsData = { pensionFundsData } /> :
                <PensionFundsDocumentsFragment
                  statusCodeFunc = { (stepperStatus) => this.setState({ stepperStatus }) }
                  statusCodeReturnFunc = { (stepperStatus) => this.setState({ stepperStatus }) }
                  stepperStatus = { stepperStatus }
                  changeCheckedFunc = { (e, e1) => {
                    try {
                      this.presenter.setDocumentsCheckerPresenter(e, e1)
                      this.setState({ showCodeModal : true })
                    } catch(e) {
                      console.log(e)
                    }
                  } }
                  showCodeModalFunc = { (showCodeModal) => this.setState({ showCodeModal }) }
                  pensionFundsDocumentsData = { pensionFundsDocumentsData && pensionFundsDocumentsData }/>
              }
            </div>
            <div></div>
          </div>
        }
      </div>
    )
  }
}

export default ConnectView (PensionFundsFragment, Presenter)
