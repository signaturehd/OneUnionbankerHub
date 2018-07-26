import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  Card,
  GenericButton,
  FileUploader,
  DatePicker
} from '../../../ub-components/'

import './styles/outpatientComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class OutPatientReimbursementFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      attachments : '',
    }
  }

  getExtension (filename) {
    const parts = filename.split('/')
    return parts[parts.length - 1]
  }

  render () {
  const {
    attachments,
  } = this.state

  const {
    requestDepdentModalFunc,
    diagnosisValueFunc,
    desiredAmountFunc,
    oRNumberFunc,
    procedureModalFunc,
    dependentName,
    amount,
    diagnosisText,
    orNumberText,
    procedureArray,
  } = this.props

  const styles = {
    image1 : {
      backgroundImage: `url('${attachments.image}')`,
      width : 'auto',
      height : '60px',
      backgroundSize : 'contain',
      backgroundRepeat : 'no-repeat',
    }
  }

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
              type = { 'text' }/>
            <br/>
            <GenericInput
              value = { amount }
              onChange = { (e) => desiredAmountFunc(e.target.value) }
              hint = { 'Amount' }
              text = { 'Amount' }
              type = { 'text' }/>
            <br/>
            <GenericInput
              value = { diagnosisText }
              onChange = { (e) => diagnosisValueFunc(e.target.value) }
              hint = { 'Diagnosis' }
              text = { 'Diagnosis' }
              type = { 'text' }/>
              <br/>
            <DatePicker
              onChange = {() => {}}
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
                procedureArray && procedureArray.map((item, key) =>
                <GenericInput
                  hint = { item.name }
                  text = { item.name }
                  value = { '' }
                  onChange = { () => {} }
                  key = { key }
                  type = { 'text' } />
                )
              }
            </div>
            <br/>
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
  diagnosisValueFunc : PropTypes.func,
  oRNumberFunc : PropTypes.func,
  diagnosisText: PropTypes.string,
  procedureArray: PropTypes.array
}

export default OutPatientReimbursementFormCardComponent
