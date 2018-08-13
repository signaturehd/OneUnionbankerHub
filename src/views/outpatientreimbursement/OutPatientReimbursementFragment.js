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
        dependentName: '',
        procedureId: null,
        procedureName: '',
        procedureArray: [],
        showDepedendent: false,
        showProcedure: false,
        amount: '',
        diagnosisText : '',
        orNumberText: '',
        preferredDate: '',
        showProcedureInput: false,
        attachmentsData: [],
        attachmentArray: [],
        showEditSubmitButton: false,
        attachmentErrorMessage: '',
        dependentErrorMessage: '',
        diagnosisErrorMessage: '',
        dateErrorMessage: '',
        orNumberErrorMessage: '',
        amountErrorMessage : '',
        titleChange: true,
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

  setFileAttachments (attachmentArray) {
    this.setState({ attachmentArray })
  }

  validateAmount (procedureArray) {
    // const validate = OutPatientReimbursementFunction.checkedAmount(e)
    this.setState({ procedureArray, amountErrorMessage : '' })
  }

  validateText (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateText(e)
    this.setState({ diagnosisText : validate , diagnosisErrorMessage : '' })
  }

  validateSymbol (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateSymbol(e)
    this.setState({ orNumberText : validate.toUpperCase(), orNumberErrorMessage : '' })
  }

  validateDate (e) {
    const validate = OutPatientReimbursementFunction.checkedMDYDate(e)
    this.setState({ preferredDate : validate, dateErrorMessage : '' })
  }

  validateRequired (e) {
    return OutPatientReimbursementFunction.checkedValidateInput(e)
  }

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false, titleChange : true })
  }

  submitForm () {
    const {
      dependentId,
      diagnosisText,
      procedureId,
      preferredDate,
      orNumberText,
      amount,
      attachmentArray
    } = this.state

    const type = dependentId !== 1 ? 2 : 1
    this.presenter.addOutPatientReimbursement(
      type,
      dependentId.toString(),
      procedureId.toString(),
      amount,
      diagnosisText.toString(),
      orNumberText.toString(),
      moment(preferredDate).format('MM/DD/YYYY'),
      attachmentArray)
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

    if(!this.validateRequired(dependentName)) {
     this.setState({ dependentErrorMessage : 'Please select your recipient' })
    } else if (!this.validateRequired(diagnosisText)) {
      this.setState({ diagnosisErrorMessage : 'Please enter the diagnosis' })
    } else if (!this.validateRequired(preferredDate)) {
      this.setState({ dateErrorMessage : 'Please provide the Official Receipt Date' })
    } else if (!this.validateRequired(orNumberText)) {
      this.setState({ orNumberErrorMessage : 'Please provide the Official Receipt Number' })
    } else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
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
      procedureArray,
      procedureId,
      procedureName,
      diagnosisText,
      orNumberText,
      preferredDate,
      amount,
      showProcedureInput,
      attachmentsData,
      attachmentArray,
      attachmentErrorMessage,
      dependentErrorMessage,
      diagnosisErrorMessage,
      dateErrorMessage,
      amountErrorMessage,
      errorMessageRequiredProcedure,
      orNumberErrorMessage,
      showEditSubmitButton,
      titleChange
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
              this.setState({
                dependentId,
                dependentName,
                showDepedendent : false,
                dependentErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showDepedendent : false }) }
          />
        }
        {
          showProcedure &&
          <MultipleInputModal
            label = { 'Procedure' }
            inputArray = { procedureData }
            onSelect = { (procedure) => {
              const updateProcedure = [...procedureArray]
              updateProcedure.push(procedure)
              this.setState({
                procedureArray: updateProcedure,
                showProcedure : false,
                showProcedureInput : true,
                errorMessageRequiredProcedure : ''
                })
              }
            }
            procedureArray = { procedureArray }
            onClose = { () => this.setState({ showProcedure : false }) }
          />
        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          {
            titleChange ?
            <h2 className = { 'header-margin-default' }>
              Outpatient Reimbursement
            </h2>
            :
            <h2 className = { 'header-margin-default' }>
              Form Summary
            </h2>
          }
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
            selectedProcedureAmountFunc = { (resp) => this.validateAmount(resp) }
            showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
            setAttachmentArrayFunc = { (updatedAttachments) => this.setFileAttachments(updatedAttachments) }
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
            showEditSubmitButton = { showEditSubmitButton }
            errorMessageRequiredProcedure = { errorMessageRequiredProcedure }
            attachmentErrorMessage = { attachmentErrorMessage }
            dependentErrorMessage = { dependentErrorMessage }
            diagnosisErrorMessage = { diagnosisErrorMessage }
            dateErrorMessage = { dateErrorMessage }
            orNumberErrorMessage = { orNumberErrorMessage }
            amountErrorMessage = { amountErrorMessage }
            procedureArray = { procedureArray }
            employeeName = { outpatientData.name }
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
