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

class MaternityAssistanceSSSFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {

    const {
      recipient,
      onSubmitFuncSSS,
      dateFunc,
      editFormDataFunc,
      dateOfDelivertFunc,
      showFormReviewSSS,
      showEditSubmitButton,
      deliveryDate,
      dateErrorMessage,
      dateOfDeliveryErrorMessage,
      roomNumberText,
      roomNumberErrorMessage,
      roomNumberFunc,
      houseNumberText,
      houseNumberErrorMessage,
      houseNumberFunc,
      streetNameText,
      streetNameErrorMessage,
      streetNameFunc,
      subdivisionText,
      subdivisionErrorMessage,
      subdivisionFunc,
      barangayText,
      barangayErrorMessage,
      barangayFunc,
      cityText,
      cityErrorMessage,
      cityFunc,
      provinceText,
      provinceErrorMessage,
      provinceFunc,
      zipCodeText,
      zipCodeErrorMessage,
      zipCodeFunc,
      noPregnancyText,
      noPregnancyErrorMessage,
      noPregnancyFunc,
      noDeliveryText,
      noDeliveryErrorMessage,
      noDeliveryFunc,
      noMiscarriageText,
      noMiscarriageErrorMessage,
      noMiscarriageFunc,
    } = this.props

    const total = parseInt(noMiscarriageText) + parseInt(noDeliveryText)

