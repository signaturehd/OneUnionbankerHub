import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MotorcycleLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import FormComponent from './components/MotorcycleLoanCardComponent'

import store from '../../store'
import { NotifyActions } from '../../actions'

class MotorCycleLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
      purposeOfAvailment: [],
      formAttachments: [],
      loanType: 4,
      validateLoanType : [],
      offset : [],
      enabledLoader : false,
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showNoticeModal : false,
      showConfirmation : false,
      showBenefitFeedbackModal: false,
      poaText : '',
      modeOfLoanId : '',
      termId : '',
      amountValue : '',
      selectedSupplier : '',
      file : ''
    }
    this.sendFormData=this.sendFormData.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getMplTypes()
    this.presenter.getMplValidate(this.state.loanType)
    this.presenter.getMplPurposeOfAvailment(
      this.state.loanType,
      1,
      1)
  }

  /* Implementation*/

  showMPLFormAttachments (formAttachments) {
    this.setState({ formAttachments })
  }

  showOffset (offset) {
    this.setState({ offset })
  }

  showValidate (validateLoanType) {
    this.setState({ validateLoanType })
  }

  showPurposeOfAvailment (purposeOfAvailment) {
    this.setState({ purposeOfAvailment })
  }

  /*Loader*/

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }
  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

    /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse })
  }

  sendFormData (
    poaText,
    modeOfLoanId,
    termId,
    amountValue,
    selectedSupplier,
    file) {
      if(poaText === "" || poaText === null)
      {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please include the Purpose of Availment',
            type : 'warning',
            duration : 2000
          })
        )
      }
      else if (amountValue === 0 || grantAmount === "") {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please include the Desired Amount',
            type : 'warning',
            duration : 2000
          })
        )
      }
      else if ( termId === null || termId === "") {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please specify the Term and Rates',
            type : 'warning',
            duration : 2000
          })
        )
      }
      else if (!file) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please check the file attachments',
            type : 'warning',
            duration : 2000
          })
        )
      }
       else {
          this.presenter.addLoan(
            poaText,
            modeOfLoanId,
            termId,
            amountValue,
            selectedSupplier,
            file)
          }
        }

  render () {
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      offset,
      enabledLoader,
      formAttachments,
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      noticeResponse,
      showBenefitFeedbackModal,
      response,
      poaText,
      modeOfLoanId,
      termId,
      amountValue,
      selectedSupplier,
      file }=this.state

    return (
      <div>
        { super.render() }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Motorcycle Loan
          </h2>
        </div>
          {
            showNoticeModal &&
            <NoticeModal
              onClose = { () => this.setState({ showNoticeModal : false })}
              noticeResponse = { noticeResponse }
              benefitId = { loanType }
              onDismiss = { (showNoticeModal, noticeResponse) =>
                this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
            />
          }

          {
            showNoticeResponseModal &&
            <ResponseModal
              onClose = { () => {
                this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
              }}
              noticeResponse = { noticeResponse }
            />
          }
          {
            showBenefitFeedbackModal &&
            <BenefitFeedbackModal
              benefitId = { loanType }
              onClose = { () => {
                this.props.history.push('/mybenefits/benefits/carlease'),
                this.setState({ showBenefitFeedbackModal : false })
              }}
            />
          }
          {
            enabledLoader ?
             <center className={ 'circular-loader-center' }>
               <CircularLoader show={ this.state.enabledLoader }/>
             </center> :
            <FormComponent
              loanType={ loanType }
              purposeOfAvailment={ purposeOfAvailment }
              validateLoanType={ validateLoanType }
              formAttachments={ formAttachments }
              offset={ offset }
              presenter={ this.presenter }
              onClick={ () =>
                this.sendFormData(
                  poaText,
                  modeOfLoanId,
                  termId,
                  amountValue,
                  selectedSupplier,
                  file
                  )
                }
              onSubmit={ (
                getPoaTextData,
                getModeOfLoanId,
                getTermIdData,
                getAmountValueData,
                getSelectedSupplierData,
                getFileData) => this.setState({
                  poaText : getPoaTextData,
                  modeOfLoanId : getModeOfLoanId,
                  termId : getTermIdData,
                  amountValue : getAmountValueData,
                  selectedSupplier : getSelectedSupplierData,
                  file : getFileData
                })
              }
            />
          }
      </div>
    )
  }
}
export default ConnectView(MotorCycleLoanFragment, Presenter)
