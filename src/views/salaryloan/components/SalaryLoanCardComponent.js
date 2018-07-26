import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card,
  GenericButton,
  Line,
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
      showTermOfLoan,
      showOffsetLoan,
      showPurposeOfAvailment,
      desiredAmount,
      showTerm,
      termOfLoan,
      purposeOfAvailment,
      modeOfLoan,
      modeOfLoanId,
      fileAttachments,
      offsetLoan,
      onClick
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
          maxLength = { 7 }
          onChange = { (e) => desiredAmount(e.target.value) }
        />
        <br/>
        
        {
          modeOfLoanId === 2 &&
          <div>
            <h2>Promissorry Note &nbsp;
              <GenericButton text = { 'Add Promissorry Note' }
                onClick = { () => showOffsetLoan() }
              />
            </h2>
            <br/>
              {
                offsetLoan.length !== 0 &&
                offsetLoan.map((offset, key) => (
                  <h4>{ offset.name }</h4>
                ))
              }
            <Line/>
          </div>
        }
        {
          fileAttachments.length !== 0 &&
          <div>
              <MultipleFileUploader
              placeholder = { 'Form Attachments' }
              fileArray = { fileAttachments }
              />
            <Line/>
          </div>
        }
        <br/>
        <GenericButton
          text = { 'Submit' }
          onClick = { () => onClick() }
        />
      </div>
    )
  }
}

SalaryLoanCardComponent.propTypes = {
  showTermOfLoan : PropTypes.func,
  showModeOfLoan : PropTypes.func,
  showPurposeOfAvailment : PropTypes.func,
  showOffsetLoan : PropTypes.func,
  desiredAmount : PropTypes.func,
  onClick : PropTypes.func,
  modeOfLoanId : PropTypes.number,
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
  offsetLoan : PropTypes.array,
}

SalaryLoanCardComponent.defaultProps = {
  termOfLoan : '',
  modeOfLoan : '',
  purposeOfAvailment : '',
}

export default SalaryLoanCardComponent
