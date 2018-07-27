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

import * as controller from '../function/OutPatientReimbursementFunction'

class OutPatientReimbursementFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {

  const {
    requestDepdentModalFunc,
    diagnosisValueFunc,
    desiredAmountFunc,
    oRNumberFunc,
    procedureModalFunc,
    setAttachmentArrayFunc,
    dateFunc,
    preferredDate,
    dependentName,
    procedureName,
    procedureArray,
    amount,
    diagnosisText,
    orNumberText,
    selectedProcedureAmount,
    showProcedureInput,
    errorMessageRequiredProcedure,
    attachmentsData,
    showFormReview,
    showEditSubmitButton,
    onSubmitFunc,
    editFormDataFunc
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
              hint = { 'Recipient' }
              readOnly
              disabled = { showEditSubmitButton }
              text = { 'Recipient' }
              onClick = { () => requestDepdentModalFunc(true) }
              type = { 'text' }
              errorMessage = { controller.checkedDiagnosisRequired(dependentName) }
              />
            <br/>
            <GenericInput
              value = { diagnosisText }
              onChange = { (e) => diagnosisValueFunc(e.target.value) }
              hint = { 'Diagnosis' }
              text = { 'Diagnosis' }
              disabled = { showEditSubmitButton }
              errorMessage = { controller.checkedDiagnosisRequired(diagnosisText) }
              type = { 'text' }/>
              <br/>
            <DatePicker
              selected = { preferredDate }
              disabled = { showEditSubmitButton }
              onChange = { (e) => dateFunc(e) }
              hint = { 'Official Receipt Date' }
              text = { 'Official Receipt Date' }
              errorMessage = { controller.checkedOrDateRequired(preferredDate) }
              />
              <br/>
            <GenericInput
              value = { orNumberText }
              disabled = { showEditSubmitButton }
              onChange = { (e) => oRNumberFunc(e.target.value) }
              hint = { 'Official Receipt Number' }
              text = { 'Official Receipt Number' }
              errorMessage = { controller.checkedOrNumberRequired(orNumberText) }
              type = { 'text' }/>
              <br/>
              <div className = { 'outpatient-grid-procedure' }>
                <div>
                  <h2 className = { 'unionbank-color font-size-12px' }>
                    { errorMessageRequiredProcedure ? errorMessageRequiredProcedure : '' }
                  </h2>
                </div>
                <div>
                  <GenericButton
                    className = { 'outpatient-procedure' }
                    onClick = { () => procedureModalFunc(true) }
                    text = { 'Procedure' }/>
                </div>
              </div>
              {
                showProcedureInput ?

                <GenericInput
                  hint = { procedureName }
                  text = { procedureName }
                  errorMessage = { '' }
                  disabled = { showEditSubmitButton }
                  onChange = { e => {
                      selectedProcedureAmount(parseInt(e.target.value) || 0)
                    }
                  }
                  type = { 'text' } />
                : <div></div>
              }
            </div>
            <br/>
              {
                attachmentsData.length !== 0  ?
                <div>
                  <MultipleFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachmentsData }
                    getFile = { (resp) => setAttachmentArrayFunc(resp) }
                    disabled = { showEditSubmitButton }
                    errorMessage = { 'Please include required attachment' }
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

OutPatientReimbursementFormCardComponent.propTypes = {
  requestDepdentModalFunc : PropTypes.func,
  dependentName : PropTypes.string,
  desiredAmount : PropTypes.func,
  procedureModalFunc : PropTypes.func,
  amount : PropTypes.string,
  orNumberText : PropTypes.string,
  preferredDate : PropTypes.string,
  diagnosisValueFunc : PropTypes.func,
  dateFunc : PropTypes.func,
  oRNumberFunc : PropTypes.func,
  diagnosisText: PropTypes.string,
  procedureName: PropTypes.string,
  errorMessageRequiredProcedure: PropTypes.string,
  selectedProcedureAmount: PropTypes.func,
  setAttachmentArrayFunc: PropTypes.func,
  showProcedureInput: PropTypes.bool,
  attachments: PropTypes.array,
  showFormReview: PropTypes.func,
  showEditSubmitButton: PropTypes.bool,
  onSubmitFunc : PropTypes.func,
  editFormDataFunc : PropTypes.func
}

export default OutPatientReimbursementFormCardComponent
