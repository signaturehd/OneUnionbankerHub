import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  DatePicker,
  GenericButton,
  Line,
  MultipleAttachments,
} from '../../../ub-components/'

import moment from 'moment'
import './styles/PayForskillsComponentStyle.css'

class PayForSkillsForm extends Component {
  constructor (props) {
    super(props)
  }

  render () {

  	const {
      showEditMode,
      dateOfCompletion,
  	} = this.props

    return (
      <div className = {'payforskills-container'} >
        <div className = { 'payforskills-grid-column-2' }>
          <div></div>
          <div className={ 'payforskills-form-payforskillsd' }>
            <h4 className = { 'font-size-20px font-weight-bold' }>Pay for Skills Form</h4>
            <br/>
            <Line/>
            <br/>
            <div className={ 'payforskills-form-payforskillsd-body' }>
              <GenericInput
                errorMessage = { '' }
                text = { 'Program' }
                disabled = { showEditMode }
                maxLength = { 15 }
                />
              <DatePicker
                selected = { '' }
                readOnly
                disabled = { '' }
                onChange = { () => {} }
                maxDate = { moment() }
                text = { 'Date of Completion' }
                errorMessage = { '' }
                />
              <h2 className = { 'text-align-left' }>Form Attachments</h2>
              <br/>
              <MultipleAttachments
                placeholder = { '' }
                fileArray = { '' }
                disabled = { showEditMode }
              />
              <br/>
              <Line/>
              {
                showEditMode &&
                <center>
                  <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
                </center>
              }
              <br/>
              {
              showEditMode ?
              <div className = { 'grid-global' }>
                <GenericButton
                  text={ 'Edit' }
                  type = { 'button' }
                  onClick={ () => onEdit() }
                  className={ 'payforskillsview-submit' } />
                <GenericButton
                  text={ 'Submit' }
                  type = { 'button' }
                  onClick={ () => onSubmit() }
                  className={ 'payforskillsview-submit' } />
              </div>
              :
              <GenericButton
                text={ 'Continue' }
                onClick={ () =>
                  onContinue()
                  }
                className={ 'payforskillsview-submit' } />
              }
            </div>
          </div>
        <div></div>
      </div>
    </div>
    )
  }
}

export default PayForSkillsForm
