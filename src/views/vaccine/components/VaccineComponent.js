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
      showEditSubmitFunc
    } = this.props

    return (
      <div className = { 'vaccine-form' } >
        <GenericInput
          text = { 'Dependents' }
          onClick = { () => {} }
          readOnly
        />
        <GenericInput
          text = { 'Vaccines' }
          onClick = { () => {} }
          readOnly
        />
        <GenericInput
          text = { 'Ordering Start Date' }
          onClick = { () => {} }
          readOnly
        />
        <GenericInput
          text = { 'Ordering End Date' }
          onClick = { () => {} }
          readOnly
        />
        <GenericInput
          text = { 'Cost' }
          onClick = { () => {} }
          readOnly
        />
        <GenericInput
          text = { 'Application Mode' }
          onClick = { () => {} }
          readOnly
        />
        <br/>
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
  showEditSubmitFunc : PropTypes.func
}
export default VaccineComponent
