import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericInput, GenericButton, FileUploader } from '../../../ub-components/'
//import EducationGrantPersonalModal from '../modal/EducationGrantPersonalModal'
import ClinicModal from '../modals/MedicalSchedulingClinicModal'
import './styles/medicalSchedulingComponentStyle.css'
import store from '../../../store'
import { NotifyActions } from '../../../actions/'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class MedicalSchedulingFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      showClinics : false,
      clinics : '',
      packages : '',
      prefferedDate : ''
    }
  }

  render () {
    const {
      showClinics,
      clinics,
      packages,
      prefferedDate
    } = this.state

    const clinicsObject = ["clinic 1", "clinic 2", "clinic 3"]

    return (
      <div className={ 'medsched-container' }>

        {
          showClinics &&
          <ClinicModal
            clinics = { clinicsObject }
            onSubmit = {(clinics) => this.setState({ clinics })}
            onClose = {() => this.setState({ showClinics : false})}
          />
        }

        <h4>
          Benefits Form
        </h4>
        <br/>
        <div className = {'medsched-form-card-body '}>
          <div className = { 'medsched-input' }>
            <h6>Clinics</h6>
            <GenericInput
              value = { clinics }
              onClick = {() => this.setState({ showClinics : true })}
              placeholder = { 'something' }
              type = { 'text' }/>
          </div>
          <div className = { 'medsched-input' }>
            <h6>Packages</h6>
            <GenericInput
              value = { null }
              onChange = {() => {}}
              placeholder = { 'something' }
              type = { 'text' }/>
          </div>
          <div className = { 'medsched-input' }>
            <h6>Preffered Schedule</h6>
            <GenericInput
              value = { null }
              onChange = {() => {}}
              placeholder = { 'something' }
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
