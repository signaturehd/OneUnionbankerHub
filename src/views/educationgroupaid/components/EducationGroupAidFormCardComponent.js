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

  checkComputedMessage () {
    const {
      premiumDuration,
      premiumMonths,
      isLineManager,
      effectivityDate,
    } = this.props

    let managersCheckRecurring = `Notes: The subsidy will be released monthly through a Manager's Check. This will be recurring until ${moment(effectivityDate).add(premiumMonths, 'months').format('LL')}.`
    let checkRecurring = `Notes: The subsidy will be credited to your nominated account every month until ${moment(effectivityDate).add(premiumMonths, 'months').format('LL')}`
    let checkOneTimePayment = `Notes: The full amount indicated above will be credited to your nominated account.`
    let managersCheckOneTimePayment = `Notes: The full subsidy indicated above will be released through Manager's Check.`

    if(isLineManager) {
      //If Recurring
      if(premiumDuration.toLowerCase() === 'annually') {
        return managersCheckOneTimePayment
      } else {
        return managersCheckRecurring
      }
    } else {
      //If One Time Payment
      if(premiumDuration.toLowerCase() === 'annually') {
        return checkOneTimePayment
      } else {
        return checkRecurring
      }
    }
  }

  computedAmount () {
    const {
      desiredAmount,
      premiumDuration,
    } = this.props
    let amount

    if(premiumDuration.toLowerCase() === 'monthly') {
      return desiredAmount
    } else if (premiumDuration.toLowerCase() === 'quarterly') {
      amount = desiredAmount * 3
      return amount
    } else if (premiumDuration.toLowerCase() === 'semi annually') {
      amount = desiredAmount * 6
      return amount
    } else if (premiumDuration.toLowerCase() === 'annually') {
      amount = desiredAmount * 12
      return amount
    }
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
                value = { effectivityDateText }
                selected = { effectivityDate && moment(effectivityDate)}
                text = { 'Coverage of Insurance' }
                disabled = { premiumDuration ? showEditSubmitButton : true }
                errorMessage = { premiumDuration ? '':'Please select the dates covered by your premium payment.' }
                onChange = { (e) => dateFunc(e, premiumMonths) }
              />
              {
                effectivityDate &&
                <div>
                  <h4 className = { 'font-size-14px font-weight-lighter' }>
                    { this.checkComputedMessage() }
                  </h4>
                  <br/>
                  <br/>
                </div>
              }
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
              {
                showEditSubmitButton &&
                <center>
                  <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
                </center>
              }
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
