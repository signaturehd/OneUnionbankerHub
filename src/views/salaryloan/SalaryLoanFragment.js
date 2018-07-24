import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/SalaryLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import {
  CircularLoader,
  SingleInputModal,
} from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import SalaryLoanCardComponent from './components/SalaryLoanCardComponent'

class SalaryLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      showNoticeModal : false,
      showNoticeResponseModal : false,
      showModeOfLoan : false,
      showTermOfLoan : false,
      showPurposeOfAvailment : false,
      showBenefitFeedbackModal : false,
      purposeOfAvailmentId : null,
      purposeOfAvailmentLabel : null,
      modeOfLoanId : null,
      modeOfLoanLabel : null,
      termOfLoanId : null,
      termOfLoanLabel : null,
      purposeOfAvailment : [],
      modeOfLoan : [],
      termOfLoan : [],
      fileAttachments : [],
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    // this.presenter.getMplTypes()
    // this.presenter.isManagersCheck()
    // this.presenter.getProfile()
    // this.presenter.getSalaryLoanType()
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

  /* Validate loan Type */
  showSalaryLoanType (loanType) {
    this.setState({ loanType })
    this.showValidatedLoanType (loanType)
  }

  showValidatedLoanType (loanType) {
    // this.presenter.getMplValidate(loanType)
    // this.presenter.getMplPurposeOfAvailment(
    //   loanType,
    //   1,
    //   1)
  }

  showMaximumLoanableAmount (maximumAmount) {
    this.setState({ maximumAmount })
  }

  sendFormDataToPresenter (
    dealerName,
    amountValue,
    modeOfLoanId,
    loanType,
    poaText,
    selectedTerm,
    selectedOffsetLoan,
    formAttachments
  ) {
    this.presenter.addLoan(
      dealerName,
      amountValue,
      modeOfLoanId,
      loanType,
      poaText,
      selectedTerm,
      selectedOffsetLoan,
      formAttachments
    )
  }

  render () {
    const {
      showNoticeModal,
      showNoticeResponseModal,
      showModeOfLoan,
      showTermOfLoan,
      showPurposeOfAvailment,
      showBenefitFeedbackModal,
      purposeOfAvailment,
      purposeOfAvailmentId,
      purposeOfAvailmentLabel,
      fileAttachments,
      modeOfLoan,
      modeOfLoanId,
      modeOfLoanLabel,
      termOfLoan,
      termOfLoanId,
      termOfLoanLabel,
    } = this.state

    // const empName=employeeName && employeeName.fullname
    // const updateIsDealerOrPayeeName=[...storedIsDealerOrPayee]
    // updateIsDealerOrPayeeName.push(isPayeeOrDealerResp)
    // updateIsDealerOrPayeeName.push(empName)

    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNotice : false })}
            noticeResponse={ noticeResponse }
            benefitId={ 1 }
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
          showPurposeOfAvailment &&
          <SingleInputModal
            inputArray = { purposeOfAvailment }
            selectedArray = { (purposeOfAvailmentId, purposeOfAvailmentLabel) =>
              this.setState({ purposeOfAvailmentId, purposeOfAvailmentLabel }) } //response
            onClose = { () => this.setState({showPurposeOfAvailment : false}) }
          />
        }
        {
          showModeOfLoan &&
          <SingleInputModal
            inputArray = { modeOfLoan }
            selectedArray = { (modeOfLoanId, modeOfLoanLabel) =>
              this.setState({ modeOfLoanId, modeOfLoanLabel }) }
            onClose = { () => this.setState({showModeOfLoan : false}) }
          />
        }
        {
          showTermOfLoan &&
          <SingleInputModal
            inputArray = { termOfLoan }
            selectedArray = { (termOfLoanId, termOfLoanLabel) =>
              this.setState({ termOfLoanId, termOfLoanLabel }) }
            onClose = { () => this.setState({showTermOfLoan : false}) }
          />
        }
        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId={ 1 }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/loans'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }

        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Salary Loan
          </h2>
        </div>
        <br/>
        <SalaryLoanCardComponent
          showTermOfLoan = { () => this.setState({ showTermOfLoan : true }) }
          showModeOfLoan = { () => this.setState({ showModeOfLoan : true }) }
          showPurposeOfAvailment = { () => this.setState({ showPurposeOfAvailment : true }) }
          fileAttachments = { fileAttachments }
          termOfLoan = { termOfLoanLabel }
          purposeOfAvailment = { purposeOfAvailmentLabel }
          modeOfLoan = { modeOfLoanLabel }
          desiredAmount = { (desiredAmount) => this.setState({ desiredAmount : parseInt(desiredAmount) }) }
          onClick = { () => this.submitForm() }
        />
      </div>
    )
  }
}
export default ConnectView(SalaryLoanFragment, Presenter)
