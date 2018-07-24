import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card
} from '../../../ub-components/'

import './styles/salaryLoanCard.css'

class SalaryLoanCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      showPurpose,
      showModeOfLoan,
      desiredAmount,
      showTerm,
      termOfLoan,
      purposeOfAvailment,
      modeOfLoan,
      fileAttachments,
    } = this.props

    return (
      <div className = { 'salary-form-card' } >
        <GenericInput
          text = { 'Purpose of Availment' }
          onClick = { () => showPurposeOfAvailment() }
          value = { purposeOfAvailment }
          readOnly
        />
        <br/>
        <GenericInput
          text = { 'Mode of Loan' }
          onClick = { () => showModeOfLoan() }
          value = { modeOfLoan }
          readOnly
        />
        <br/>
        <GenericInput
          text = { 'Term of Loan' }
          onClick = { () => showTermOfLoan() }
          value = { termOfLoan }
          readOnly
        />
        <br/>
        <GenericInput
          text = { 'Desired Amount' }
          onChange = { (e) => desiredAmount(e.target.value) }
        />
        {
          fileAttachments.length !== 0 &&
          <MultipleFileUploader
            placeholder = { 'Form Attachments' }
            fileArray = { fileAttachments }
          />
        }
      </div>
    )
  }
}

SalaryLoanCardComponent.propTypes = {
  showTermOfLoan : PropTypes.func,
  showModeOfLoan : PropTypes.func,
  showPurposeOfAvailment : PropTypes.func,
  desiredAmount : PropTypes.func,
  termOfLoan : PropTypes.string,
  modeOfLoan : PropTypes.string,
  purposeOfAvailment : PropTypes.string,
  fileAttachments : PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.shape({
        name : PropTypes.string,
        file : PropTypes.object,
        base64 : PropTypes.string
      })
    )
  ),
}

SalaryLoanCardComponent.defaultProps = {
  termOfLoan : '',
  modeOfLoan : '',
  purposeOfAvailment : '',
}

export default SalaryLoanCardComponent
