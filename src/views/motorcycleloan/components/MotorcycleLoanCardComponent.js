import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/motorComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../modals/MotorcyclePurposeOfAvailmentModal'
import ModeOfLoanModal from '../modals/MotorcycleModeOfLoanModal'
import TermOfLoanModal from '../modals/MotorcycleTermOfLoanModal'
import SupplierModal from '../modals/MotorcycleSupplierModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MotorcycleLoanCardComponent extends Component {
  constructor(props) {
    super(props)
    this.state= {
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
      supplier: '',
      file: ''
    }
     this.onChange=this.onChange.bind(this)
     this.onGetClicked = this.onGetClicked.bind(this)
  }

  onChange (e) {
      const re=/^[0-9\.]+$/
      if (e.target.value == '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
   }

   onGetClicked (
     poaText,
     modeOfLoanId,
     termId,
     amountValue,
     selectedSupplier,
     file) {
     this.props.onSubmit(
       poaText,
       modeOfLoanId,
       termId,
       amountValue,
       selectedSupplier,
       file
     )
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
      supplier,
      file }=this.state
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      offset,
      formAttachments,
      selectedSupplier }=this.props

    return (
      <div className={ 'motor-container' }>
        {
          showOffset &&
          <ModeOfLoanModal
            offset ={  offset && offset }
            onSubmit={ (changeOffsetValue, closePoaModal) =>
              this.setState({
                modeOfLoanText : changeOffsetValue.name,
                modeOfLoanId : changeOffsetValue.id,
                showOffset : closePoaModal
              })
            }
            onClose={ () =>
              this.setState({ showOffset : false }) }
          />
        }
        {
          showPurposeOfAvailment &&
          <PurposeOfAvailmentModal
            poa ={ purposeOfAvailment }
            loanType={ loanType }
            presenter={ this.props.presenter }
            onSubmit={ (changePoaText, subcategory, closePoaModal, openFileUpload, loanType) =>
              this.setState({
                poaText : changePoaText.name,
                poaId : changePoaText.id,
                subCategoryId: subcategory,
                showPurposeOfAvailment : closePoaModal,
                showFileUpload : openFileUpload
              })
            }
            onClose={ () =>
              this.setState({ showPurposeOfAvailment : false }) }
          />
        }
        {
          showTerm &&
          <TermOfLoanModal
            term ={  validateLoanType && validateLoanType.terms }
            onSubmit={ (changeTermOfLoan, closePoaModal) =>
              this.setState({
                termId : changeTermOfLoan.id,
                termOfLoan : changeTermOfLoan.term,
                rateOfLoan : changeTermOfLoan.rate,
                showTerm : closePoaModal
              })
            }
            onClose={ () =>
              this.setState({ showTerm : false }) }
          />
        }
        {
          showSupplier &&
          <SupplierModal
            supplier ={  supplier }
            onSubmit={ (getSupplier, closePoaModal) =>
              this.setState({
                selectedSupplier : getSupplier,
                showSupplier : closePoaModal
              })
            }
            onClose={ () =>
              this.setState({ showSupplier : false }) }
          />
        }
        <div className={ 'motor-grid-column-2' }>
          <Card className={ 'motor-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className={ 'motor-form-card-body' }>
              <div className={ 'motor-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'motor-icon-forms motorMailBoxIcon' }/>
                </div>
                <div>
                  <GenericTextBox
                    type={ 'button' }
                    value={ poaText }
                    group={ 'motor-group-textbox' }
                    container={ 'motor-form-icon-container' }
                    onClick={ () =>
                      this.setState({ showPurposeOfAvailment : true }) }
                    onChange={ poaText =>
                      this.setState({ poaText }) }
                    placeholder={ 'Purpose Of Availment' }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'motor-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'motor-icon-forms motorEditIcon' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'motor-group-textbox' }
                    container={ 'motor-form-icon-container' }
                    onChange={ modeOfLoanText =>
                      this.setState({ modeOfLoanText }) }
                    onClick={ () =>
                      this.setState({ showOffset : true }) }
                    placeholder={ 'Mode of Loan' }
                    value={ offset ? 'New Loan' : modeOoffsetfLoan }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'motor-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'motor-icon-forms pesoSign' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'motor-group-textbox' }
                    container={ 'motor-form-icon-container' }
                    value={ amountValue }
                    onChange={ this.onChange }
                    placeholder={ 'Desired Amount' }
                    maxLength={ validateLoanType && (`${  validateLoanType.maximumLoanableAmount}`).length }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'motor-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'motor-icon-forms transactionDate' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'motor-group-textbox' }
                    container={ 'motor-form-icon-container' }
                    value={ `${ termOfLoan } (${ rateOfLoan } %)` }
                    onChange={ (termOfLoan, rateOfLoan) =>
                      this.setState({ termOfLoan, rateOfLoan }) }
                    onClick={ () =>
                      this.setState({ showTerm : true }) }
                    placeholder={ 'Term of Loan' }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'motor-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'motor-icon-forms personGreyIcon' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'motor-group-textbox' }
                    container={ 'motor-form-icon-container' }
                    value={ selectedSupplier ? selectedSupplier : null }
                    onChange={ supplier =>
                      this.setState({ selectedSupplier : supplier }) }
                    onClick={ () =>
                      this.setState({ showSupplier : true }) }
                    placeholder={ 'Supplier Name' }
                    type={ 'text' }/>
                </div>
              </div>
              <GenericButton
                type={ 'button' }
                text={ 'continue' }
                onClick={ () =>
                  this.onGetClicked(
                    poaText,
                    modeOfLoanId,
                    termId,
                    amountValue,
                    selectedSupplier,
                    file)
                  }
                className={ 'motor-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
          <Card className={ 'motor-form-preview' }>
            <h4>
              Form Attachments
            </h4>
            <div className={ 'motor-body' }>
            {
              formAttachments.AdditionalDocuments && formAttachments.AdditionalDocuments.map((attachmentsLabel, key) =>
                <FileUploader
                   onChange={ this.handleImageChange }
                   placeholder={  attachmentsLabel ? attachmentsLabel : 0 }
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

MotorcycleLoanCardComponent.propTypes={
  purposeOfAvailment : PropTypes.object,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
  formAttachments: PropTypes.array,
}

export default MotorcycleLoanCardComponent
