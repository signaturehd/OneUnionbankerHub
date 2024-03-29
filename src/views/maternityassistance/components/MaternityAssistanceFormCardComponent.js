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
    showFormReviewDisabledORFunc,
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
    <div className={ 'maternity-container' }>
      <div className={ 'maternity-grid-column-2' }>
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
                readOnly
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
                onFocus = { true }
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
                  minDate = { moment(deliveryDate) }
                  maxDate = { moment() }
                  selected = { preferredDate }
                  disabled = { showEditSubmitButton }
                  onChange = { (e) => dateFunc(e) }
                  text = { 'Official Receipt Date' }
                  readOnly
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
                    moment().format('MM DD YYYY') &&
                    <MultipleFileUploader
                      placeholder = { 'Form Attachments' }
                      fileArray = { attachmentsData }
                      setFile = { (resp) => setAttachmentArrayFunc(resp) }
                      disabled = { showEditSubmitButton }
                      errorMessage = {
                        showEditSubmitButton ?
                        '' :
                        ''  }
                    />
                  }
                </div>
               }
               <br/>
               <Line/>
               {
                 showEditSubmitButton &&
                 <center>
                   <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
                 </center>
               }
               <br/>
              {
                showEditSubmitButton ?
                <div className = { 'maternity-form-review' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Edit' }
                    className = { 'maternity-edit-form' }
                    onClick = { () =>
                      editFormDataFunc()
                      }
                    />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = { () => onSubmitFunc() }
                    className = { 'maternity-submit-form-button' }
                    />
                </div>
                :
                <div>
                  {
                      moment(deliveryDate).format('MM DD YYYY') <=
                      moment().format('MM DD YYYY') ?
                      <GenericButton
                        type = { 'button' }
                        text = { 'Continue' }
                        onClick = {
                          () => showFormReview()
                        }
                        className = { 'outpatient-submit' } /> :
                      <GenericButton
                        type = { 'button' }
                        text = { 'Continue' }
                        onClick = {
                          () => showFormReviewDisabledORFunc()
                        }
                        className = { 'outpatient-submit' } />
                  }
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
  showFormReviewDisabledORFunc : PropTypes.func,
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
