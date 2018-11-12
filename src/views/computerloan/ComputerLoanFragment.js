import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/ComputerLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import {
  CircularLoader,
  SingleInputModal,
  ConfirmationModal,
  LoaderModal,
} from '../../ub-components/'

import store from '../../store'
import { NotifyActions } from '../../actions'
import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import * as Functions from './function/ComputerLoanFunction'

import ComputerLoanCardComponent from './components/ComputerLoanCardComponent'

class ComputerLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)

    this.state = {
      showNoticeModal : false,
      showNoticeResponseModal : false,
      showModeOfLoan : false,
      showTermOfLoan : false,
      showOffsetLoan : false,
      showConfirmationModal : false,
      showPurposeOfAvailment : false,
      showBenefitFeedbackModal : false,
      showLoading : false,
      review : false,
      purposeOfAvailmentId : null,
      purposeOfAvailmentLabel : null,
      modeOfLoanId : null,
      modeOfLoanLabel : null,
      termOfLoanId : null,
      termOfLoanLabel : null,
      offsetLoanArray : [],
      offsetLoanFormArray : [],
      purposeOfAvailment : [],
      modeOfLoan : [],
      offsetLoan : [],
      termOfLoan : [],
      nfis : [],
      fileAttachments : [],
      supplier : '',
      desiredAmount: '',
      status : 'Next',
      desiredAmount : ''
    }

    this.setPurposeOfAvailment = this.setPurposeOfAvailment.bind(this)
    this.updateOffsetLoan = this.updateOffsetLoan.bind(this)
    this.updateModeOfLoan = this.updateModeOfLoan.bind(this)
    this.addLoan = this.addLoan.bind(this)
    this.setFileAttachments = this.setFileAttachments.bind(this)
    this.noticeResponse = this.noticeResponse.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    // this.presenter.isManagersCheck()
    // this.presenter.getProfile()
    this.presenter.getMplValidate()
    this.presenter.getMplPurposeOfAvailment()
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse, showLoading: false })
  }

  noticeResponse (noticeResponse) {
    this.setState({ showConfirmationModal: false, noticeResponse })
  }

  /* Implementation*/
  showMplFormAttachments (fileAttachments) {
    this.setState({ fileAttachments })
  }

  setFileAttachments (fileAttachments) {
    this.setState({ fileAttachments })
  }

  setOffset (offsetLoan) {
    this.setState({ offsetLoan })
  }

  isValid (isValid) {
    this.setState({ isValid })
  }

  setModeOfLoan (modeOfLoan) {
    this.setState({ modeOfLoan })
    if(modeOfLoan.length === 1) {
      this.setState({ modeOfLoanLabel : 'New Loan', modeOfLoanId: 1  })
    }
  }

  showValidate (validateLoanType) {
    this.setState({ validateLoanType })
  }

  setNfis (nfis) {
    this.setState({ nfis })
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

  setTermOfLoan (termOfLoan) {
    this.setState({ termOfLoan })
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

  supplierFunc (supplier) {
    this.setState({ supplier })
  }

  validateRequired (e) {
    return Functions.checkedValidateInput(e)
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
    this.presenter.getMplValidate(loanType)
    this.presenter.getMplPurposeOfAvailment(loanType, 1, 1)
  }

  showMaximumLoanableAmount (maximumAmount) {
    this.setState({ maximumAmount })
  }

  updateModeOfLoan (modeOfLoanId, modeOfLoanLabel) {
    if (modeOfLoanId === 3) {
      this.setState({
        modeOfLoanId,
        modeOfLoanLabel,
        offsetLoanFormArray: [],
        offsetLoanArray: [],
        showModeOfLoan: false
      })
    } else {
      this.setState({
        modeOfLoanId,
        modeOfLoanLabel,
        showModeOfLoan: false
      })
    }
  }

  hideLoading (showLoading) {
    this.setState({ showLoading, review : false, status : 'Next' })
  }

  addLoan () {
    this.setState({ showLoading : true, showConfirmationModal : false })
    const {
      dealerName,
      desiredAmount,
      modeOfLoanId,
      purposeOfAvailmentLabel,
      offsetLoanFormArray,
      termOfLoanId,
      fileAttachments,
      termOfLoan,
      supplier,
    } = this.state

    let termsValue

    termOfLoan.map((terms, key) => {
      if (terms.id === termOfLoanId) {
        termsValue = terms.value
      }
    })

    this.presenter.addLoan(
      dealerName,
      desiredAmount,
      modeOfLoanId,
      5,
      purposeOfAvailmentLabel,
      termsValue,
      offsetLoanFormArray,
      fileAttachments,
      supplier
    )

  }

  submitForm () {
    const {
      review,
      purposeOfAvailmentLabel,
      modeOfLoanId,
      termOfLoanId,
      desiredAmount,
      fileAttachments,
      supplier,
      showConfirmationModal
    } = this.state

    let validateAttachments = false
    fileAttachments && fileAttachments.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    store.dispatch(NotifyActions.resetNotify())
    if (review) {
      this.setState({showConfirmationModal : true})
    } else {
      if (!this.validateRequired(purposeOfAvailmentLabel)) {
         store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits' ,
            message : 'Purpose of Availment is required',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (!this.validateRequired(modeOfLoanId)) {
         store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits' ,
            message : 'Mode of Loan is required',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (!this.validateRequired(termOfLoanId)) {
         store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits' ,
            message : 'Term of Loan is required',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (!this.validateRequired(supplier)) {
         store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits' ,
            message : 'Supplier is required',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (!this.validateRequired(desiredAmount)) {
         store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits' ,
            message : 'Desired Amount is required',
            type : 'warning',
            duration : 2000
          })
        )
      } else if (fileAttachments.length) {
        if (validateAttachments) {
          fileAttachments && fileAttachments.map(
            (attachment, key) => {
              if(!attachment.file) {
                store.dispatch(NotifyActions.addNotify({
                   title : 'My Benefits' ,
                   message : attachment.name + ' is required',
                   type : 'warning',
                   duration : 2000
                 })
               )
              }
            }
          )
        }else {
          this.setState({review : true, status: 'Submit'})
        }
      }
      else {
        this.setState({review : true, status: 'Submit'})
      }
    }
  }

  setPurposeOfAvailment (purposeOfAvailmentId, subCategoryId, purposeOfAvailmentLabel, nfis) {
    if (purposeOfAvailmentId) {
      this.presenter.getMplPurposeOfAvailment(purposeOfAvailmentId, subCategoryId)
    } else {
      this.setState({
        purposeOfAvailmentId,
        purposeOfAvailmentLabel,
        showPurposeOfAvailment : false
      })
      this.presenter.getMplFormAttachments(purposeOfAvailmentLabel, nfis)
    }
  }

  updateOffsetLoan (id, name) {
    const {
      offsetLoanArray,
      offsetLoan,
      showOffsetList,
      offsetLoanFormArray,
    } = this.state

    const valueArr = offsetLoanArray.map(function(item) { return item.id } )
    const updatedOffsetLoan = [...offsetLoanArray]
    const updatedOffsetLoanId = [...offsetLoanFormArray]
    if (!valueArr.includes(id)) {
      updatedOffsetLoan.push({id, name})
      updatedOffsetLoanId.push(id)
    }

    this.setState({
      showOffsetLoan : false,
      offsetLoanArray : updatedOffsetLoan,
      offsetLoanFormArray : updatedOffsetLoanId
    })
  }

  validateInputAmount (resp) {
    this.setState({ desiredAmount : Functions.checkedValidateAmount(resp) })
  }

  render () {
    const {
      showNoticeModal,
      showNoticeResponseModal,
      showModeOfLoan,
      showTermOfLoan,
      showOffsetLoan,
      showPurposeOfAvailment,
      showConfirmationModal,
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
      offsetLoan,
      offsetLoanArray,
      status,
      review,
      response,
      noticeResponse,
      isValid,
      showLoading,
      supplier,
      nfis,
      desiredAmount ,
      desiredAmountFunc
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
          showLoading &&
          <LoaderModal text = { 'Please wait while we\'re submitting your application' }/>
        }
        {
          showConfirmationModal &&
          <ConfirmationModal
            onClose = { () => this.setState({ showConfirmationModal : false }) }
            onYes = { () => this.addLoan() }
            text = { 'Are you sure you want to submit this application?' }
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
            label = { 'Purpose of Availment' }
            inputArray = { purposeOfAvailment && purposeOfAvailment.category }
            selectedArray = { (purposeOfAvailmentId, purposeOfAvailmentLabel) =>
              this.setPurposeOfAvailment(purposeOfAvailmentId, purposeOfAvailment.subCategoryLvl,purposeOfAvailmentLabel, nfis) } //response
            onClose = { () => this.setState({showPurposeOfAvailment : false}) }

          />
        }
        {
          showModeOfLoan &&
          <SingleInputModal
            label = { 'Mode of Loan' }
            inputArray = { modeOfLoan }
            selectedArray = { (modeOfLoanId, modeOfLoanLabel) =>
              this.updateModeOfLoan(modeOfLoanId, modeOfLoanLabel) }
            onClose = { () => this.setState({showModeOfLoan : false}) }
          />
        }
        {
          showTermOfLoan &&
          <SingleInputModal
            label = { 'Term of Loan' }
            inputArray = { termOfLoan }
            selectedArray = { (termOfLoanId, termOfLoanLabel) =>
              this.setState({ termOfLoanId, termOfLoanLabel, showTermOfLoan : false }) }
            onClose = { () => this.setState({showTermOfLoan : false}) }
          />
        }
        {
          showOffsetLoan &&
          <SingleInputModal
            label = { 'Promissory Notes' }
            inputArray = { offsetLoan }
            selectedArray = { (offsetLoanId, offsetLoanValue) =>
              this.updateOffsetLoan(offsetLoanId, offsetLoanValue) }
            onClose = { () => this.setState({showOffsetLoan : false}) }
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
            Computer Loan
          </h2>
        </div>
        <br/>
        {
          isValid ?
            <ComputerLoanCardComponent
              showTermOfLoan = { () => this.setState({ showTermOfLoan : true }) }
              showModeOfLoan = { () => this.setState({ showModeOfLoan : true }) }
              showPurposeOfAvailment = { () => this.setState({ showPurposeOfAvailment : true }) }
              showOffsetLoan = { () => this.setState({ showOffsetLoan : true }) }
              fileAttachments = { fileAttachments }
              termOfLoan = { termOfLoanLabel }
              purposeOfAvailment = { purposeOfAvailmentLabel }
              modeOfLoan = { modeOfLoanLabel }
              modeOfLoanId = { modeOfLoanId }
              offsetLoan = { offsetLoanArray }
              desiredAmount = { desiredAmount }
              desiredAmountFunc  = { (desiredAmount) => this.validateInputAmount(desiredAmount) }
              onClick = { () => this.submitForm() }
              supplierName = { (supplier) => this.supplierFunc(supplier) }
              status = { status }
              review = { review }
              setAttachments = { (updatedAttachments) => this.setFileAttachments(updatedAttachments) }
              updateForm = { () => this.setState({ review : false, status : 'Next' }) }
            />
            :
            <center>
              <CircularLoader show = { true }/>
            </center>
        }
        </div>
    )
  }
}
export default ConnectView(ComputerLoanFragment, Presenter)
