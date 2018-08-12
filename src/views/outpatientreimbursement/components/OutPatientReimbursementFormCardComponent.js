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

import moment from 'moment'

class OutPatientReimbursementFormCardComponent extends Component {
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
    setAttachmentArrayFunc,
    dateFunc,
    preferredDate,
    dependentName,
    procedureName,
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
    amountErrorMessage,
    procedureArray
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
            <GenericInput
              value = { diagnosisText }
              onChange = { (e) => diagnosisValueFunc(e.target.value) }
              text = { 'Diagnosis' }
              disabled = { showEditSubmitButton }
              errorMessage = { diagnosisErrorMessage }
              type = { 'text' }/>
            <DatePicker
              selected = { preferredDate }
              disabled = { showEditSubmitButton }
              onChange = { (e) => dateFunc(e) }
              maxDate = { moment() }
              text = { 'Official Receipt Date' }
              errorMessage = { dateErrorMessage }
              />
            <GenericInput
              value = { orNumberText }
              disabled = { showEditSubmitButton }
              onChange = { (e) => oRNumberFunc(e.target.value) }
              text = { 'Official Receipt Number' }
              errorMessage = { orNumberErrorMessage }
              type = { 'text' }/>
              <div className = { 'outpatient-grid-procedure' }>
                <div>
                  <h2 className = { 'unionbank-color font-size-12px' }>
                    { errorMessageRequiredProcedure }
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
                  procedureArray.map((resp, key) =>
                    <GenericInput
                      hint = { 'Enter Amount' }
                      text = { resp.name }
                      value = { resp.amount ? resp.amount : 0 }
                      errorMessage = {
                        resp.amount === 0  ?
                        'Please enter an amount for the selected procedure' :
                        ''
                      }
                      disabled = { showEditSubmitButton }
                      onChange = { e =>
                        {
                         const updatedProcedures = [...procedureArray]
                         updatedProcedures[key].amount = parseInt(e.target.value) || 0
                         selectedProcedureAmountFunc(updatedProcedures)
                        }
                      }
                      type = { 'text' } />
                  )
                : <div></div>
              }
            </div>
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

OutPatientReimbursementFormCardComponent.propTypes = {
  requestDepdentModalFunc : PropTypes.func,
  desiredAmount : PropTypes.func,
  procedureModalFunc : PropTypes.func,
  editFormDataFunc : PropTypes.func,
  diagnosisValueFunc : PropTypes.func,
  selectedProcedureAmountFunc: PropTypes.func,
  showFormReview: PropTypes.func,
  setAttachmentArrayFunc: PropTypes.func,
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
  procedureArray : PropTypes.array,
}

export default OutPatientReimbursementFormCardComponent
