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
      onSubmitFunc,
      dateFunc,
      editFormDataFunc,
      dateOfDelivertFunc,
      showFormReview,
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
      showFormReviewSSS
    } = this.props

  return (
    <div className={ 'outpatient-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div></div>
        <div>
          <div className={ 'outpatient-form-card' }>
            <div className={ 'outpatient-form-card-body' }>
              <div className = { 'grid-global' }>
                <div>
                  <GenericInput
                    value = { roomNumberText }
                    onChange = { e => roomNumberFunc(e.target.value) }
                    text = { 'Room Number' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { roomNumberErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { houseNumberText }
                    onChange = { e => houseNumberFunc(e.target.value) }
                    text = { 'House Number' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { houseNumberErrorMessage }
                    type = { 'text' }/>
                </div>
              </div>
              <br/>
              <GenericInput
                value = { streetNameText }
                onChange = { e => streetNameFunc(e.target.value) }
                text = { 'Street Name' }
                disabled = { showEditSubmitButton }
                errorMessage = { streetNameErrorMessage }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { subdivisionText }
                onChange = { e => subdivisionFunc(e.target.value) }
                text = { 'Subdivision' }
                disabled = { showEditSubmitButton }
                errorMessage = { subdivisionErrorMessage }
                type = { 'text' }/>
                <br/>
              <GenericInput
                value = { barangayText }
                onChange = { e => barangayFunc(e.target.value) }
                text = { 'Barangay' }
                disabled = { showEditSubmitButton }
                errorMessage = { barangayErrorMessage }
                type = { 'text' }/>
                <br/>
              <div className = { 'grid-global' }>
                <div>
                  <GenericInput
                    value = { cityText }
                    onChange = { e => cityFunc(e.target.value) }
                    text = { 'City' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { cityErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { provinceText }
                    onChange = { e => provinceFunc(e.target.value) }
                    text = { 'Province' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { provinceErrorMessage }
                    type = { 'text' }/>
                </div>
              </div>
              <br/>
              <GenericInput
                value = { zipCodeText }
                onChange = { e => zipCodeFunc(e.target.value) }
                text = { 'Zip Code' }
                disabled = { showEditSubmitButton }
                errorMessage = { zipCodeErrorMessage }
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
              <div className = { 'grid-global-columns-x3' }>
                <div>
                  <GenericInput
                    value = { noPregnancyText }
                    onChange = { e => noPregnancyFunc(e.target.value) }
                    text = { 'Number Of Pregnancy' }
                    disabled = { showEditSubmitButton }
                    errorMessage = { noPregnancyErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { noDeliveryText }
                    disabled = { showEditSubmitButton }
                    onChange = { e => noDeliveryFunc(e.target.value) }
                    text = { 'Number of Delivery' }
                    errorMessage = { noDeliveryErrorMessage }
                    type = { 'text' }/>
                </div>
                <div>
                  <GenericInput
                    value = { noMiscarriageText }
                    disabled = { showEditSubmitButton }
                    onChange = { e => noMiscarriageFunc(e.target.value) }
                    text = { 'Number of Miscarriage' }
                    errorMessage = { noMiscarriageErrorMessage }
                    type = { 'text' }/>
                </div>
              </div>
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
                    text = { 'Continue' }
                    onClick = {
                      () => showFormReviewSSS()
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

MaternityAssistanceSSSFormCardComponent.propTypes = {
  editFormDataFunc : PropTypes.func,
  showFormReview: PropTypes.func,
  dateOfDeliveryFunc: PropTypes.func,
  deliveryDate : PropTypes.string,
  dateFunc : PropTypes.func,
  dateErrorMessage: PropTypes.string,
  dateOfDeliveryErrorMessage: PropTypes.string,
  showEditSubmitButton: PropTypes.bool,
  onSubmitFunc : PropTypes.func,
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
  showFormReviewSSS: PropTypes.func,
}

export default MaternityAssistanceSSSFormCardComponent
