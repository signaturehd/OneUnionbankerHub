import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  MultipleFileUploader,
  DatePicker,
  Line
} from '../../../ub-components/'

import './styles/outpatientComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import * as controller from '../function/MaternityAssistanceFunction'

import moment from 'moment'

class MaternityAssistanceCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {

  const {
    requestDepdentModalFunc,
    diagnosisValueFunc,
    oRNumberFunc,
    procedureModalFunc,
    selectedProcedureAmountFunc,
    setAttachments,
    dateFunc,
    preferredDate,
    dependentName,
    procedureName,
    procedureArray,
    amount,
    diagnosisText,
    orNumberText,
    showProcedureInput,
    attachmentsData,
    showFormReview,
    showEditSubmitButton,
    onSubmitFunc,
    editFormDataFunc,
    dependentErrorMessage,
    diagnosisErrorMessage,
    errorMessageRequiredProcedure,
    dateErrorMessage,
    orNumberErrorMessage,
    amountErrorMessage
  } = this.props

  return (
    <div className={ 'outpatient-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div></div>
        <div>
          <div className={ 'outpatient-form-card' }>
            <div className={ 'outpatient-form-card-body' }>
              <GenericInput
                value = { dependentName }
                readOnly
                disabled = { showEditSubmitButton }
                text = { 'Recipient' }
                onClick = { () => requestDepdentModalFunc(true) }
                type = { 'text' }
                errorMessage = { dependentErrorMessage }
                />
              <br/>
              <GenericInput
                value = { diagnosisText }
                onChange = { (e) => diagnosisValueFunc(e.target.value) }
                text = { 'Diagnosis' }
                disabled = { showEditSubmitButton }
                errorMessage = { diagnosisErrorMessage }
                type = { 'text' }/>
                <br/>
              <DatePicker
                selected = { preferredDate }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateFunc(e) }
                maxDate = { moment() }
                text = { 'Official Receipt Date' }
                errorMessage = { dateErrorMessage }
                />
                <br/>
              <GenericInput
                value = { orNumberText }
                disabled = { showEditSubmitButton }
                onChange = { (e) => oRNumberFunc(e.target.value) }
                text = { 'Official Receipt Number' }
                errorMessage = { orNumberErrorMessage }
                type = { 'text' }/>
                <br/>
              <GenericInput
                hint = { 'Enter Amount' }
                text = { 'Amount' }
                value = { amount }
                errorMessage = { amountErrorMessage }
                disabled = { showEditSubmitButton }
                onChange = { e => {
                    selectedProcedureAmountFunc(e.target.value)
                  }
                }
                type = { 'text' } />
            </div>
            <br/>
              {
                attachmentsData.length !== 0  ?
                <div>
                  <MultipleFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachmentsData }
                    setFile = { (resp) => setAttachmentArrayFunc(resp) }
                    disabled = { showEditSubmitButton }
                    errorMessage = {
                      showEditSubmitButton ?
                      '' :
                      `Please upload the required attachments`  }
                  />
                </div>
                :
                <div></div>
              }
              <br/>
              <Line/>
              <br/>
              {
                showEditSubmitButton ?
                <div className = { 'outpatient-form-review' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Edit' }
                    className = { 'outpatient-edit-form' }
                    onClick = { () =>
                      editFormDataFunc()
                      }
                    />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = { () => onSubmitFunc() }
                    className = { 'outpatient-submit-form-button' }
                    />
                </div>
                :
                <div>
                  <GenericButton
                    type = { 'button' }
                    text = { 'continue' }
                    onClick = {
                      () => showFormReview(true)
                    }
                    className = { 'outpatient-submit' } />
                </div>
              }
          </div>
        </div>
      </div>
    </div>
    )
  }
}

MaternityAssistanceCardComponent.propTypes = {
  requestDepdentModalFunc : PropTypes.func,
  desiredAmount : PropTypes.func,
  procedureModalFunc : PropTypes.func,
  editFormDataFunc : PropTypes.func,
  diagnosisValueFunc : PropTypes.func,
  selectedProcedureAmountFunc: PropTypes.func,
  showFormReview: PropTypes.func,
  setAttachments: PropTypes.func,
  dependentName : PropTypes.string,
  amount : PropTypes.string,
  orNumberText : PropTypes.string,
  preferredDate : PropTypes.string,
  dateFunc : PropTypes.func,
  oRNumberFunc : PropTypes.func,
  diagnosisText: PropTypes.string,
  procedureName: PropTypes.string,
  dependentErrorMessage: PropTypes.string,
  errorMessageRequiredProcedure: PropTypes.string,
  diagnosisErrorMessage: PropTypes.string,
  amountErrorMessage: PropTypes.string,
  dateErrorMessage: PropTypes.string,
  orNumberErrorMessage: PropTypes.string,
  showProcedureInput: PropTypes.bool,
  attachments: PropTypes.array,
  showEditSubmitButton: PropTypes.bool,
  onSubmitFunc : PropTypes.func,
}

export default MaternityAssistanceCardComponent
