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

import './styles/outpatientComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class OutPatientReimbursementFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {

  const {
    requestDepdentModalFunc,
    diagnosisValueFunc,
    desiredAmountFunc,
    oRNumberFunc,
    procedureModalFunc,
    dateFunc,
    preferredDate,
    dependentName,
    procedureName,
    procedureArray,
    amount,
    diagnosisText,
    orNumberText,
    selectedProcedureAmount,
    showProcedureInput,
    attachmentsData
  } = this.props

  return (
    <div className={ 'outpatient-container' }>
      <div className={ 'outpatient-grid-column-2' }>
        <div></div>
        <div>
          <div className={ 'outpatient-form-card' }>
            <div className={ 'outpatient-form-card-body' }>
            <GenericInput
              value = { dependentName }
              hint = { 'Recipient' }
              readOnly
              text = { 'Recipient' }
              onClick = { () => requestDepdentModalFunc(true) }
              type = { 'text' }
              />
            <br/>
            <GenericInput
              value = { diagnosisText }
              onChange = { (e) => diagnosisValueFunc(e.target.value) }
              hint = { 'Diagnosis' }
              text = { 'Diagnosis' }
              type = { 'text' }/>
              <br/>
            <DatePicker
              selected = { preferredDate }
              onChange = { (e) => dateFunc(e) }
              hint = { 'Official Receipt Date' }
              text = { 'Official Receipt Date' }
              />
              <br/>
            <GenericInput
              value = { orNumberText }
              onChange = { (e) => oRNumberFunc(e.target.value) }
              hint = { 'Official Receipt Number' }
              text = { 'Official Receipt Number' }
              type = { 'text' }/>
              <br/>
              <div className = { 'outpatient-grid-procedure' }>
                <div>
                  <h2 className = { 'unionbank-color' }></h2>
                </div>
                <div>
                  <GenericButton
                    onClick = { () => procedureModalFunc(true) }
                    text = { 'Procedure' }/>
                </div>
              </div>
              {
                showProcedureInput ?

                <GenericInput
                  hint = { procedureName }
                  text = { procedureName }
                  onChange = { e => {
                      selectedProcedureAmount(parseInt(e.target.value) || 0)
                    }
                  }
                  type = { 'text' } />
                : <div></div>
              }
            </div>
            <br/>
              {
                attachmentsData.length === 0  ?
                <div>
                  <MultipleFileUploader
                    placeholder = { 'Form Attachments' }
                    fileArray = { attachmentsData }
                    disabled = { false }
                  />
                </div>
                :
                <div></div>
              }
            <div className={ 'outpatient-form-card-body' }>
            </div>
            <GenericButton
              type = { 'button' }
              text = { 'continue' }
              onClick = {
                () => {  }
              }
              className = { 'outpatient-submit' } />
          </div>
        </div>
      </div>
    </div>
    )
  }
}

OutPatientReimbursementFormCardComponent.propTypes = {
  requestDepdentModalFunc : PropTypes.func,
  dependentName : PropTypes.string,
  desiredAmount : PropTypes.func,
  procedureModalFunc : PropTypes.func,
  amount : PropTypes.string,
  orNumberText : PropTypes.string,
  preferredDate : PropTypes.string,
  diagnosisValueFunc : PropTypes.func,
  dateFunc : PropTypes.func,
  oRNumberFunc : PropTypes.func,
  diagnosisText: PropTypes.string,
  procedureName: PropTypes.string,
  selectedProcedureAmount: PropTypes.func,
  showProcedureInput: PropTypes.bool,
  attachments: PropTypes.array
}

export default OutPatientReimbursementFormCardComponent
