import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  Line,
  GenericButton,
  MultipleFileUploader,
  DatePicker } from '../../../ub-components/'

import DOPModal from '../modals/educationGroupAidDOPModal'
import './styles/educationGroupAidComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import moment from 'moment'

class EducationGroupAidFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
    const {
      dependentName,
      dependentMonths,
      dependentErrorMessage,
      company,
      companyErrorMessage,
      desiredAmount,
      desiredAmountErrorMessage,
      premiumMonths,
      premiumDuration,
      DOPErrorMessage,
      effectivityDate,
      effectivityDateText,
      showDependentFunc,
      companyFunc,
      desiredAmountFunc,
      orDate,
      orDateErrorMessage,
      orNumber,
      orNumberErrorMessage,
      orDateFunc,
      orNumberFunc,
      showPremiumFunc,
      dateFunc,
      showFormReview,
      editFormDataFunc,
      onSubmitFunc,
      attachmentsData,
      showEditSubmitButton,
      setAttachmentArrayFunc
    } = this.props


    return (
      <div className = {'educG-container'}>
        <div className = { 'educG-grid-column-2' }>
          <div></div>
          <div className = { 'educG-form-card' }>
            <div className = {'educG-form-card-body '}>
              <GenericInput
                value = { dependentName }
                text = { 'Dependents' }
                onClick = { () => showDependentFunc(true)}
                readOnly
                errorMessage = { dependentErrorMessage }
                disabled = { showEditSubmitButton }
                type = { 'text' }/>
              <GenericInput
                value = { company }
                onChange = { (e) => companyFunc(e.target.value) }
                text = { 'Company' }
                maxLength={ 120 }
                errorMessage = { companyErrorMessage }
                disabled = { showEditSubmitButton }
                type = { 'text' }/>
              <GenericInput
                value = { desiredAmount }
                onChange={ (e) => desiredAmountFunc(e.target.value) }
                maxLength={ 20 }
                errorMessage = { desiredAmountErrorMessage }
                disabled = { showEditSubmitButton }
                text = { 'Desired Amount' }
                type = { 'text' }/>
              <GenericInput
                value = { premiumDuration }
                onClick = { () => showPremiumFunc(true) }
                text = { 'Duration of Premium Payment' }
                disabled = { showEditSubmitButton }
                errorMessage = { DOPErrorMessage }
                type = { 'text' }/>
              <DatePicker
                readOnly
                selected = { effectivityDate }
                value = { effectivityDateText }
                text = { 'Effectivity Date/Coverage of Insurance' }
                disabled = { showEditSubmitButton }
                onChange = { (e) => dateFunc(e) }
              />
              <GenericInput
                value = { dependentMonths }
                text = { 'Maturity Date' }
                disabled = { showEditSubmitButton }
                type = { 'text' }/>
              <DatePicker
                readOnly
                maxDate = { moment() }
                selected = { orDate && moment(orDate) }
                text = { 'Date of Official Receipt' }
                disabled = { showEditSubmitButton }
                errorMessage = { orDateErrorMessage }
                onChange = { (e) => orDateFunc(e) }/>
              <GenericInput
                value = { orNumber }
                text = { 'Official Receipt Number' }
                maxLength = { 20 }
                onChange = { (e) => orNumberFunc(e.target.value) }
                disabled = { showEditSubmitButton }
                errorMessage = { orNumberErrorMessage }
                type = { 'text' }/>
              {
                attachmentsData.length !== 0  ?
                <div>
                  <MultipleFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachmentsData }
                    setFile = { (resp) => setAttachmentArrayFunc(resp) }
                    disabled = { showEditSubmitButton }
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
                <div className = { 'educG-form-review' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Edit' }
                    className = { 'educG-edit-form' }
                    onClick = { () =>
                      editFormDataFunc()
                      }
                    />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = { () => onSubmitFunc() }
                    className = { 'educG-submit-form-button' }
                    />
                </div>
                :
                <div>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Continue' }
                    onClick = {
                      () => showFormReview(true)
                    }
                    className = { 'educG-submit' } />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

EducationGroupAidFormCardComponent.propTypes = {
  dependentName : PropTypes.string,
  dependentMonths : PropTypes.string,
  dependentErrorMessage : PropTypes.string,
  company : PropTypes.string,
  companyErrorMessage : PropTypes.string,
  desiredAmount : PropTypes.number,
  desiredAmountErrorMessage : PropTypes.string,
  premiumMonths : PropTypes.string,
  premiumDuration : PropTypes.string,
  effectivityDate : PropTypes.date,
  effectivityDateText : PropTypes.string,
  orDate : PropTypes.date,
  orNumber : PropTypes.string,
  orDateErrorMessage : PropTypes.string,
  orNumberErrorMessage : PropTypes.string,
  showEditSubmitButton : PropTypes.bool,
  showDepedendentFunc : PropTypes.func,
  companyFunc : PropTypes.func,
  desiredAmountFunc : PropTypes.func,
  showPremiumFunc : PropTypes.func,
  dateFunc : PropTypes.func,
  orDateFunc : PropTypes.func,
  orNumberFunc : PropTypes.func,
  showFormReview : PropTypes.func,
  editFormDataFunc : PropTypes.func,
  onSubmitFunc : PropTypes.func,
  setAttachmentArrayFunc : PropTypes.func,
  attachmentsData : PropTypes.array
}

export default EducationGroupAidFormCardComponent
