import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MultiPurposeLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import FormComponent from '../mpl/components/MplLoanFormCardComponent'

class HousingAssistanceFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state={
      purposeOfAvailment: [],
      selectedPoa: '',
      formAttachments: [],
      loanType: '',
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
    this.presenter.getMplTypes()
    this.presenter.isManagersCheck()
    this.presenter.getProfile()
    this.presenter.getHousingAssistanceLoanType()
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
  showHousingAssistanceLoanType (loanType) {
    this.setState({ loanType })
    if(loanType === 0 || loanType === undefined || loanType === null) {

    }
    else {
      this.showValidatedLoanType (loanType)
    }
  }

  showValidatedLoanType (loanType) {
    this.presenter.getMplValidate(loanType ? loanType : 0)
    this.presenter.getMplPurposeOfAvailment(
      loanType,
      1,
      1)
  }

  sendFormDataToPresenter (
    dealerName,
    amountValue,
    modeOfLoanId,
    loanType,
    poaText,
    selectedTerm,
    selectedOffsetLoan,
    fileObject,
    fileObject1
  ) {
    this.presenter.addLoan(
      dealerName,
      amountValue,
      modeOfLoanId,
      loanType,
      poaText,
      selectedTerm,
      selectedOffsetLoan,
      fileObject,
      fileObject1
    )
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
    }=this.state

    const empName=employeeName && employeeName.fullname
    const updateIsDealerOrPayeeName=[...storedIsDealerOrPayee]
    updateIsDealerOrPayeeName.push(isPayeeOrDealerResp)
    updateIsDealerOrPayeeName.push(empName)

    return (
      <div>
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

        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Housing Assistance Loan
          </h2>
        </div>
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
              sendFormDataToPresenter={ (
                dealerName,
                amountValue,
                modeOfLoanId,
                loanType,
                poaText,
                selectedTerm,
                selectedOffsetLoan,
                fileObject,
                fileObject1
              )  =>
              this.sendFormDataToPresenter(
                dealerName,
                amountValue,
                modeOfLoanId,
                loanType,
                poaText,
                selectedTerm,
                selectedOffsetLoan,
                fileObject,
                fileObject1
              )
               }
            />
          }
      </div>
    )
  }
}
export default ConnectView(HousingAssistanceFragment, Presenter)
