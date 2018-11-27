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
import './styles/coeComponentStyle.css'

class CertificateOfEmploymentFormComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {

  	const {
      showEditMode,
      dateOfCompletion,
      dateOfCompletionFunc,
      showTypeModalFunc,
      showPurposeModalFunc,
      showVisaModalFunc,
      purpose,
      purposeBody,
      typeOfCoe,
      typeOfCoeBody,
      visa,
      visaBody,
      onContinue,
      onEdit
  	} = this.props

    return (
      <div className = {'coe-container'} >
        <div className = { 'coe-grid-column-2' }>
          <div></div>
          <div className={ 'coe-form-coed' }>
            <h4 className = { 'font-size-20px font-weight-bold' }>Certificate of Employment Form</h4>
            <br/>
            <Line/>
            <br/>
            <div className={ 'coe-form-coed-body' }>
              <GenericInput
                errorMessage = { '' }
                text = { 'Type of Certificate of Employment' }
                disabled = { showEditMode }
                readOnly
                value = { typeOfCoeBody && typeOfCoeBody.programs }
                onClick = { () => showTypeModalFunc() }
                />
              <GenericInput
                errorMessage = { '' }
                text = { 'Purpose' }
                disabled = { showEditMode }
                readOnly
                value = { purposeBody && purposeBody.purpose }
                onClick = { () => showPurposeModalFunc() }
                />
              <GenericInput
                errorMessage = { '' }
                text = { 'VISA' }
                disabled = { showEditMode }
                readOnly
                value = { visaBody && visaBody.visa }
                onClick = { () => showVisaModalFunc() }
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
                  onClick={ () => onEdit(false) }
                  className={ 'coeview-submit' } />
                <GenericButton
                  text={ 'Submit' }
                  type = { 'button' }
                  onClick={ () => onEdit(true) }
                  className={ 'coeview-submit' } />
              </div>
              :

              <center>
                <GenericButton
                  text={ 'Continue' }
                  onClick={ () =>
                    onContinue()
                  }
                  className={ 'coeview-submit' } />
              </center>
              }
            </div>
          </div>
        <div></div>
      </div>
    </div>
    )
  }
}

export default CertificateOfEmploymentFormComponent
