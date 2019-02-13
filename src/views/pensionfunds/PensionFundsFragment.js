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
      tabsId : 'year',
    }
  }

  componentDidMount () {
    this.presenter.getPensionFunds()
    //this.presenter.getPensionValidate()
    this.presenter.getMockData()
    this.presenter.setUnitSummary('year')
    this.presenter.getPensionFundsDocuments()

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

  setChartPensionData(pensionChartData){
    this.setState({pensionChartData})
  }
  navigate () {
    this.props.history.push('/phenom')
  }

  render () {
    const { agreementBool } = this.props
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
      continueCodeFunc,
      isPincode,
    } = this.state

    return (

      <div>
        {
          showCodeModal &&
          <PensionCodeModals
            submitCodeFunc = { () =>{} }
            codeTextFunc = { (codeText) => this.setState({ codeText }) }
            codeText = { codeText }
            cancelCodeFunc = { () => {
              try{
                this.setState({ showCodeModal : false })
                this.presenter.setDocumentsCheckerPresenter(true,id)
              } catch(e)
              {
                console.log(e)
              }
            }}
          />
        }
        {
          showContributionModal &&
           <PensionContributionModals
              isPincode = { isPincode }
              continueCodeFunc = { (bool) =>{
                  this.setState({  isPincode : bool })
                }}
              cancelCodeFunc = { () => {
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
                      stepperStatus === 4 || agreementBool === true ?
                    <PensionDetailsFragment
                    contributionModal = { () => { this.setState({ showContributionModal : true }) }  }
                    //contributionModalFunc = { (showContributionModal) => setState({showContributionModal}) }
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
                        id === 3 ?
                        this.setState({showContributionModal: bool})

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
