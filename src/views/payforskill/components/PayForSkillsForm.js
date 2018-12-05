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
      dateOfCompletionFunc,
      showProgramsModalFunc,
      showAccreditationModalFunc,
      addAttachmentsFunc,
      accrediting,
      accreditingBody,
      programs,
      programsBody,
      attachmentsArray,
      attachmentsNewValueFunc,
      onContinue,
      onEdit,
      onChangeAccreditationModalFunc,
      onBackToList,
      others,
      onChangeOthersFunc
  	} = this.props

    return (
      <div className = {'payforskills-container'} >
        <div className = { 'payforskills-grid-column-2' }>
          <div></div>
          <div className={ 'payforskills-form-payforskillsd' }>
            <h4 className = { 'font-size-24px font-weight-bold' }>Pay for Skills Form</h4>
            <br/>
            <Line/>
            <br/>
            <div className={ 'payforskills-form-payforskillsd-body' }>
              <GenericInput
                errorMessage = { '' }
                text = { 'Program' }
                disabled = { showEditMode }
                readOnly
                value = { programsBody && programsBody.programs }
                onClick = { () => showProgramsModalFunc() }
                />
              <DatePicker
                selected = { dateOfCompletion }
                formatDate = { 'MM/DD/YYYY' }
                onChange = { (e) => dateOfCompletionFunc(e) }
                minDate = { moment().subtract(3, 'months') }
                maxDate = { moment() }
                text = { 'Date of Completion' }
                disabled = { showEditMode }
                errorMessage = { '' }
                />

              <GenericInput
                errorMessage = { '' }
                text = { 'Accrediting Body' }
                disabled = { showEditMode }
                readOnly
                value = { accreditingBody && accreditingBody.accre }
                onClick = { () => showAccreditationModalFunc() }
              />
              {
                accreditingBody && accreditingBody.accre.toLowerCase() === 'others' &&
                <GenericInput
                  errorMessage = { '' }
                  text = { `(Please specify if Others)`  }
                  disabled = { showEditMode }
                  errorMessage = { '' }
                  value = { others }
                  onChange = { (e) =>
                  onChangeOthersFunc(e.target.value)
                  }
                />
              }
              <br/>
              <div className = { 'grid-global' }>
                <h2 className = { 'text-align-left' }>Form Attachments</h2>
                <div className = { 'text-align-right' }>
                  {
                    !showEditMode &&
                    <GenericButton
                      className = { 'profile-button-small' }
                      onClick = { () => addAttachmentsFunc() }
                      text = { 'Add Attachments' }
                    />
                  }
                </div>
              </div>
              <br/>
              {
                attachmentsArray.length !== 0  &&
                <MultipleAttachments
                  count = { 0 }
                  countFunc = { () => {} }
                  placeholder = { '' }
                  fileArray = { attachmentsArray }
                  disabled = { showEditMode }
                  setFile = { (respFile) => attachmentsNewValueFunc(respFile) }
                />
              }
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
                  onClick={ () => onEdit(false) }
                  className={ 'payforskillsview-submit' } />
                <GenericButton
                  text={ 'Submit' }
                  type = { 'button' }
                  onClick={ () => onEdit(true) }
                  className={ 'payforskillsview-submit' } />
              </div>
              :
              <div className = { 'grid-global' }>
                <GenericButton
                  text={ 'Back to List' }
                  type = { 'button' }
                  onClick={ () => onBackToList(false) }
                  className={ 'payforskillsview-submit' } />
                <GenericButton
                  text={ 'Continue' }
                  onClick={ () =>
                    onContinue()
                  }
                  className={ 'payforskillsview-submit' } />
              </div>
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
