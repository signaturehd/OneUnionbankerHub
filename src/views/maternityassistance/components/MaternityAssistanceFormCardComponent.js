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
    dateOfDeliveryErrorMessage,
    recipient
  } = this.props

  return (
    <div className={ 'outpatient-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div></div>
        <div>
          <Line/>
          <div className={ 'outpatient-form-card' }>
            <div className={ 'outpatient-form-card-body' }>
              <GenericInput
                value = { recipient }
                text = { 'Recipient' }
                readOnly
                disabled = { true }
                type = { 'text' }/>
              <GenericInput
                value = { typeDeliveryName }
                onClick = { () => requestTypeOfDeliveryFunc(true) }
                text = { 'Type of Delivery' }
                disabled = { showEditSubmitButton }
                errorMessage = { typeOfDeliveryErrorMessage }
                type = { 'text' }/>
              <DatePicker
                selected = { deliveryDate }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateOfDelivertFunc(e) }
                text = { 'Date of Delivery' }
                maxDate = { moment().add(9, 'months') }
                errorMessage = { dateOfDeliveryErrorMessage }
                />
              <GenericInput
                hint = { 'Enter Amount' }
                text = { 'Amount' }
                value = { amount }
                errorMessage = { amountErrorMessage }
                disabled = { typeDeliveryName ? showEditSubmitButton : true }
                onChange = { e => {
                    desiredAmountFunc(e.target.value)
                  }
                }
                type = { 'text' } />
              {
                moment(deliveryDate).format('MM DD YYYY') <=
                moment().format('MM DD YYYY') &&
              <div>
                <DatePicker
                  selected = { preferredDate }
                  disabled = { showEditSubmitButton }
                  onChange = { (e) => dateFunc(e) }
                  maxDate = { moment(deliveryDate) }
                  text = { 'Official Receipt Date' }
                  errorMessage = { dateErrorMessage }
                  />
                <GenericInput
                  value = { orNumberText }
                  disabled = { showEditSubmitButton }
                  maxLength = { 20 }
                  onChange = { (e) => oRNumberFunc(e.target.value) }
                  text = { 'Official Receipt Number' }
                  errorMessage = { orNumberErrorMessage }
                  type = { 'text' }/>
              </div>
              }
            </div>
              {
                attachmentsData.length !== 0  &&
                <div>
                  {
                    moment(deliveryDate).format('MM DD YYYY') <=
                    moment().format('MM DD YYYY') ?
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
                  :
                    <MultipleFileUploader
                      placeholder = { 'Form Attachments' }
                      fileArray = { attachmentsData.slice(1) }
                      setFile = { (resp) => setAttachmentArrayFunc(resp) }
                      disabled = { showEditSubmitButton }
                      errorMessage = {
                        showEditSubmitButton ?
                        '' :
                        `Please upload the required attachments`  }
                    />
                  }
                </div>
              }
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
  recipient: PropTypes.string,
  attachments: PropTypes.array,
  showEditSubmitButton: PropTypes.bool,
  onSubmitFunc : PropTypes.func,
}

export default MaternityAssistanceCardComponent
