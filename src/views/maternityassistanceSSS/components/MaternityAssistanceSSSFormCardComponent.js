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

import './styles/maternitySSSComponentStyle.css'

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
                value = { '' }
                onClick = { () => {} }
                text = { 'Room Number' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'House Number' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'Street Name' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'Subdivision' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'Barangay' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'City' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'Province' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'Zip Code' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                onClick = { () => {} }
                text = { 'Number Of Pregnancy' }
                disabled = { showEditSubmitButton }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <DatePicker
                selected = { deliveryDate }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateOfDelivertFunc(e) }
                minDate = { moment() }
                text = { 'Expected Date of Delivery' }
                errorMessage = { dateOfDeliveryErrorMessage }
                />
                <br/>
              <GenericInput
                value = { '' }
                disabled = { showEditSubmitButton }
                onChange = { (e) => {} }
                text = { 'Number of Delivery' }
                errorMessage = { '' }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { '' }
                disabled = { showEditSubmitButton }
                onChange = { (e) => {} }
                text = { 'Number of Miscarriage' }
                errorMessage = { '' }
                type = { 'text' }/>
            </div>
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
