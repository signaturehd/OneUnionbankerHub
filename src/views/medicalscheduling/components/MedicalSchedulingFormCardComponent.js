import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericInput, GenericButton, FileUploader } from '../../../ub-components/'
import './styles/medicalSchedulingComponentStyle.css'

export default class MedicalSchedulingFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      showPackages,
      showClinics,
      clinicLabel,
      packageLabel,
      prefferedDate,
      onChangePrefferedDate
    } = this.props
    return (
      <div className={ 'medsched-container' }>
        <h4>
          Benefits Form
        </h4>
        <br/>
        <div className = {'medsched-form-card-body '}>
          <div className = { 'medsched-input' }>
            <h6>Clinics</h6>
            <GenericInput
              value = { clinicLabel }
              onClick = { () => showClinics() }
              placeholder = { '' }
              type = { 'text' }/>
          </div>
          <div className = { 'medsched-input' }>
            <h6>Packages</h6>
            <GenericInput
              value = { packageLabel }
              onClick = { () => showPackages() }
              placeholder = { '' }
              type = { 'text' }/>
          </div>
          <div className = { 'medsched-input' }>
            <h6>Preffered Schedule</h6>
            <GenericInput
              value = { prefferedDate }
              onChange = { (e) => onChangePrefferedDate(e.target.value) }
              placeholder = { '' }
              type = { 'text' }/>
          </div>
          <div className = { 'medsched-input' }>
            <GenericButton
              type = { 'button' }
              text = { 'continue' }
              onClick = {
                () => {}
              }
              className = { 'medsched-submit' }/>
          </div>
        </div>
      </div>
    )
  }
}
