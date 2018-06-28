import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/computerCardStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../modals/ComputerPurposeOfAvailmentModal'
import ModeOfLoanModal from '../modals/ComputerModeOfLoanModal'
import TermOfLoanModal from '../modals/ComputerTermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class ComputerFormCardComponent extends Component {
  constructor (props) {
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
      poaId: '',
      payeeNameLabel : '',
      payeeName : '',
      showFileUpload: false,
      showSupplier : false,
      supplier: ''
    }
    
    this.onChange = this.onChange.bind(this)
  }

  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value === '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
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
      showFileUpload,
      showSupplier,
      payeeName,
      supplier } = this.state

    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      offset,
      selectedSupplier,
      group,
      payeeNameLabel,
      container,
      onSubmit
    } = this.props

    return (
      <div className={'computer-container'}>
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
        <div className={ 'computer-grid-column-2' }>
          <Card className={ 'computer-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className={ 'computer-form-card-body' }>
              <GenericTextBox
                value={ payeeName }
                onChange={ e =>
                  this.setState({ payeeName : e.target.value }) }
                placeholder={ payeeNameLabel && payeeNameLabel }
                type={ 'text' }/>
              <div className={ 'computer-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'computer-icon-forms computerMailBoxIcon' }/>
                </div>
                <div>
                  <GenericTextBox
                    value={ poaText }
                    group={ 'computer-group-textbox' }
                    container={ 'computer-form-icon-container' }
                    onClick={ () =>
                      this.setState({ showPurposeOfAvailment : true }) }
                    onChange={ poaText =>
                      this.setState({ poaText }) }
                    placeholder={ 'Purpose Of Availment' }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'computer-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'computer-icon-forms computerEditIcon' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'computer-group-textbox' }
                    container={ 'computer-form-icon-container' }
                    onChange={ modeOfLoanText =>
                      this.setState({ modeOfLoanText }) }
                    onClick={ () =>
                      this.setState({ showOffset : true }) }
                    placeholder={ 'Mode of Loan' }
                    value={ offset ? 'New Loan' : modeOoffsetfLoan }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'computer-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'computer-icon-forms pesoSign' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'computer-group-textbox' }
                    container={ 'computer-form-icon-container' }
                    value={ amountValue }
                    onChange={ this.onChange }
                    placeholder={ 'Desired Amount' }
                    maxLength={ validateLoanType && (`${  validateLoanType.maximumLoanableAmount}`).length }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'computer-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'computer-icon-forms transactionDate' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'computer-group-textbox' }
                    container={ 'computer-form-icon-container' }
                    value={ `${ termOfLoan } (${ rateOfLoan } %)` }
                    onChange={ (termOfLoan, rateOfLoan) =>
                      this.setState({ termOfLoan, rateOfLoan }) }
                    onClick={ () =>
                      this.setState({ showTerm : true }) }
                    placeholder={ 'Term of Loan' }
                    type={ 'text' }/>
                </div>
              </div>
              <div className={ 'computer-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'computer-icon-forms personGreyIcon' }/>
                </div>
                <div>
                  <GenericTextBox
                    group={ 'computer-group-textbox' }
                    container={ 'computer-form-icon-container' }
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
                  onSubmit(
                    payeeName ? payeeName : '',
                    poaText ? poaText : '',
                    modeOfLoanId ? modeOfLoanId : '',
                    amountValue,
                    termId ? termId : '',
                    selectedSupplier ? selectedSupplier : '',
                    file ? file : '')
                  }
                className={ 'computer-submit' } />
            </div>
          </Card>
          {
           showFileUpload &&
         <Card className={ 'computer-form-preview' }>
           <h4>
             Form Attachments
           </h4>
           <div className={ 'computer-body' }>
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

ComputerFormCardComponent.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  group : PropTypes.string,
  container : PropTypes.string,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default ComputerFormCardComponent
