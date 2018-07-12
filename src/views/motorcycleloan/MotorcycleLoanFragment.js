import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MultiPurposeLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import FormComponent from './components/MotorcycleLoanCardComponent'

class MotorCycleLoanFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      selectedPoa: '',
      formAttachments: [],
      loanType: 3,
      validateLoanType : [],
      offset : [],
      enabledLoader : true,
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      showNoticeModal : false,
      showConfirmation : false,
      AdditionalDocuments: 0,
      RequiredDocuments: 0,
      isPayeeOrDealerResp : '',
      employeeName: [],
      storedIsDealerOrPayee: [],
      computationOffset: [],
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.isManagersCheck()
    this.presenter.getProfile()
    this.presenter.getMplTypes()
    this.presenter.getMplValidate(this.state.loanType)
    this.presenter.getMplPurposeOfAvailment(
      this.state.loanType,
      1,
      1)
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }


  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
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

  isManagersCheck (isPayeeOrDealerResp) {
    this.setState({ isPayeeOrDealerResp })
  }

  getEmployeeName (employeeName) {
    this.setState({ employeeName })
  }

  showPurposeOfAvailment (purposeOfAvailment) {
    this.setState({ purposeOfAvailment })
  }

  showAdditionalFilesCount (AdditionalDocuments) {
    this.setState({ AdditionalDocuments })
  }

  showAdRequiredFilesCount (RequiredDocuments) {
    this.setState({ RequiredDocuments })
  }

  /* Loader*/

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

  sendFormData (
    payeeName,
    poaText,
    modeOfLoanId,
    termId,
    amountValue,
    selectedSupplier,
    file) {
      if (poaText === '' || poaText === null) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please include the Purpose of Availment',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (amountValue === 0 || grantAmount === '') {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please include the Desired Amount',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (termId === null || termId === '') {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please specify the Term and Rates',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (!file) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Motorcycle Loan',
            message : 'Please check the file attachments',
            type : 'warning',
            duration : 2000
          })
        )
      } else {
          this.presenter.addLoan(
            payeeName,
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
      showBenefitFeedbackModal,
      showNoticeResponseModal,
      noticeResponse,
      response,
      RequiredDocuments,
      AdditionalDocuments,
      isPayeeOrDealerResp,
      employeeName,
      storedIsDealerOrPayee,
      computationOffset
    } = this.state

    const empName=employeeName && employeeName.fullname
    const updateIsDealerOrPayeeName=[...storedIsDealerOrPayee]
    updateIsDealerOrPayeeName.push(isPayeeOrDealerResp)
    updateIsDealerOrPayeeName.push(empName)

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
              onClose={ () => this.setState({ showNotice : false })}
              noticeResponse={ noticeResponse }
              benefitId={ loanType }
              onDismiss={ (showNoticeModal, response) =>
                this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
            />
          }
          {
            showNoticeResponseModal &&
            <ResponseModal
              onClose={ () => {
                this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
              }}
              noticeResponse={ response }
            />
          }

          {
            showBenefitFeedbackModal &&
            <BenefitFeedbackModal
              benefitId={ loanType }
              onClose={ () => {
                this.props.history.push('/mybenefits/benefits/loans'),
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
              isPayeeOrDealer={ updateIsDealerOrPayeeName ? updateIsDealerOrPayeeName : '(Not yet Provided)' }
              purposeOfAvailment={ purposeOfAvailment }
              validateLoanType={ validateLoanType }
              formAttachments={ formAttachments }
              offset={ offset }
              AdditionalDocuments={ AdditionalDocuments }
              RequiredDocuments={ RequiredDocuments }
              presenter={ this.presenter }
              onSubmit={ (
                payeeName,
                poaText,
                modeOfLoanId,
                termId,
                amountValue,
                selectedSupplier,
                file) => this.sendFormData(
                  payeeName,
                  poaText,
                  modeOfLoanId,
                  termId,
                  amountValue,
                  selectedSupplier,
                  file
                )
              }
            />
          }
      </div>
    )
  }
}
export default ConnectView(MotorCycleLoanFragment, Presenter)
