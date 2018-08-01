import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GenericInput, GenericButton, FileUploader, DatePicker, ViewMoreButton } from '../../../ub-components/'
import * as func from '../controller/MedicalSchedulingFunction'
import './styles/medicalSchedulingComponentStyle.css'
import '../../../ub-components/TextBox/styles/input.css'
import moment from 'moment'

export default class MedicalSchedulingFormCardComponent extends Component {
  constructor (props) {
    super (props)
    this.state = {
      index : 4,
      viewMoreText : 'View more'
    }
  }

  render () {
    const {
      showPackages,
      showFormReview,
      showClinics,
      isFormReview,
      clinicLabel,
      packageLabel,
      procedureList,
      preferredDate,
      onChangePreferredDate,
      onSubmit
    } = this.props

    const { index, viewMoreText } = this.state

    return (
      <div className={ 'medsched-container' }>
        <div className={ 'medsched-form-title' }>
          <h4>Benefits Form</h4>
        </div>
        <br/>
        <div className = {'medsched-form-card-body '}>
          <GenericInput
            text = { 'Clinics' }
            disabled = { isFormReview }
            value = { clinicLabel }
            onClick = { () => showClinics() }
            type = { 'text' }/>
          <GenericInput
            text = { 'Packages' }
            disabled = { isFormReview }
            value = { packageLabel }
            onClick = { () => showPackages() }
            type = { 'text' }/>
          <DatePicker
            text = { 'Preferred Schedule' }
            disabled = { isFormReview }
            minDate = { moment(Date.now()).add(3, 'weeks') }
            selected = { func.checkedDate(preferredDate) }
            onChange = { (data) => onChangePreferredDate(data) }/>

            <br/>
            <div className={ 'medsched-package-procedure' }>
              <table>
                <tr>
                  <th>Package Procedures<p>Procedures that are marked with asterisk(*) are required.</p></th>
                </tr>
                {
                    packageLabel && procedureList.slice(0, index).map(
                    (proc, key) => (
                      <tr>
                        <td>{ proc.name }{ !proc.optional && '*' }</td>
                      </tr>
                    )
                  )
                }
              </table>
            </div>
            <ViewMoreButton
              text = { viewMoreText }
              type = { 'button' }
              visible = { packageLabel && procedureList && (procedureList.length > 4) }
              onClick = {
                () => {
                  if(index === procedureList.length)
                    this.setState({ index : 4, viewMoreText : 'View more' })
                  else
                    this.setState({ index : procedureList.length, viewMoreText : 'View less' })
                }
              }
            />
            <br/>
          {
            isFormReview ?
            <div className={ 'form-review' }>
              <GenericButton
                type = { 'button' }
                text = { 'Back' }
                onClick = { () => showFormReview(false) }
                className = { 'medsched-submit' }/>
              <GenericButton
                type = { 'button' }
                viewmore = { true }
                onClick = { () => onSubmit() }
                className = { 'medsched-submit' }/>
            </div> :
            <GenericButton
              type = { 'button' }
              text = { 'continue' }
              onClick = { () => showFormReview(true) }
              className = { 'medsched-submit' }/>
          }
        </div>
      </div>
    )
  }
}
