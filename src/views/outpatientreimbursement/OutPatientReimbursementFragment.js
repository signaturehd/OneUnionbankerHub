import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/OutPatientReimbursementPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal,
  MultipleInputModal,
  Modal,
  GenericButton
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
        showDepedendent: false,
        showProcedure: false,
        enabledLoader : false,
        dependentId: null,
        procedureId: null,
        showProcedureInput: false,
        showEditSubmitButton: false,
        titleChange: true,
        attachmentsData: [],
        attachmentArray: [],
        procedureArray: [],
        outpatientData : [],
        procedureData : [],
        updateTotalAmount : [],
        limit: '',
        procedureName: '',
        amount: '',
        noticeResponse : '',
        dependentName: '',
        diagnosisText : '',
        orNumberText: '',
        preferredDate: '',
        attachmentErrorMessage: '',
        dependentErrorMessage: '',
        diagnosisErrorMessage: '',
        dateErrorMessage: '',
        orNumberErrorMessage: '',
        amountErrorMessage : '',
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateOutPatientReimbursement()
  }

  noticeOfUndertaking (noticeResponse) {
   this.setState({ showNoticeModal : true, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({ noticeResponse })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showValidatedOutPatient (outpatientData, limit) {
    this.setState({ outpatientData, limit })
  }

  showProcedureMap (procedureData) {
    this.setState({ procedureData })
  }

  showAttachmentsMap (attachmentsData) {
    this.setState({ attachmentsData })
  }

  showErrorMessage (showErrorMessageModal, showErrorMessageValidate) {
    this.setState({ showErrorMessageModal, showErrorMessageValidate })
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
    const {
      updateTotalAmount,
      limit,
    } = this.state
    const newValueArray = procedureArray.map(function(resp) {
      return resp.amount
    })
    const totalAmount = newValueArray.reduce((a, b) => a + b, 0)
    const validate = OutPatientReimbursementFunction.checkedAmount(totalAmount)
    if(parseInt(totalAmount) > parseInt(limit)) {
      this.setState({
        amount: totalAmount,
        errorMessageRequiredProcedure : `The amount you entered must not exceed to ${ limit }`
      })
    } else {
      this.setState({
        procedureArray,
        amountErrorMessage : '',
        amount: totalAmount,
        errorMessageRequiredProcedure : ''
      })
    }
  }

  validateText (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateText(e)
    this.setState({ diagnosisText : validate , diagnosisErrorMessage : '' })
  }

  validateSymbol (e) {
    const validate = OutPatientReimbursementFunction.checkedValidateSymbol(e)
    this.setState({ orNumberText : validate, orNumberErrorMessage : '' })
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
      procedureArray,
      preferredDate,
      orNumberText,
      amount,
      attachmentArray
    } = this.state

    const type = dependentId !== 1 ? 2 : 1
    this.presenter.addOutPatientReimbursement(
      type.toString(),
      dependentId.toString(),
      diagnosisText.toString(),
      procedureArray,
      orNumberText.toString(),
      moment(preferredDate).format('MM/DD/YYYY'),
      amount,
      attachmentArray)
  }

  showFormReviewFieldDisabled (e) {
    const {
      dependentName,
      procedureArray,
      diagnosisText,
      orNumberText,
      preferredDate,
      amount,
      limit,
      attachmentArray
    } = this.state
    let validateAttachments = false
    attachmentArray && attachmentArray.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    if(!this.validateRequired(dependentName)) {
     this.setState({ dependentErrorMessage : 'Please select your recipient' })
    } else if (!this.validateRequired(diagnosisText)) {
      this.setState({ diagnosisErrorMessage : 'Please enter the diagnosis' })
    } else if (!this.validateRequired(preferredDate)) {
      this.setState({ dateErrorMessage : 'Please provide the Official Receipt Date' })
    } else if (!this.validateRequired(orNumberText)) {
      this.setState({ orNumberErrorMessage : 'Please provide the Official Receipt Number' })
    } else if (!this.validateRequired(amount)) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Outpatient Reimbursement',
          message : `Please choose procedure and enter the amount required`,
          type : 'warning',
          duration : 2000
        })
      )
    } else if (parseInt(amount) > parseInt(limit)) {
      store.dispatch(NotifyActions.addNotify({
          title : 'Outpatient Reimbursement',
          message : `The amount you entered exceed to the limit of ${ limit }`,
          type : 'warning',
          duration : 2000
        })
      )
    } else if (!procedureArray.length) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Warning' ,
         message : 'Procedure is required',
         type : 'warning',
         duration : 2000
       })
     )
    } else if (!attachmentArray.length) {
       store.dispatch(NotifyActions.addNotify({
          title : 'Warning' ,
          message : 'Attachments is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (validateAttachments) {
      attachmentArray && attachmentArray.map(
        (attachment, key) => {
          if(!attachment.file) {
            store.dispatch(NotifyActions.addNotify({
               title : 'Warning' ,
               message : attachment.name + ' is required',
               type : 'warning',
               duration : 2000
             })
           )
          }
        }
      )
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
      titleChange,
      limit,
      updateTotalAmount,
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
            updateTotalAmount = { updateTotalAmount }
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
