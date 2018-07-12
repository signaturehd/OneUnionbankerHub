import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/motorComponentStyle.css'
import {
  GenericTextBox,
  Card,
  GenericButton,
  FileUploader
} from '../../../ub-components/'

import PurposeOfAvailmentModal from '../modals/MotorcyclePurposeOfAvailmentModal'
import ModeOfLoanModal from '../modals/MotorcycleModeOfLoanModal'
import TermOfLoanModal from '../modals/MotorcycleTermOfLoanModal'
import OffsetOfLoanModal from '../modals/MotorcycleOffsetModal'
import SupplierModal from '../modals/MotorcycleSupplierModal'
import MplReviewFormModal from '../modals/MotorCycleReviewFormModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MotorcycleLoanCardComponent extends Component {

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
      fileObject: [],
      imagePreviewUrl: '',
      showFileUpload: false,
      showOffsetLoanCard: false,
      showOffsetOfLoanModal : false,
      imageUrlObject: [],
      selectedOffsetLoan: [],
      showOffsetMessageModal: false,
      showReviewModal: false,
      computationOffsetLoan: [],
      showConfirmationView: false
    }
  }

  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value === '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
   }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
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
      fileObject,
      imagePreviewUrl,
      showFileUpload,
      response,
      showOffsetLoanCard,
      showOffsetOfLoanModal,
      imageUrlObject,
      selectedOffsetLoan,
      showOffsetMessageModal,
      showReviewModal,
      computationOffsetLoan,
      showConfirmationView
    }=this.state

    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      preferredFormData,
      offset,
      onGetPurposeOfLoan,
      formAttachments,
      AdditionalDocuments,
      RequiredDocuments,
      isPayeeOrDealer
    }=this.props

    const computation=computationOffsetLoan.reduce((a, b) => a + b, 0)

    return (
      <div className={ 'motor-container' }>
        {
          showReviewModal &&
          <MplReviewFormModal
            amountValue={ format(amountValue) }
            imageUrlObject={ imageUrlObject ? imageUrlObject  : '' }
            modeOfLoanText={ modeOfLoanText }
            isPayeeOrDealer={ isPayeeOrDealer }
            termOfLoan={ termOfLoan }
            rateOfLoan={ rateOfLoan }
            poaText={ poaText }
            onYes={ () => this.setState({ showConfirmationView : true }) }
            onNo={ () => this.setState({ showReviewModal : false  })}
            onClose={ () => this.setState({ showReviewModal : false }) }
          />
        }
        {
          showConfirmationView &&
          <Modal>
            <center>
              Are you sure you want to sumbit this form ?
              <div className={ 'grid-global' }>
                <GenericButton
                  onClick={ () => this.setState({ showConfirmationView : false, showReviewModal : false }) }
                  text={ 'No' }/>
                <GenericButton
                  onClick={ () => this.sendFormData(
                    amountValue,
                    modeOfLoanId,
                    loanType,
                    poaText,
                    termId,
                    selectedOffsetLoan,
                    fileObject,
                    formAttachments
                  ) }
                  text={ 'Yes' }/>
              </div>
            </center>
          </Modal>
        }
        {
          showOffset &&
          <ModeOfLoanModal
            offset ={  offset && offset ? offset : [] }
            onSubmit={ (changeOffsetValue, showOffsetLoanModal, closePoaModal) =>
              this.setState({
                modeOfLoanText : changeOffsetValue.name,
                modeOfLoanId : changeOffsetValue.id,
                showOffset : closePoaModal,
                showOffsetLoanCard : showOffsetLoanModal
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
          showOffsetOfLoanModal &&
          <OffsetOfLoanModal
            onClose={ () => this.setState({ showOffsetOfLoanModal : false }) }
            onSelect={ (offsetloan) => {
              const updatedOffsetLoan=[...selectedOffsetLoan]
              const updateComputation=[...computationOffsetLoan]
              updatedOffsetLoan.push(offsetloan)
              updateComputation.push(offsetloan.outstandingBalance)
              this.setState({ selectedOffsetLoan : updatedOffsetLoan })
              this.setState({ computationOffsetLoan : updateComputation })
              }
            }
            selectedOffsetLoan={ selectedOffsetLoan }
            offset={ offset ? offset : [] }
          />
        }
        {
          showOffsetMessageModal &&
          <Modal>
            <center>
              <h4> `We're sorry but the selected existing loans have exceeded your principal amount.
                  These cannot be deducted from your new loan. Kindly select within the appropriate balance.` </h4>
              <GenericButton
                text={ 'Ok' }
                onClick={ () => this.setState({ showOffsetMessageModal : false }) }
              />
            </center>
          </Modal>
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
                    placeholder={ 'Purpose Of Availment' }/>
                </div>
              </div>
              <div className={ 'motor-grid-form' }>
                <div>
                  <br/>  <br/>
                  <span className={ 'motor-icon-forms motorEditIcon' }/>
                </div>
                <GenericTextBox
                  value={ payeeName }
                  group={ 'motor-group-textbox' }
                  container={ 'motor-form-icon-container' }
                  onChange={ e =>
                    this.setState({ payeeName : e.target.value }) }
                  placeholder={ payeeNameLabel && payeeNameLabel }
                  type={ 'text' }
                />
              </div>
              <div className={ 'motor-grid-form' }>
                  <div>
                    <br/>  <br/>
                    <span className={ 'motor-icon-forms motorEditIcon' }/>
                  </div>
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
                    type={ 'text' }
                  />
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
                  onSubmit(
                    payeeName,
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
  purposeOfAvailment : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  validateLoanType : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
  formAttachments : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  AdditionalDocuments: PropTypes.number,
  RequiredDocuments: PropTypes.number,
  isPayeeOrDealer: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
}

export default MotorcycleLoanCardComponent
