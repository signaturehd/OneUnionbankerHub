import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GenericInput,
  GenericButton,
  FileUploader,
  DatePicker,
  ViewMoreButton,
  Line
} from '../../../ub-components/'
import * as func from '../controller/MedicalSchedulingFunction'
import './styles/medicalSchedulingComponentStyle.css'
import '../../../ub-components/TextBox/styles/input.css'
import moment from 'moment'

export default class MedicalSchedulingFormCardComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      branches,
      branchesAddress ,
      branchesId,
      branchesLabel,
      showPackages,
      showFormReview,
      showClinics,
      showBranchesFunc,
      isFormReview,
      clinicLabel,
      packageLabel,
      procedureList,
      preferredDate,
      onChangePreferredDate,
      onSubmit,
      index,
      viewMoreText,
      viewMore,
      viewLess,
      remarksText
    } = this.props

    const isVisible = (packageLabel && procedureList && procedureList.length > 4) ? '' : 'hide'

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
          {
            branches &&
            <div>
              <GenericInput
                value = { branchesLabel }
                disabled = { isFormReview }
                text = { 'Branches' }
                onClick = { () => showBranchesFunc() }
                type = { 'text' }
                />
              {
                branchesAddress &&
                <GenericInput
                  value = { branchesAddress }
                  disabled = { true }
                  readOnly
                  text = { 'Address' }
                  type = { 'textarea' }
                  />
              }
            </div>

          }
          <GenericInput
            text = { 'Packages' }
            disabled = { isFormReview }
            value = { packageLabel }
            onClick = { () => showPackages() }
            type = { 'text' }/>
          <DatePicker
            text = { 'Preferred Schedule' }
            readOnly
            disabled = { isFormReview }
            minDate = { moment(Date.now()).add(3, 'weeks') }
            selected = { func.checkedDate(preferredDate) }
            onChange = { (data) => onChangePreferredDate(data) }/>
          {
            remarksText &&

            <GenericInput
              disabled = { true }
              value = { remarksText && remarksText }
              type = { 'textare' }/>
          }
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
            <button
              type = { 'button' }
              className = { `viewmore tooltip ${isVisible}` }
              onClick = {
                () => {
                  if(index === procedureList.length)
                    viewLess()
                  else
                    viewMore()
                }
              }>
              <img src={ require('../../../images/icons/horizontal.png') } />
              <span className={ 'tooltiptext' }>{ viewMoreText }</span>
            </button>
            <br/>
            <Line/>
            {
              isFormReview &&
              <center>
                <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
              </center>
            }
            <br/>
            {
            isFormReview ?
            <div className={ 'form-review' }>
              <GenericButton
                type = { 'button' }
                text = { 'Edit' }
                onClick = { () => showFormReview(false) }
                className = { 'medsched-submit' }/>
              <GenericButton
                type = { 'button' }
                text = { 'Submit' }
                viewmore = { true }
                onClick = { () => onSubmit() }
                className = { 'medsched-submit' }/>
            </div> :
            <GenericButton
              type = { 'button' }
              text = { 'Continue' }
              onClick = { () => showFormReview(true) }
              className = { 'medsched-submit' }/>
          }
        </div>
      </div>
    )
  }
}
