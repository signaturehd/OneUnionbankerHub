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
import PensionContributionModals from './modals/PensionContributionModals'

import NoticeResponse from '../notice/NoticeResponseModal'

import * as functions from './functions/PensionFundFunction'

import {
  CircularLoader,
  Modal,
  GenericButton
} from '../../ub-components/'

let id

class PensionFundsFragment extends BaseMVPView {
  constructor (props) {
    super (props)
    this.state = {
      loader : false,
      stepperStatus: 1,
      showCodeModal: false,
      showDevelopmentModal: false,
      showContributionModal: false,
      isPincode: false,
      tabsId : 'day',
      amountText: '',
      codeText: '',
      showNoticeResponseModal : false
    }
  }

  componentDidMount () {
    this.presenter.getPensionFunds()
    this.presenter.getPensionValidate()
    this.presenter.getPensionFundsDocuments()
    this.presenter.setUnitSummary('day')
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponseModal: true, showCodeModal: false })
  }

  showCircularLoader (loader) {
    this.setState({ loader })
  }

  setPensionFundsData (pensionFundsData) {
    this.setState({ pensionFundsData })
  }

  setPensionFundsPresenter (pensionContributionData) {
    this.setState({ pensionContributionData })
  }

  setPensionFundsDocumentsData (pensionFundsDocumentsData) {
    this.setState({ pensionFundsDocumentsData })
  }

  setChartPensionData(label, rate){
    const object = {
      label: label,
      rate : rate,
    }
    this.setState({ pensionChartData : object })
  }

  setPensionContributionData (pensionContributionHistoryData) {
    this.setState({
      pensionContributionHistoryData,
      amountText :
        pensionContributionHistoryData &&
        pensionContributionHistoryData.contribution &&
        pensionContributionHistoryData.contribution.amount ?
        pensionContributionHistoryData.contribution.amount : 0.0
    })
  }

  resetData () {
    this.setState({ codeText: '' })
  }

  codeTextFunc (codeText) {
    const value = functions.checkedValidateInputNumber(codeText)
    this.setState({ codeText : value })
  }

  openContributionData () {
    this.setState({ showContributionModal : true })
  }

  render () {
    const { agreementBool, getProfileFunc } = this.props
    const {
      loader,
      pensionFundsData,
      pensionFundsDocumentsData,
      stepperStatus,
      codeText,
      showCodeModal,
      tabsId,
      showDevelopmentModal,
      pensionChartData,
      data,
      pensionAgreement,
      showContributionModal,
      isPincode,
      noticeResponse,
      amountText,
      showNoticeResponseModal,
      pensionContributionData,
      pensionContributionHistoryData,
    } = this.state

    return (

      <div>
        {
          showNoticeResponseModal  &&
          <NoticeResponse
            noticeResponse = { noticeResponse }
            onClose = { () =>{
              this.props.getProfileFunc()
              this.setState({
                showNoticeResponseModal : false,
              })
            } }
          />
        }
        {
          showCodeModal &&
          <PensionCodeModals
            agreementBool = { agreementBool }
            submitCodeFunc = { () => {
              if(agreementBool) {
                console.log('test')
                this.presenter.addPensionContributional(amountText, codeText)
              } else {
                this.presenter.updatePensionContributional(amountText, codeText)
              }
            } }
            codeTextFunc = { (codeText) => this.codeTextFunc(codeText) }
            codeText = { codeText }
            cancelCodeFunc = { () => {
              this.setState({ showCodeModal : false, codeText: '' })
              this.presenter.setDocumentsCheckerPresenter(true,id)
            }}
          />
        }
        {
          showContributionModal &&
          <PensionContributionModals
            amountText = { amountText }
            isBool = { agreementBool }
            amountTextFunc = { (amountText) => this.setState({ amountText }) }
            continueCodeFunc = { () => {
              this.setState({
                showCodeModal : true,
                showContributionModal : false,
              })
            }}
            cancelCodeFunc = { () => {
             this.setState({ amountText :
               pensionContributionHistoryData &&
               pensionContributionHistoryData.contribution &&
               pensionContributionHistoryData.contribution.amount ?
               pensionContributionHistoryData.contribution.amount : 0.0 })
             this.setState({ showContributionModal : false })
            }}
          />
        }
        {
          loader ?
          <CircularLoader
            validateLoading = { true }
            show = { loader } />
          :
          <div>
            {
              showDevelopmentModal ?
              <Modal>
                <center>
                  <h4>Retirement Fund is still under development. Please come back in the next few days to avail of this benefit. Thank you!</h4>
                  <br/>
                  <GenericButton
                    text = { 'Ok' }
                    onClick = { () => {
                      this.props.history.push('/')
                      this.setState({ showDevelopmentModal: false })
                      this.presenter.setDocumentsCheckerPresenter(false, 1)
                    } }
                    />
                </center>
              </Modal>
              :
              <div  className = { 'funds-fragment' }>
                <div></div>
                <div>
                {
                  agreementBool !== null || agreementBool !== false ?
                  <PensionDetailsFragment
                    pensionContributionHistoryData = { pensionContributionHistoryData }
                    pensionContributionData = { pensionContributionData }
                    contributionModal = { () => { this.setState({ showContributionModal : true }) }  }
                    pensionChartData = { pensionChartData }
                    tabsId = { tabsId }
                    tabsIdFunc = { (tabsId) => {
                      this.setState({ tabsId })
                      this.presenter.setUnitSummary(tabsId)
                      }
                    }
                    pensionFundsData = { pensionFundsData }
                    changePaymentFunc = { (bool , id) => {
                      try{
                        this.presenter.setPaymentCheckRefresh('false')
                        this.presenter.setPaymentCheckerPresenter(bool, id)
                      } catch(e){
                        console.log(e)
                      }
                    } }/> :
                    <PensionFundsDocumentsFragment
                      statusCodeFunc = { (stepperStatus,bool,id) =>
                        id === 3 && bool  ?
                        this.presenter.addPensionFundsDocuments()
                        :
                        this.setState({ stepperStatus })

                      }
                      statusCodeReturnFunc = { (stepperStatus) => this.setState({ stepperStatus }) }
                      stepperStatus = { stepperStatus }
                      changeCheckedFunc = { (e, e1) => {
                        try {
                          id = e1
                          this.presenter.setDocumentsCheckerPresenter(e, e1)
                          this.setState({ showCodeModal : false })
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
        }
      </div>
    )
  }
}

PensionFundsFragment.PropTypes = {
   agreementBool : PropTypes.Boolean,
}
export default ConnectView (PensionFundsFragment, Presenter)
