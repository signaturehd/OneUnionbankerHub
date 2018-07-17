import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import {
  GenericTextBox,
  Card,
  GenericButton,
  FileUploader,
  Modal
} from '../../../ub-components/'

import {
  RequiredValidation,
  MoneyValidation,
  MinMaxNumberValidation,
  RequiredAlphabetValidation
} from '../../../utils/validate'
import { format } from '../../../utils/numberUtils'

import PurposeOfAvailmentModal from '../modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../modals/ModeOfLoanModal'
import TermOfLoanModal from '../modals/TermOfLoanModal'
import OffsetOfLoanModal from '../modals/OffsetOfLoanModal'
import MplReviewFormModal from '../modals/MplReviewFormModal'

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
        dealerName: '',
        fileObject: '',
        fileObject1: '',
        imageUrlObject: '',
        imageUrlObject1: '',
        showFileUpload: false,
        showOffsetLoanCard: false,
        showOffsetOfLoanModal : false,
        selectedOffsetLoan: [],
        showOffsetMessageModal: false,
        showReviewModal: false,
        computationOffsetLoan: [],
        showConfirmationView: false,
        imagePreviewArrayList: [],
        selectedTerm: '',
      }
      this.validator=this.validator.bind(this)
    }

     validator(input) {
       return new RequiredValidation().isValid(input)
     }

     onGetClicked (
       dealerName,
       amountValue,
       modeOfLoanId,
       loanType,
       poaText,
       selectedTerm,
       selectedOffsetLoan,
       fileObject,
       fileObject1
     ) {
       this.props.sendFormDataToPresenter(
         dealerName,
         amountValue,
         modeOfLoanId,
         loanType,
         poaText,
         selectedTerm,
         selectedOffsetLoan,
         fileObject,
         fileObject1
       )
       this.setState({ showConfirmationView : false })
     }

     sendFormData (
       dealerName,
       amountValue,
       modeOfLoanId,
       loanType,
       poaText,
       selectedTerm,
       selectedOffsetLoan,
       fileObject,
       fileObject1) {
         if (!this.validator(poaText)) {
             store.dispatch(NotifyActions.addNotify({
                title : 'Warning' ,
                message : 'Please check and provide purpose of availment',
                type : 'warning',
                duration : 2000
              })
            )
          }
        else if (!this.validator(selectedTerm)) {
             store.dispatch(NotifyActions.addNotify({
                title : 'Warning' ,
                message : 'Please check and provide Term and Rates',
                type : 'warning',
                duration : 2000
              })
            )
          }
        else if (!this.validator(amountValue)) {
             store.dispatch(NotifyActions.addNotify({
                title : 'Warning' ,
                message : 'Please check and provide Amount',
                type : 'warning',
                duration : 2000
              })
            )
          }
        else if (!this.validator(fileObject) || !this.validator(fileObject1) ) {
             store.dispatch(NotifyActions.addNotify({
                title : 'Warning' ,
                message : 'Please check and provide the Additional Requirements',
                type : 'warning',
                duration : 2000
              })
            )
          }

         else {
           this.setState({ showReviewModal: true })
        }
     }

   getExtension (filename) {
     const parts=filename.split('/')
     return parts[parts.length - 1]
   }

   desiredAmountValidator(value) {
     return value ? true : false
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
        dealerName,
        subCategoryId,
        fileObject,
        fileObject1,
        showFileUpload,
        response,
        showOffsetLoanCard,
        showOffsetOfLoanModal,
        imageUrlObject,
        imageUrlObject1,
        selectedOffsetLoan,
        showOffsetMessageModal,
        showReviewModal,
        computationOffsetLoan,
        showConfirmationView,
        imagePreviewArrayList,
        selectedTerm,
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
        isPayeeOrDealer,
        maximumAmount
      }=this.props

      const computation=computationOffsetLoan.reduce((a, b) => a + b, 0)
      const arrayObject=[...imagePreviewArrayList]
      arrayObject.push(imageUrlObject)
      arrayObject.push(imageUrlObject1)

      return (
        <div className={ 'mplview-container' }>
          {
            showReviewModal &&
            <MplReviewFormModal
              amountValue={ format(amountValue) }
              imageUrlObject={ arrayObject ? arrayObject  : '' }
              modeOfLoanText={ modeOfLoanText }
              isPayeeOrDealer={ isPayeeOrDealer }
              dealerName={ dealerName }
              termOfLoan={ termOfLoan }
              rateOfLoan={ rateOfLoan }
              poaText={ poaText }
              onYes={ () => this.setState({ showConfirmationView : true, showReviewModal : false }) }
              onNo={ () => this.setState({ showReviewModal : false }) }
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
                    onClick={ () => this.onGetClicked(
                      dealerName,
                      amountValue,
                      modeOfLoanId,
                      loanType,
                      poaText,
                      selectedTerm,
                      selectedOffsetLoan,
                      fileObject,
                      fileObject1
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
                  selectedTerm: changeTermOfLoan.term,
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
                <h4>We're sorry but the selected existing loans have exceeded your principal amount.
                    These cannot be deducted from your new loan. Kindly select within the appropriate balance.</h4>
                  <br/>
                <GenericButton
                  text={ 'Ok' }
                  onClick={ () => this.setState({ showOffsetMessageModal : false }) }
                />
              </center>
            </Modal>
          }
          <div className={ 'mpl-grid-column-2' }>
            <div></div>
            <Card className={ 'mpl-form-card' }>
              <h4>
                Benefits Form
              </h4>
              <div className={ 'mpl-form-card-body' }>
                <GenericTextBox
                  value={ poaText ? poaText : '' }
                  onClick={ (e) =>
                    this.setState({ poaText: e.target.value, showPurposeOfAvailment : true }) }
                  // onChange={ poaText =>
                  //   this.setState({ poaText }) }
                  placeholder={ 'Purpose Of Availment' }
                  type={ 'text' }/>
                <GenericTextBox
                  // onChange={ modeOfLoanText =>
                  //   this.setState({  }) }
                  onClick={ (e) =>
                    this.setState({
                      modeOfLoanText: modeOfLoanText ? e.target.value : 'New Loan',
                      showOffset : true,
                      })
                    }
                  placeholder={ 'Mode of Loan' }
                  value={ modeOfLoanText ? modeOfLoanText : 'New Loan' }
                  type={ 'text' }/>
                {
                modeOfLoanText ?

                  <GenericTextBox
                    value={ amountValue ? amountValue : '' }
                    onChange={
                      (e) =>
                        new MinMaxNumberValidation(0, 500000).isValid(e.target.value) ?
                          this.setState({ amountValue: Number(e.target.value.replace(/[^0-9]/g, '')) }) :
                          this.setState({
                            amountValue: '',
                            showOffsetMessageModal: this.desiredAmountValidator(e.target.value) })
                     }
                    placeholder={ 'Desired Amount' }
                    maxLength={ 11 }
                    type={ 'text' }/>
                  :
                  <GenericTextBox
                    value={ amountValue ? amountValue : '' }
                    onChange={
                      (e) =>
                          this.setState({ amountValue: Number(e.target.value.replace(/[^0-9]/g, '')) })
                     }
                    placeholder={ 'Desired Amount' }
                    maxLength={ 11 }
                    type={ 'text' }/>
                  }
                <GenericTextBox
                  value={ `${ termOfLoan ? termOfLoan : '' } (${ rateOfLoan ? rateOfLoan : '' } %)` }
                  // onChange={ (termOfLoan, rateOfLoan) =>
                  //   this.setState({ termOfLoan, rateOfLoan }) }
                  onClick={ () =>
                    this.setState({ showTerm : true }) }
                  placeholder={ 'Term of Loan' }
                  type={ 'text' }/>
              </div>
              <br/>
                {
                  showOffsetLoanCard &&

                  <div>
                    <div></div>
                    <div>
                      <div className={ 'mpl-offset-grid' }>
                        <h4 className={ 'text-align-left' }>
                          <br/>
                          Loans to Offset
                        </h4>
                        <div className={ 'text-align-right' }>
                          <span
                            onClick={ () => this.setState({ showOffsetOfLoanModal : true }) }
                            className={ 'mpl-icons-add mpl-add-offset' }
                          />
                        </div>
                      </div>
                      <div className={ 'mpl-form-card-body' }>
                        {
                          selectedOffsetLoan && selectedOffsetLoan.map((offset, key) => (
                             <div key={ key } className={ 'dentalreimbursement-selected-procedure' }>
                               <div className={'input-grid'}>
                                 <GenericTextBox
                                   onChange={ e => {
                                     const updateOffset=[...selectedOffsetLoan]
                                     updateOffset[key].outstandingBalance=parseInt(e.target.value) || 0
                                     this.setState({ selectedOffsetLoan: updateOffset })
                                     }
                                   }
                                   value={
                                     `${offset.promissoryNoteNumber ?
                                       offset.promissoryNoteNumber : ''}  (${offset.outstandingBalance ?
                                           format(offset.outstandingBalance) : ''})` }
                                   type={ 'button' }
                                  />
                                 <div className={ 'dentalreimbursement-button-close' }>
                                   <img
                                     src={ require('../../../images/x-circle-global.png') }
                                     onClick={ () => {
                                       const { selectedOffsetLoan }=this.state
                                       selectedOffsetLoan.splice(key, 1)
                                       this.setState({ selectedOffsetLoan })
                                     }}
                                   />
                                 </div>
                               </div>
                             </div>
                             )
                           )
                          }
                      </div>
                    </div>
                  </div>
                }
                <br/>
                <br/>
                {
                  AdditionalDocuments  ?
                  <div>
                    <div className={'brv-form-card-body '}>
                      <h4>
                        Form Attachments
                      </h4>
                        <div>
                          <FileUploader
                            accept="image/gif,image/jpeg,image/jpg,image/png,"
                            value={ fileObject ? fileObject.name : '' }
                            placeholder={ 'Proof of Ownership' }
                            onChange={
                              (e) => {
                                const reader=new FileReader()
                                const file=e.target.files[0]
                                let isValid
                                switch (this.getExtension(file.type).toLowerCase()) {
                                  case 'jpeg' :
                                    isValid=true
                                  case 'jpg' :
                                    isValid=true
                                  case 'png' :
                                    isValid=true
                                  case 'pdf' :
                                    isValid=true
                                }

                                if (isValid) {
                                  reader.onloadend=() => {
                                      this.setState({
                                          fileObject: file,
                                          imageUrlObject:  reader.result,
                                      })
                                  }
                                  reader.readAsDataURL(file)
                               } else {
                                   store.dispatch(NotifyActions.addNotify({
                                       title : 'File Uploading',
                                       message : 'The accepted attachments are JPG/PNG/PDF',
                                       type : 'warning',
                                       duration : 2000
                                     })
                                   )
                                 }
                              }
                            }
                          />
                          {
                            imageUrlObject &&

                            <div>
                                  <div className="mpl-attachment-form">
                                    <img
                                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                                      className='close-button'
                                      onClick={
                                        () => {
                                          this.setState({ imageUrlObject: null, fileObject : '' })
                                        }
                                      }
                                    />
                                  <div
                                    style={ {
                                      backgroundImage: `url('${imageUrlObject}')`,
                                      width: 'auto',
                                      height: '60px',
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                    } }
                                  >
                                    <h6
                                      className="mpl-file-name">
                                      { fileObject.name }
                                    </h6>
                                  </div>
                                </div>
                          </div>
                        }
                          <FileUploader
                            accept="image/gif,image/jpeg,image/jpg,image/png,"
                            value={ fileObject1 ? fileObject1.name : '' }
                            placeholder={ 'Bill Of Materials' }
                            onChange={
                              (e) => {
                                const reader=new FileReader()
                                const file=e.target.files[0]
                                let isValid
                                switch (this.getExtension(file.type).toLowerCase()) {
                                  case 'jpeg' :
                                    isValid=true
                                  case 'jpg' :
                                    isValid=true
                                  case 'png' :
                                    isValid=true
                                  case 'pdf' :
                                    isValid=true
                                }

                                if (isValid) {
                                  reader.onloadend=() => {
                                      this.setState({
                                          fileObject1: file,
                                          imageUrlObject1:  reader.result,
                                      })
                                  }
                                  reader.readAsDataURL(file)
                               } else {
                                   store.dispatch(NotifyActions.addNotify({
                                       title : 'File Uploading',
                                       message : 'The accepted attachments are JPG/PNG/PDF',
                                       type : 'warning',
                                       duration : 2000
                                     })
                                   )
                                 }
                              }
                            }
                          />
                          {
                            imageUrlObject1 &&

                            <div>
                                  <div className="mpl-attachment-form">
                                    <img
                                      src={ require('../../../ub-components/Notify/images/x-circle.png') }
                                      className='close-button'
                                      onClick={
                                        () => {
                                          this.setState({ imageUrlObject1: null, fileObject1 : '' })
                                        }
                                      }
                                    />
                                  <div
                                    style={ {
                                      backgroundImage: `url('${imageUrlObject1}')`,
                                      width: 'auto',
                                      height: '60px',
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                    } }
                                  >
                                    <h6
                                      className="mpl-file-name">
                                      { fileObject1.name }
                                    </h6>
                                  </div>
                                </div>
                          </div>
                        }
                      </div>
                  <GenericButton
                    type={ 'button' }
                    text={ 'continue' }
                    onClick={ () => this.sendFormData(
                      dealerName,
                      amountValue,
                      modeOfLoanId,
                      loanType,
                      poaText,
                      selectedTerm,
                      selectedOffsetLoan,
                      fileObject,
                      fileObject1
                    ) }
                    className={ 'brv-submit' } />
                </div>
              </div>
              :

              <GenericButton
                type={ 'button' }
                text={ 'continue' }
                onClick={ () => this.sendFormData(
                  dealerName,
                  amountValue,
                  modeOfLoanId,
                  loanType,
                  poaText,
                  selectedTerm,
                  selectedOffsetLoan,
                  fileObject,
                  fileObject1
                ) }
                className={ 'brv-submit' } />
              }
            </Card>
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
  maximumAmount : PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  AdditionalDocuments: PropTypes.number,
  RequiredDocuments: PropTypes.number,
  isPayeeOrDealerResp:  PropTypes.string
}

export default MotorcycleLoanCardComponent