  return (
    <div className={ 'maternitySSS-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div>
        </div>
        <div>
          <Line/>
          <br/>
          <div className={ 'maternitySSS-form-card' }>
            <div className={ 'maternitySSS-form-card-body' }>
              {
                showEditSubmitButton &&
                <div>
                  <GenericInput
                    value = { recipient }
                    text = { 'Recipient' }
                    readOnly
                    disabled = { true }
                    type = { 'text' }/>
                </div>
              }
              <div className = { 'maternitySSS-grid-address' }>
                <div>
                  <GenericInput
                    value = { roomNumberText }
                    maxLength = { 20 }
                    onChange = { e => roomNumberFunc(e.target.value) }
                    text = { 'Room Number' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { roomNumberErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { houseNumberText }
                    maxLength = { 20 }
                    onChange = { e => houseNumberFunc(e.target.value) }
                    text = { 'House Number' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { houseNumberErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { streetNameText }
                    maxLength = { 40 }
                    onChange = { e => streetNameFunc(e.target.value) }
                    text = { 'Street Name' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { streetNameErrorMessage }
                    type = { 'text' }/>
                </div>
              </div>
              <GenericInput
                value = { subdivisionText }
                onChange = { e => subdivisionFunc(e.target.value) }
                text = { 'Subdivision' }
                disabled = { showEditSubmitButton }
                errorMessage = { subdivisionErrorMessage }
                type = { 'text' }/>
              <GenericInput
                value = { barangayText }
                onChange = { e => barangayFunc(e.target.value) }
                text = { 'Barangay/City/Locality' }
                disabled = { showEditSubmitButton }
                errorMessage = { barangayErrorMessage }
                type = { 'text' }/>
              <GenericInput
                value = { cityText }
                maxLength = { 20 }
                onChange = { e => cityFunc(e.target.value) }
                text = { 'City/Municipality' }
                disabled = { showEditSubmitButton }
                errorMessage = { cityErrorMessage }
                type = { 'text' }/>
              <div className = { 'maternity-grid-location' }>
                <div>
                  <GenericInput
                    value = { provinceText }
                    maxLength = { 20 }
                    onChange = { e => provinceFunc(e.target.value) }
                    text = { 'Province' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { provinceErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { zipCodeText }
                    onChange = { e => zipCodeFunc(e.target.value) }
                    text = { 'Zip Code' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { zipCodeErrorMessage }
                    maxLength = { 4 }
                    type = { 'text' }/>
                </div>
              </div>
              <div className = { 'grid-global-columns-x3' }>
                <div>
                  <GenericInput
                    value = { noPregnancyText }
                    onChange = { e => noPregnancyFunc(e.target.value) }
                    text = { 'Number of Pregnancy' }
                    disabled = { showEditSubmitButton }
                    maxLength = { 1 }
                    errorMessage = { noPregnancyErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { noDeliveryText }
                    disabled = { showEditSubmitButton }
                    onChange = { e => noDeliveryFunc(e.target.value)  }
                    text = { 'Number of Delivery' }
                    maxLength = { 1 }
                    errorMessage = {
                      parseInt(noDeliveryText) > parseInt(noPregnancyText) ?
                      'Error count of delivery' :
                      noDeliveryErrorMessage
                    }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { noMiscarriageText }
                    disabled = { showEditSubmitButton }
                    onChange = { e => noMiscarriageFunc(e.target.value) }
                    text = { 'Number of Miscarriage' }
                    maxLength = { 1 }
                    errorMessage = { '' }
                    type = { 'text' }/>
                </div>
              </div>
              <DatePicker
                selected = { deliveryDate }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateOfDelivertFunc(e) }
                minDate = { moment() }
                maxDate = { moment().add(9, 'months') }
                readOnly
                text = { 'Expected Date of Delivery' }
                errorMessage = { dateOfDeliveryErrorMessage }
                />
            </div>
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
                <div className = { 'maternitySSS-form-review' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Edit' }
                    className = { 'maternitySSS-edit-form' }
                    onClick = { () =>
                      editFormDataFunc()
                      }
                    />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = { () => onSubmitFuncSSS() }
                    className = { 'maternitySSS-submit-form-button' }
                    />
                </div>
                :
                <div>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Continue' }
                    onClick = {
                      () => showFormReviewSSS()
                    }
                    className = { 'maternitySSS-submit' } />
                </div>
              }
          </div>
        </div>
      </div>
    </div>
    )
  }
}

MaternityAssistanceSSSFormCardComponent.propTypes = {
  recipient : PropTypes.string,
  editFormDataFunc : PropTypes.func,
  showFormReviewSSS: PropTypes.func,
  dateOfDeliveryFunc: PropTypes.func,
  deliveryDate : PropTypes.string,
  dateFunc : PropTypes.func,
  dateErrorMessage: PropTypes.string,
  dateOfDeliveryErrorMessage: PropTypes.string,
  showEditSubmitButton: PropTypes.bool,
  onSubmitFuncSSS : PropTypes.func,
  roomNumberText : PropTypes.string,
  roomNumberErrorMessage : PropTypes.string,
  roomNumberFunc: PropTypes.func,
  streetNameText: PropTypes.string,
  streetNameErrorMessage: PropTypes.string,
  streetNameFunc: PropTypes.func,
  subdivisionText: PropTypes.string,
  subdivisionErrorMessage: PropTypes.string,
  subdivisionFunc: PropTypes.func,
  barangayText: PropTypes.string,
  barangayErrorMessage: PropTypes.string,
  barangayFunc: PropTypes.func,
  cityText: PropTypes.string,
  cityErrorMessage: PropTypes.string,
  provinceText: PropTypes.string,
  provinceErrorMessage: PropTypes.string,
  provinceFunc: PropTypes.func,
  zipCodeText: PropTypes.string,
  zipCodeErrorMessage: PropTypes.string,
  zipCodeFunc: PropTypes.func,
  noPregnancyText: PropTypes.string,
  noPregnancyErrorMessage: PropTypes.string,
  noPregnancyFunc: PropTypes.func,
  noDeliveryText: PropTypes.string,
  noDeliveryErrorMessage: PropTypes.string,
  noDeilveryFunc: PropTypes.func,
  noMiscarriageText: PropTypes.string,
  noMiscarriageErrorMessage: PropTypes.string,
  noMiscarriageFunc: PropTypes.func,
}

export default MaternityAssistanceSSSFormCardComponent
