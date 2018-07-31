import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card,
  GenericButton,
  Line,
} from '../../../ub-components/'

import './styles/emergencyLoanCard.css'

class EmergencyLoanCardComponent extends Component {
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
      onClick,
      status,
      updateForm,
      review
    } = this.props

    return (
      <div className = { 'salary-form-card' } >
        <GenericInput
          text = { 'Purpose of Availment' }
          onClick = { () => showPurposeOfAvailment() }
          disabled = { review }
          value = { purposeOfAvailment }
          readOnly
        />
        <br/>
        <GenericInput
          text = { 'Mode of Loan' }
          onClick = { () => showModeOfLoan() }
          value = { modeOfLoan }
          disabled = { review }
          readOnly
        />
        <br/>
        <GenericInput
          text = { 'Term of Loan' }
          onClick = { () => showTermOfLoan() }
          value = { termOfLoan }
          disabled = { review }
          readOnly
        />
        <br/>
        <GenericInput
          text = { 'Desired Amount' }
          maxLength = { 7 }
          disabled = { review }
          onChange = { (e) => desiredAmount(e.target.value) }
        />
        <br/>

        {
          modeOfLoanId === 2 &&
          <div>
            <h2>Promissorry Note &nbsp;
              {
                review &&
                <GenericButton text = { 'Add Promissorry Note' }
                  onClick = { () => showOffsetLoan() }
                />
              }
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
                disabled = { review }
                setFile = { (updatedFile) => setAttachments(updatedFile) }
              />
            <Line/>
          </div>
        }
        <br/>
        <div className = { 'salary-function' } >
          {
            review &&
            <GenericButton
              text = { 'Back' }
              onClick = { () => updateForm() }
            />
          }
          <GenericButton
            text = { status }
            onClick = { () => onClick() }
          />
        </div>
      </div>
    )
  }
}

EmergencyLoanCardComponent.propTypes = {
  showTermOfLoan : PropTypes.func,
  showModeOfLoan : PropTypes.func,
  showPurposeOfAvailment : PropTypes.func,
  showOffsetLoan : PropTypes.func,
  desiredAmount : PropTypes.func,
  onClick : PropTypes.func,
  updateForm : PropTypes.func,
  setAttachments : PropTypes.func,
  modeOfLoanId : PropTypes.number,
  status : PropTypes.string,
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
  review : PropTypes.bool,
}

EmergencyLoanCardComponent.defaultProps = {
  termOfLoan : '',
  modeOfLoan : '',
  purposeOfAvailment : '',
}

export default EmergencyLoanCardComponent