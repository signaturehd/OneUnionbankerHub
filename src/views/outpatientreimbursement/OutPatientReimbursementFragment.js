import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/OutPatientReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal,
  MultipleInputModal,
} from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/OutPatientReimbursementFormCardComponent'

import * as OutPatientReimbursementFunction from
'./function/OutPatientReimbursementFunction'

import moment from 'moment'

class OutPatientReimbursementFragment extends BaseMVPView {
  constructor (props) {
    super (props)
      this.state = {
        showNoticeModal : false,
        showNoticeResponseModal : false,
        showBenefitFeedbackModal : false,
        noticeResponse : '',
        enabledLoader : false,
        outpatientData : [],
        procedureData : [],
        dependentId: null,
        dependentName: null,
        procedureId: null,
        procedureName: null,
        procedureArray: [],
        showDepedendent: false,
        showProcedure: false,
        amount: '',
        diagnosisText : '',
        orNumberText: '',
        diagnosisTextErrorMessage : null,
        dependentErrorMessage: null,
        procedureErrorMessage: null,
        orNumberTextErrorMessage: null,
        amountErrorMessage: null,
        dateErrorMessage: null,
        attachmentErrorMessage: null,
        errorMessageRequiredProcedure: null,
        preferredDate: '',
        showProcedureInput: false,
        attachmentsData: [],
        attachmentArray: [],
        showEditSubmitButton: false
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateOutPatientReimbursement()
  }

  noticeOfUndertaking (noticeResponse) {
   this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showValidatedOutPatient (outpatientData) {
    this.setState({ outpatientData })
  }

  showProcedureMap (procedureData) {
    this.setState({ procedureData })
  }

  showAttachmentsMap (attachmentsData) {
    this.setState({ attachmentsData })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  showDependentModal (showDepedendent) {
    this.setState({ showDepedendent })
  }

  showProcedureModal (showProcedure) {
    this.setState({ showProcedure })
  }

  getFileAttachments (attachmentArray) {
    this.setState({ attachmentArray })
  }

  validateAmount (e) {
    const validate = OutPatientReimbursementFunction.checkedAmount(e)
    this.setState({ amount : validate })
  }

  validateText (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateText(e)
    this.setState({ diagnosisText : validate })
  }

  validateSymbol (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateSymbol(e)
    this.setState({ orNumberText : validate.toUpperCase() })
  }

  validateDate (e) {
    const validate = OutPatientReimbursementFunction.checkedMDYDate(e)
    this.setState({ preferredDate : validate })
  }

  validateRequired (e) {
    return OutPatientReimbursementFunction.checkedValidateInput(e)
  }

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false })
  }

  submitForm () {
    /*submission*/
  }

  showFormReviewFieldDisabled (e) {
    const {
      dependentName,
      procedureName,
      diagnosisText,
      orNumberText,
      preferredDate,
      amount,
      attachmentArray
    } = this.state

    if(this.validateRequired(!dependentName)) {
      this.setState({ dependentErrorMessage : 'Please select recipient' })
    } else if (this.validateRequired(!diagnosisText)) {
      this.setState({ diagnosisTextErrorMessage : 'Please enter the diagnosis' })
    } else if (this.validateRequired(!orNumberText)) {
      this.setState({ orNumberTextErrorMessage : 'Please enter the Official Receipt Number' })
    } else if (this.validateRequired(!procedureName)) {
      this.setState({ errorMessageRequiredProcedure : 'Please select a Procedure' })
    } else if (this.validateRequired(!amount)) {
      this.setState({ amountErrorMessage : 'Please enter the amount for the selected procedure'})
    } else if (this.validateRequired(!preferredDate)) {
      this.setState({ dateErrorMessage : 'Date field is required' })
    } else {
      this.setState({
        diagnosisTextErrorMessage: '',
        dependentErrorMessage: '',
        procedureErrorMessage: '',
        orNumberTextErrorMessage: '',
        dateErrorMessage: '',
        attachmentErrorMessage: '',
        amountErrorMessage: '',
        errorMessageRequiredProcedure: '',
        showEditSubmitButton: true,
      })
    }
  }

  render () {
    const {
      showNoticeModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      noticeResponse,
      enabledLoader,
      showDepedendent,
      showProcedure,
      outpatientData,
      procedureData,
      dependentId,
      dependentName,
      procedureId,
      procedureName,
      diagnosisText,
      orNumberText,
      preferredDate,
      amount,
      showProcedureInput,
      attachmentsData,
      attachmentArray,
      diagnosisTextErrorMessage,
      dependentErrorMessage,
      procedureErrorMessage,
      orNumberTextErrorMessage,
      amountErrorMessage,
      dateErrorMessage,
      attachmentErrorMessage,
      errorMessageRequiredProcedure,
      showEditSubmitButton
    } = this.state

    const {
      selectedArray,
      classProp
    } = this.props

    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '41' }
            onDismiss={ (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
          />
        }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId={ '41' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/medical'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }
        {
          showDepedendent &&
          <SingleInputModal
            label = { 'Dependents' }
            inputArray = { outpatientData && outpatientData.dependents }
            selectedArray = { (dependentId, dependentName) =>
              this.setState({ dependentId, dependentName, showDepedendent : false }) }
            onClose = { () => this.setState({ showDepedendent : false }) }
          />
        }
        {
          showProcedure &&
          <SingleInputModal
            label = { 'Procedure' }
            inputArray = { procedureData }
            selectedArray = { (procedureId, procedureName) => {
              this.setState({
                procedureName,
                procedureId,
                showProcedure : false,
                showProcedureInput : true
                })
              }
            }
            onClose = { () => this.setState({ showProcedure : false }) }
          />
        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            OUTPATIENT REIMBURSEMENT
          </h2>
        </div>
        {
          enabledLoader ?
          <center className = { 'circular-loader-center' }>
            <CircularLoader show = { true }/>
          </center> :
          <FormComponent
            oRNumberFunc = { (resp) => this.validateSymbol(resp) }
            procedureModalFunc = { (resp) => this.showProcedureModal(resp) }
            diagnosisValueFunc = { (resp) => this.validateText(resp) }
            requestDepdentModalFunc = { (resp) => this.showDependentModal(resp) }
            dateFunc = { (resp) => this.validateDate(resp) }
            selectedProcedureAmount = { (resp) => this.validateAmount(resp) }
            showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
            setAttachmentArrayFunc = { (resp) => this.getFileAttachments(resp) }
            onSubmitFunc = { () => this.submitForm() }
            editFormDataFunc = { () => this.editFormReview() }
            dependentName = { dependentName }
            amount = { amount }
            diagnosisText = { diagnosisText }
            orNumberText = { orNumberText }
            preferredDate = { preferredDate }
            procedureName = { procedureName }
            showProcedureInput = { showProcedureInput }
            attachmentsData = { attachmentsData }
            diagnosisTextErrorMessage = { diagnosisTextErrorMessage }
            dependentErrorMessage = { dependentErrorMessage }
            procedureErrorMessage = { procedureErrorMessage }
            orNumberTextErrorMessage = { orNumberTextErrorMessage }
            amountErrorMessage = { amountErrorMessage }
            dateErrorMessage = { dateErrorMessage }
            attachmentErrorMessage = { attachmentErrorMessage }
            showEditSubmitButton = { showEditSubmitButton }
            errorMessageRequiredProcedure = { errorMessageRequiredProcedure }
          />
        }
      </div>
    )
  }
}

OutPatientReimbursementFragment.propTypes = {
  selectedArray : PropTypes.func,
  classProp : PropTypes.string,
}

export default ConnectView(OutPatientReimbursementFragment, Presenter)
