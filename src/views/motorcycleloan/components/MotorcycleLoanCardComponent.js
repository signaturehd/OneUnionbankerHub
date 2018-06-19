import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/motorComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MotorcycleLoanCardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPurposeOfAvailment: false,
      showOffset: false,
      showTerm: false,
      poaText : '',
      amountValue: '',
      modeOfLoanText: '',
      modeOfLoanId : '',
      termOfLoan: '',
      rateOfLoan: '',
      termId: '',
      subCategoryId: '',
      showFileUpload: false,
      showSupplier : false,
      supplier: ''
    }
     this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value == '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
   }

   sendFormData (desiredAmount, modeOfLoanId, loanTypeId, poaText, termId, file1, file2 ) {

   }

  render () {
    const {
      showPurposeOfAvailment,
      showOffset,
      showTerm,
      poaText,
      poaId,
      amountValue,
      modeOfLoanText,
      modeOfLoanId,
      termOfLoan,
      rateOfLoan,
      termId,
      subCategoryId,
      showSupplier,
      showFileUpload,
      supplier } = this.state
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      offset,
      formAttachments,
      selectedSupplier } = this.props

    return (
      <div className = { 'motor-container' }>
        {
          showOffset &&
          <ModeOfLoanModal
            offset  = {  offset && offset }
            onSubmit = { (changeOffsetValue, closePoaModal) =>
              this.setState({
                modeOfLoanText : changeOffsetValue.name,
                modeOfLoanId : changeOffsetValue.id,
                showOffset : closePoaModal
              })
            }
            onClose = { () =>
              this.setState({ showOffset : false }) }
          />
        }
        {
          showPurposeOfAvailment &&
          <PurposeOfAvailmentModal
            poa  = { purposeOfAvailment }
            loanType = { loanType }
            presenter = { this.props.presenter }
            onSubmit = { (changePoaText, subcategory, closePoaModal, openFileUpload, loanType) =>
              this.setState({
                poaText : changePoaText.name,
                poaId : changePoaText.id,
                subCategoryId: subcategory,
                showPurposeOfAvailment : closePoaModal,
                showFileUpload : openFileUpload
              })
            }
            onClose = { () =>
              this.setState({ showPurposeOfAvailment : false }) }
          />
        }
        {
          showTerm &&
          <TermOfLoanModal
            term  = {  validateLoanType && validateLoanType.terms }
            onSubmit = { (changeTermOfLoan, closePoaModal) =>
              this.setState({
                termId : changeTermOfLoan.id,
                termOfLoan : changeTermOfLoan.term,
                rateOfLoan : changeTermOfLoan.rate,
                showTerm : closePoaModal
              })
            }
            onClose = { () =>
              this.setState({ showTerm : false }) }
          />
        }
        {
          showSupplier &&
          <SupplierLoanModal
            supplier  = {  supplier }
            onSubmit = { (getSupplier, closePoaModal) =>
              this.setState({
                selectedSupplier : getSupplier,
                showSupplier : closePoaModal
              })
            }
            onClose = { () =>
              this.setState({ showTerm : false }) }
          />
        }
        <div className = { 'motor-grid-column-2' }>
          <Card className = { 'motor-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = { 'motor-form-card-body' }>
              <span className = { 'motor-icon' } />
              <GenericTextBox
                type = { 'button' }
                value = { poaText }
                onClick = { () =>
                  this.setState({ showPurposeOfAvailment : true }) }
                onChange = { (poaText) =>
                  this.setState({ poaText }) }
                placeholder = { 'Purpose Of Availment' }
                type = { 'text' }/>
              <GenericTextBox
                onChange = { (modeOfLoanText) =>
                  this.setState({ modeOfLoanText }) }
                onClick = { () =>
                  this.setState({ showOffset : true }) }
                placeholder = { 'Mode of Loan' }
                value = { offset ? 'New Loan' : modeOoffsetfLoan }
                type = { 'text' }/>
              <GenericTextBox
                value = { amountValue }
                onChange = { this.onChange }
                placeholder = { 'Desired Amount' }
                maxLength = { validateLoanType && ( '' + validateLoanType.maximumLoanableAmount).length }
                type = { 'text' }/>
              <GenericTextBox
                value = { `${ termOfLoan } (${ rateOfLoan } %)` }
                onChange = { (termOfLoan, rateOfLoan) =>
                  this.setState({ termOfLoan, rateOfLoan }) }
                onClick = { () =>
                  this.setState({ showTerm : true }) }
                placeholder = { 'Term of Loan' }
                type = { 'text' }/>
              <GenericTextBox
                value = { selectedSupplier ? selectedSupplier : null }
                onChange = { (supplier) =>
                  this.setState({ selectedSupplier : supplier }) }
                onClick = { () =>
                  this.setState({ showSupplier : true }) }
                placeholder = { 'Supplier Name' }
                type = { 'text' }/>
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId, file1, file2) }
                className = { 'motor-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
          <Card className = { 'motor-form-preview' }>
            <h4>
              Form Attachments
            </h4>
            <div className = { 'motor-body' }>
            {
              formAttachments.AdditionalDocuments && formAttachments.AdditionalDocuments.map((attachmentsLabel, key) =>
                <FileUploader
                   onChange = { this.handleImageChange }
                   placeholder = {  attachmentsLabel ? attachmentsLabel : 0 }
                />
              )
            }
            </div>
          </Card>
          }
        </div>
      </div>
    )
  }
}

MotorcycleLoanCardComponent.propTypes = {
  purposeOfAvailment : PropTypes.object,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
  formAttachments: PropTypes.array,
}

export default MotorcycleLoanCardComponent
