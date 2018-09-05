import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Line,
  GenericInput,
  GenericButton,
  MultipleFileUploader
} from '../../../ub-components/'

import './styles/vaccineStyle.css'

class VaccineComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      showEditSubmitButton,
      showEditSubmitFunc,
      showDependentFunc,
      showVaccineFunc,
      showAppModesFunc,
      showFormReview,
      editFormDataFunc,
      dependentName,
      vaccineName,
      orderingStart,
      orderingEnd,
      cost,
      appModeName,
      dependentErrorMessage,
      vaccineErrorMessage,
      appModeErrorMessage
    } = this.props

    return (
      <div className = { 'vaccine-form' } >
        <GenericInput
          text = { 'Dependents' }
          onClick = { () => showDependentFunc() }
          value = { dependentName }
          errorMessage = { dependentErrorMessage }
          disabled = { showEditSubmitButton }
          readOnly
        />
        <GenericInput
          text = { 'Vaccines' }
          onClick = { () => showVaccineFunc() }
          value = { vaccineName }
          errorMessage = { vaccineErrorMessage }
          disabled = { showEditSubmitButton }
          readOnly
        />
        <GenericInput
          text = { 'Ordering Start Date' }
          value = { orderingStart }
          disabled = { showEditSubmitButton }
          readOnly
        />
        <GenericInput
          text = { 'Ordering End Date' }
          value = { orderingEnd }
          disabled = { showEditSubmitButton }
          readOnly
        />
        <GenericInput
          text = { 'Cost' }
          value = { cost }
          disabled = { showEditSubmitButton }
          readOnly
        />
        <GenericInput
          text = { 'Application Mode' }
          onClick = { () => showAppModesFunc() }
          value = { appModeName }
          errorMessage = { appModeErrorMessage }
          disabled = { showEditSubmitButton }
          readOnly
        />
        <br/>
        <Line/>
        {
          showEditSubmitButton &&
          <center>
            <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
          </center>
        }
        {
          showEditSubmitButton ?
          <div className = { 'vaccine-form-review' }>
            <GenericButton
              type = { 'button' }
              text = { 'Edit' }
              className = { 'vaccine-edit-form' }
              onClick = { () =>
                editFormDataFunc()
                }
              />
            <GenericButton
              type = { 'button' }
              text = { 'Submit' }
              onClick = { () => onSubmitFunc() }
              className = { 'vaccine-submit-form-button' }
              />
          </div>
          :
            <GenericButton
              type = { 'button' }
              text = { 'Continue' }
              onClick = {
                () => showFormReview(true)
              }
              className = { 'vaccine-submit' } />
        }
      </div>
    )
  }
}
VaccineComponent.propTypes = {
  showEditSubmitButton : PropTypes.bool,
  showEditSubmitFunc : PropTypes.func,
  showDependentFunc : PropTypes.func,
  showVaccineFunc : PropTypes.func,
  showFormReview : PropTypes.func,
  editFormDataFunc : PropTypes.func
}
export default VaccineComponent
