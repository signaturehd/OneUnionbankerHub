import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card,
  GenericButton,
  Line,
} from '../../../ub-components/'

import './styles/computerLoanCard.css'

class ComputerLoanCardComponent extends Component {
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
      desiredAmountFunc,
      supplierName,
      supplier,
      showTerm,
      termOfLoan,
      purposeOfAvailment,
      modeOfLoan,
      modeOfLoanId,
      fileAttachments,
      setAttachments,
      offsetLoan,
      onClick,
      status,
      updateForm,
      review,
    } = this.props

    return (
      <div className = { 'computer-form-card' } >
        <GenericInput
          text = { 'Purpose of Availment' }
          onClick = { () => showPurposeOfAvailment() }
          disabled = { review }
          value = { purposeOfAvailment }
          readOnly
        />
        <GenericInput
          text = { 'Mode of Loan' }
          onClick = { () => showModeOfLoan() }
          value = { modeOfLoan }
          disabled = { review }
          readOnly
        />
        <GenericInput
          text = { 'Term of Loan' }
          onClick = { () => showTermOfLoan() }
          value = { termOfLoan }
          disabled = { review }
          readOnly
        />
        <GenericInput
          text = { 'Supplier Name' }
          onChange = { (e) => supplierName(e.target.value) }
          maxLength = { 20 }
          value = { supplier }
          disabled = { review }
        />
        <GenericInput
          text = { 'Desired Amount' }
          maxLength = { 7 }
          disabled = { review }
          value = { desiredAmount }
          onChange = { (e) => desiredAmountFunc(e.target.value) }
        />
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
          </div>
        }
        <br/>
        <Line/>
        {
          review &&
          <center>
            <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
          </center>
        }
        <br/>
        <div>
          {
            review ?
            <div className = { 'grid-global' }>
              <GenericButton
                text = { 'Edit' }
                onClick = { () => updateForm() }
              />

              <GenericButton
                text = { status }
                onClick = { () => onClick() }
              />
            </div> :
            <GenericButton
              className = { 'loan-submit-button' }
              text = { status }
              onClick = { () => onClick() }
            />
          }
        </div>
      </div>
    )
  }
}

ComputerLoanCardComponent.propTypes = {
  showTermOfLoan : PropTypes.func,
  showModeOfLoan : PropTypes.func,
  showPurposeOfAvailment : PropTypes.func,
  showOffsetLoan : PropTypes.func,
  desiredAmountFunc : PropTypes.func,
  desiredAmount : PropTypes.string,
  onClick : PropTypes.func,
  updateForm : PropTypes.func,
  supplierName : PropTypes.func,
  supplier : PropTypes.string,
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

ComputerLoanCardComponent.defaultProps = {
  termOfLoan : '',
  modeOfLoan : '',
  purposeOfAvailment : '',
}

export default ComputerLoanCardComponent
