import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MplFormLoanCardComponent extends Component {
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
      poaId: '',
      file1: '',
      file2: '',
      imagePreviewUrl: '',
      imagePreviewUrl2: '',
      showFileUpload: false,
    }
     this.onChange = this.onChange.bind(this)
     this.handleImageChange = this.handleImageChange.bind(this)
     this.handleImageChange2 = this.handleImageChange2.bind(this)
  }

  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value == '' ||  re.test(e.target.value)) {
        this.setState({ amountValue: e.target.value })
      }
   }

   sendFormData (desiredAmount, modeOfLoanId, loanTypeId, poaText, termId, file1, file2 ) {
     let amount = parseFloat(desiredAmount)
     let maximumAmount = parseFloat(this.props.validateLoanType.maximumLoanableAmount)
     let id = parseInt(loanTypeId)
     let term = parseInt(termId)
     let mode = parseInt(modeOfLoanId)
     if (amount >= maximumAmount) {
       store.dispatch(NotifyActions.addNotify({
           title : 'Warning' ,
           message : `You are only allowed to loan a maximum amount of ${ maximumAmount } `,
           type : 'warning',
           duration : 2000
         })
       )
     } else {
       if(
         id === null ||
         term === null ||
         mode === null ||
         amount === 0 ||
         poaText === ''
      ) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Warning' ,
            message : 'Please fill all the fields',
            type : 'warning',
            duration : 2000
          })
        )
      } else {
        this.props.presenter.addLoan(id, poaText, mode, term, desiredAmount, [ file1, file2 ])
      }
     }
   }
   getExtension (filename) {
     const parts = filename.split('/')
     return parts[parts.length - 1]
   }
   handleImageChange (e) {
     e.preventDefault()

     const reader = new FileReader()
     const [file1] = e.target.files
     let isValid
       switch (this.getExtension(file1.type).toLowerCase()) {
         case 'jpeg' :
           isValid = true
           break
         case 'jpg' :
           isValid = true
           break
         case 'png' :
           isValid = true
           break
         case 'pdf' :
           isValid = true
           break
     }

     if (isValid) {
        reader.onloadend = () => {
          this.setState({
            file1,
            imagePreviewUrl: reader.result
          })
        }
        reader.readAsDataURL(file1)
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

   handleImageChange2 (e1) {
     e1.preventDefault()
     const reader2 = new FileReader()
     const [file2] = e1.target.files
     let isValid
       switch (this.getExtension(file2.type).toLowerCase()) {
         case 'jpeg' :
           isValid = true
           break
         case 'jpg' :
           isValid = true
           break
         case 'png' :
           isValid = true
           break
         case 'pdf' :
           isValid = true
           break
     }
       if (isValid) {
          reader2.onloadend = () => {
            this.setState({
              file2,
              imagePreviewUrl2: reader2.result
            })
          }
          reader2.readAsDataURL(file2)
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
      file2,
      file1,
      imagePreviewUrl,
      imagePreviewUrl2,
      showFileUpload,
      response } = this.state
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      preferredFormData,
      offset,
      onGetPurposeOfLoan,
      formAttachments } = this.props

    const styles = {
      image1 : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
      },
      image2 : {
        backgroundImage: `url('${imagePreviewUrl2}')`,
        width: '-webkit-fill-available',
        height: '-webkit-fill-available',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'noRepeat',
      }
    }

    let $imagePreview1 = null
    let $imagePreview2 = null
      $imagePreview1 = (<div style = { styles.image1 }></div>)
      $imagePreview2 = (<div style = { styles.image2 }></div>)

    return (
      <div className = { 'mplview-container' }>
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
        <div className = { 'mpl-grid-column-2' }>
          <Card className = { 'mpl-form-card' }>
            <h4>
              Benefits Form
            </h4>
            <div className = { 'mpl-form-card-body' }>
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
                value = { offset ? modeOfLoanText : 'New Loan' }
                type = { 'text' }/>
              <GenericTextBox
                value = { amountValue }
                onChange = { this.onChange }
                placeholder = { 'Desired Amount' }
                maxLength = { 11 }
                type = { 'text' }/>
              <GenericTextBox
                value = { `${ termOfLoan } (${ rateOfLoan } %)` }
                onChange = { (termOfLoan, rateOfLoan) =>
                  this.setState({ termOfLoan, rateOfLoan }) }
                onClick = { () =>
                  this.setState({ showTerm : true }) }
                placeholder = { 'Term of Loan' }
                type = { 'text' }/>
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId, file1, file2) }
                className = { 'mplview-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
          <Card className = { 'mpl-form-preview' }>
            <h4>
              Form Attachments
            </h4>
            <div className = { 'mpl-body' }>
            {
              formAttachments.AdditionalDocuments && formAttachments.AdditionalDocuments.map((attachmentsLabel, key) =>
                <FileUploader
                   onChange = { this.handleImageChange }
                   value = { file1.name }
                   placeholder = {  attachmentsLabel ? attachmentsLabel : 0 }
                />
              )
            }
            </div>
            <div className = 'mpl-main'>
              <div className = { 'mpl-review' }>
               <div className = { 'mpl-image-view ' }>
                 { $imagePreview1 }
               </div>
               <div className = { 'mpl-image-view ' }>
               </div>
             </div>
            </div>
          </Card>
          }
        </div>
      </div>
    )
  }
}

MplFormLoanCardComponent.propTypes = {
  purposeOfAvailment : PropTypes.object,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
  formAttachments: PropTypes.array,
}

export default MplFormLoanCardComponent
