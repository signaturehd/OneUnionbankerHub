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

import './styles/maternityComponentStyle.css'

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
    oRNumberFunc,
    setAttachmentArrayFunc,
    onSubmitFunc,
    dateFunc,
    requestTypeOfDeliveryFunc,
    editFormDataFunc,
    dateOfDelivertFunc,
    showFormReview,
    showEditSubmitButton,
    setAttachments,
    typeDeliveryName,
    preferredDate,
    deliveryDate,
    amount,
    desiredAmountFunc,
    diagnosisText,
    orNumberText,
    attachmentsData,
    dateErrorMessage,
    orNumberErrorMessage,
    amountErrorMessage,
    typeOfDeliveryErrorMessage,
    dateOfDeliveryErrorMessage
  } = this.props

  return (
    <div className={ 'outpatient-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div></div>
        <div>
          <div className={ 'outpatient-form-card' }>
            <div className={ 'outpatient-form-card-body' }>
              <GenericInput
                value = { typeDeliveryName }
                onClick = { () => requestTypeOfDeliveryFunc(true) }
                text = { 'Type of Delivery' }
                disabled = { showEditSubmitButton }
                errorMessage = { typeOfDeliveryErrorMessage }
                type = { 'text' }/>
                <br/>
              <DatePicker
                selected = { deliveryDate }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateOfDelivertFunc(e) }
                minDate = { moment() }
                text = { 'Date of Delivery' }
                errorMessage = { dateOfDeliveryErrorMessage }
                />
                <br/>
              <GenericInput
                hint = { 'Enter Amount' }
                text = { 'Amount' }
                value = { amount }
                errorMessage = { amountErrorMessage }
                disabled = { showEditSubmitButton }
                onChange = { e => {
                    desiredAmountFunc(e.target.value)
                  }
                }
                type = { 'text' } />
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
                    text = { 'Continue' }
                    onClick = {
                      () => showFormReview()
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
  desiredAmountFunc : PropTypes.func,
  editFormDataFunc : PropTypes.func,
  showFormReview: PropTypes.func,
  requestTypeOfDeliveryFunc: PropTypes.func,
  dateOfDelivertFunc: PropTypes.func,
  setAttachments: PropTypes.func,
  typeDeliveryName : PropTypes.string,
  amount : PropTypes.string,
  orNumberText : PropTypes.string,
  preferredDate : PropTypes.string,
  deliveryDate : PropTypes.string,
  dateFunc : PropTypes.func,
  oRNumberFunc : PropTypes.func,
  amountErrorMessage: PropTypes.string,
  dateErrorMessage: PropTypes.string,
  orNumberErrorMessage: PropTypes.string,
  typeOfDeliveryErrorMessage: PropTypes.string,
  dateOfDeliveryErrorMessage: PropTypes.string,
  attachments: PropTypes.array,
  showEditSubmitButton: PropTypes.bool,
  onSubmitFunc : PropTypes.func,
}

export default MaternityAssistanceCardComponent
