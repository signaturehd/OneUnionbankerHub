import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/computerCardStyle.css'
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

import PurposeOfAvailmentModal from '../modals/ComputerPurposeOfAvailmentModal'
import ModeOfLoanModal from '../modals/ComputerModeOfLoanModal'
import TermOfLoanModal from '../modals/ComputerTermOfLoanModal'
import OffsetOfLoanModal from '../modals/ComputerOffsetLoanModal'
import ReviewModal from '../modals/ComputerReviewModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class ComputerLoanCardComponent extends Component {

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
        supplierName: '',
        fileObject: '',
        imageUrlObject: '',
        showFileUpload: false,
        showOffsetLoanCard: false,
        showOffsetOfLoanModal : false,
        selectedOffsetLoan: [],
        showOffsetMessageModal: false,
        showReviewModal: false,
        computationOffsetLoan: [],
        showConfirmationView: false,
        attachmentArray : []
      }
      this.validator=this.validator.bind(this)
      this.setAttachments = this.setAttachments.bind(this)
    }

     validator(input) {
       return new RequiredValidation().isValid(input)
     }

     componentWillReceiveProps (nextProps) {
       if (nextProps.formAttachments !== [] && this.state.attachmentArray.length === 0) {
         this.setAttachments()
       }
     }

     setAttachments () {
       try {
         const { nfis } = this.props.validateLoanType
         const { AdditionalDocuments, RequiredDocuments } = this.props.formAttachments
         const updatedAttachment = [...this.state.attachmentArray]
         AdditionalDocuments && AdditionalDocuments.map((attachment, key) => {
           updatedAttachment.push({name: attachment, nfis: null})
         })

         nfis && nfis.map((nfis, key) => {
           let documentsArray = [...new Set(RequiredDocuments && RequiredDocuments)]
           documentsArray && documentsArray.map((attachment, key) => {
             updatedAttachment.push({name : attachment, nfis})
           })
         })

         this.setState({attachmentArray: updatedAttachment})
       } catch (e) {
       }
     }

     onGetClicked (
       supplierName,
       amountValue,
       modeOfLoanId,
       loanType,
       poaText,
       termOfLoan,
       selectedOffsetLoan,
       attachmentArray
     ) {
       this.props.sendFormDataToPresenter(
         supplierName,
         amountValue,
         modeOfLoanId,
         loanType,
         poaText,
         termOfLoan,
         selectedOffsetLoan,
         attachmentArray,
       )
       this.setState({ showConfirmationView : false })
     }

     sendFormData (
       supplierName,
       amountValue,
       modeOfLoanId,
       loanType,
       poaText,
       termOfLoan,
       selectedOffsetLoan,
       attachmentArray) {
         if (!this.validator(poaText)) {
             store.dispatch(NotifyActions.addNotify({
                title : 'Warning' ,
                message : 'Please check and provide purpose of availment',
                type : 'warning',
                duration : 2000
              })
            )
          }
        else if (!this.validator(termOfLoan)) {
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
        else if (!this.validator(supplierName)) {
             store.dispatch(NotifyActions.addNotify({
                title : 'Warning' ,
                message : 'Please check and provide Dealer Name',
                type : 'warning',
                duration : 2000
              })
            )
          }
        else if (!this.validator(attachmentArray)) {
            attachmentArray.map((attachment, key) => {
                if (!attachment.file) {
                  store.dispatch(NotifyActions.addNotify({
                    title : 'Warning' ,
                    message : 'Please check and provide attachment for ' + attachment.name,
                    type : 'warning',
                    duration : 2000
                  })
                )
              }
            })
          }

         else {
           this.setState({ showReviewModal: true })
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
        supplierName,
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
        showConfirmationView,
        attachmentArray
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


      const styles={
        image1 : {
          backgroundImage: `url('${imagePreviewUrl}')`,
          width: '-webkit-fill-available',
          height: '-webkit-fill-available',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'noRepeat',
        }
      }
      let $imagePreview=null
        $imagePreview=(<div style={ styles.image1 }></div>)

      const computation=computationOffsetLoan.reduce((a, b) => a + b, 0)
      return (
        <div className={ 'mplview-container' }>
          {
            showReviewModal &&
            <ReviewModal
              amountValue={ format(amountValue) }
              imageUrlObject={ attachmentArray ? attachmentArray  : '' }
              modeOfLoanText={ modeOfLoanText }
              isPayeeOrDealer={ isPayeeOrDealer }
              supplierName={ supplierName }
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
                      supplierName,
                      amountValue,
                      modeOfLoanId,
                      loanType,
                      poaText,
                      termOfLoan,
                      selectedOffsetLoan,
                      fileObject,
                      attachmentArray
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
          <div className={ 'mpl-grid-column-2' }>
            <div></div>
            <Card className={ 'mpl-form-card' }>
              <h4>
                Benefits Form
              </h4>
              <div className={ 'mpl-form-card-body' }>
                <GenericTextBox
                  type={ 'button' }
                  value={ poaText ? poaText : '' }
                  onClick={ () =>
                    this.setState({ showPurposeOfAvailment : true }) }
                  onChange={ poaText =>
                    this.setState({ poaText }) }
                  placeholder={ 'Purpose Of Availment' }
                  type={ 'text' }/>
                <GenericTextBox
                  onChange={ modeOfLoanText =>
                    this.setState({ modeOfLoanText: modeOfLoanText ? modeOfLoanText : 'New Loan' }) }
                  onClick={ () =>
                    this.setState({ showOffset : true }) }
                  placeholder={ 'Mode of Loan' }
                  disabled={ modeOfLoanText ? modeOfLoanText : this.state.disabled }
                  value={ modeOfLoanText ? modeOfLoanText : 'New Loan' }
                  type={ 'text' }/>
                <GenericTextBox
                  value={ amountValue ? amountValue : '' }
                  onChange={ (e) =>
                    {
                      new MoneyValidation().isValid(e.target.value)  ?
                        this.setState({ amountValue : e.target.value })
                        :
                        this.setState({ amountValue : '' })
                     } }
                  placeholder={ 'Desired Amount' }
                  maxLength={ 11 }
                  type={ 'text' }/>
                <GenericTextBox
                  value={ `${ termOfLoan ? termOfLoan : '' } (${ rateOfLoan ? rateOfLoan : '' } %)` }
                  onChange={ (termOfLoan, rateOfLoan) =>
                    this.setState({ termOfLoan, rateOfLoan }) }
                  onClick={ () =>
                    this.setState({ showTerm : true }) }
                  placeholder={ 'Term of Loan' }
                  type={ 'text' }/>
                <GenericTextBox
                  value={ supplierName ? supplierName : '' }
                  onChange={ (e) =>
                    new RequiredAlphabetValidation().isValid(e.target.value) ?
                    this.setState({ supplierName : e.target.value }) :
                    this.setState({ supplierName : '' })
                  }
                  placeholder={ 'Supplier Name' }
                  type={ 'text' }/>
              </div>
              <br/>
                {
                  showOffsetLoanCard &&

                  <div className={ 'mpl-grid-column-2' }>
                    <div></div>
                    <Card className={ 'mpl-form-card' }>
                      <div className={ 'mpl-offset-grid' }>
                        <h4 className={ 'text-align-left' }>
                          Loans to Offset
                        </h4>
                        <div className={ 'text-align-right' }>
                          <span
                            onClick={ () => this.setState({ showOffsetOfLoanModal : true }) }
                            className={ 'mpl-icons-add mpl-add-offset' }/>
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
                    </Card>
                  </div>
                }
                <br/>
                {
                  attachmentArray.length !== 0 ?
                  <div>
                    <div className={'brv-form-card-body '}>
                      <h4>
                        Form Attachments
                      </h4>
                        <div>
                          {
                            attachmentArray.map((attachment, key) => (
                              <div key = { key }>
                                <FileUploader
                                accept={ 'image/gif,image/jpeg,image/jpg,image/png,' }
                                value={
                                  attachment.file && attachment.file.name
                                }
                                placeholder={ attachment.nfis ? attachment.name + ' for ' + attachment.nfis : attachment.name  }
                                onChange={
                                  (e) => {
                                    e.preventDefault()
                                    const updatedAttachment = [...attachmentArray]
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
                                          updatedArray[key].base64 = reader.result
                                          updatedAttachment[key].file = file
                                          this.setState({ attachmentArray : updatedAttachment })
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
                                    backgroundImage: `url('${attachment && attachment.base64}')`,
                                    width: 'auto',
                                    height: '60px',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                  } }
                                >
                                  <h6
                                    className="mpl-file-name">
                                    { attachment.file && attachment.file.name }
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                          ))
                        }
                      </div>
                  <GenericButton
                    type={ 'button' }
                    text={ 'continue' }
                    onClick={ () => this.sendFormData(
                      supplierName,
                      amountValue,
                      modeOfLoanId,
                      loanType,
                      poaText,
                      termOfLoan,
                      selectedOffsetLoan,
                      attachmentArray
                    ) }
                    className={ 'brv-submit' } />
                </div>
              </div>
              :

              <GenericButton
                type={ 'button' }
                text={ 'continue' }
                onClick={ () => this.sendFormData(
                  supplierName,
                  amountValue,
                  modeOfLoanId,
                  loanType,
                  poaText,
                  termOfLoan,
                  selectedOffsetLoan,
                  attachmentArray
                ) }
                className={ 'brv-submit' } />
              }
            </Card>
          </div>
        </div>
      )
    }
  }

ComputerLoanCardComponent.propTypes={
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
  isPayeeOrDealerResp:  PropTypes.string
}

export default ComputerLoanCardComponent
