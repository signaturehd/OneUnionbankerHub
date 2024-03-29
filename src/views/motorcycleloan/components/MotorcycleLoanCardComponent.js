import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card,
  GenericButton,
  Line,
} from '../../../ub-components/'

import './styles/motorcycleLoanCard.css'

class MotorcycleLoanCardComponent extends Component {
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
      dealer,
      dealerNameFunc
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
          text = { 'Dealer Name' }
          value = { dealer }
          onChange = { (e) => dealerNameFunc(e.target.value) }
          maxLength = { 20 }
          disabled = { review }
        />
        <GenericInput
          text = { 'Desired Amount' }
          maxLength = { 7 }
          value = { desiredAmount }
          disabled = { review }
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

MotorcycleLoanCardComponent.propTypes = {
  showTermOfLoan : PropTypes.func,
  showModeOfLoan : PropTypes.func,
  showPurposeOfAvailment : PropTypes.func,
  showOffsetLoan : PropTypes.func,
  desiredAmountFunc : PropTypes.func,
  desiredAmount : PropTypes.string,
  dealer : PropTypes.string,
  onClick : PropTypes.func,
  updateForm : PropTypes.func,
  dealerName : PropTypes.func,
  setAttachments : PropTypes.func,
  dealerNameFunc : PropTypes.func,
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

MotorcycleLoanCardComponent.defaultProps = {
  termOfLoan : '',
  modeOfLoan : '',
  purposeOfAvailment : '',
}

export default MotorcycleLoanCardComponent
