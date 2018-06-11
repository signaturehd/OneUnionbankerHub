import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class MplFormCardComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPurposeOfAvailment: false,
      showOffset: false,
      showTerm: false,
      poaText : '',
      amountValue: '',
      modeOfLoan: '',
      termOfLoan: '',
      rateOfLoan: '',
      subCategoryId: null,
      poaId: null,
      file: '',
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

   sendFormData (desiredAmount, modeLoan, loanTypeId, purposeOfAvailmentId ) {
     const amount = parseFloat(desiredAmount)
     const maximumAmount = parseFloat(this.props.validateLoanType.maximumLoanableAmount)
     if(amount >= maximumAmount) {
       store.dispatch(NotifyActions.addNotify({
           title : 'Warning' ,
           message : `You are only allowed to loan a maximum amount of ${ maximumAmount } `,
           type : 'warning',
           duration : 2000
         })
       )
     } else {
        // this.props.presenter.addLoan(1, 'Personal',1, 1, 50000)
     }
   }
   getExtension (filename) {
     const parts = filename.split('/')
     return parts[parts.length - 1]
   }
   handleImageChange (e) {
     e.preventDefault()

     const reader = new FileReader()
     const [file] = e.target.files
     let isValid
       switch (this.getExtension(file.type).toLowerCase()) {
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
            file,
            imagePreviewUrl: reader.result
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
  render() {
    const {
      showPurposeOfAvailment,
      showOffset,
      showTerm,
      poaText,
      amountValue,
      modeOfLoan,
      termOfLoan,
      rateOfLoan,
      file2,
      file,
      imagePreviewUrl,
      imagePreviewUrl2,
      showFileUpload } = this.state
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      preferredFormData,
      offset } = this.props

      const styles = {
        image1 : {
          backgroundImage: `url('${imagePreviewUrl}')`,
          width : '225px',
          height : '240px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        },
        image2 : {
          backgroundImage: `url('${imagePreviewUrl2}')`,
          width : '225px',
          height : '240px',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        }
      }

      let $imagePreview = null
      let $imagePreview2 = null
        $imagePreview = (<div style = {styles.image1}></div>)
        $imagePreview2 = (<div style = {styles.image2}></div>)

    return(
      <div className = {'mplview-container'}>
        {
          showOffset &&
          <ModeOfLoanModal
            offset  = {  offset && offset }
            onSubmit = { (changeOffsetValue, closePoaModal) =>
              this.setState({
                modeOfLoan : changeOffsetValue,
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
            presenter = { this.presenter }
            loanType = { loanType }
            onSubmit = { (changePoaText, subcategory, closePoaModal, bool) =>
              this.setState({
                poaText : changePoaText.name,
                poaId : changePoaText.id ? changePoaText.id : 0,
                subCategoryId: subcategory.id,
                showPurposeOfAvailment : closePoaModal,
                showFileUpload :bool
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
            <div className = {'mpl-form-card-body '}>
              <GenericTextBox
                type = 'button'
                value = { poaText }
                onClick = { () =>
                  this.setState({ showPurposeOfAvailment : true }) }
                onChange = { (poaText) =>
                  this.setState({ poaText }) }
                placeholder = { 'Purpose Of Availment' }
                type = { 'text' }/>
              <GenericTextBox
                onChange = { (modeOfLoan) =>
                  this.setState({ modeOfLoan }) }
                onClick = { () =>
                  this.setState({ showOffset : true }) }
                placeholder = { 'Mode of Loan' }
                value = { offset ? 'New Loan' : modeOoffsetfLoan }
                type = { 'text' }/>
              <GenericTextBox
                value = { amountValue }
                onChange = { this.onChange }
                placeholder = { 'Desired Amount' }
                type = { 'text' }/>
              <GenericTextBox
                value = { `Term: ${termOfLoan} Rate: ${rateOfLoan}` }
                onChange = { (termOfLoan, rateOfLoan) =>
                  this.setState({ termOfLoan, rateOfLoan }) }
                onClick = { () =>
                  this.setState({ showTerm : true }) }
                placeholder = { 'Term of Loan' }
                type = { 'text' }/>
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => this.sendFormData(amountValue, null, null) }
                className = { 'mplview-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
          <Card className = { 'mpl-form-card' }>
            <h4>
              Form Attachments
            </h4>
            <div className = {'optical-body'}>
             <FileUploader
                onChange = { this.handleImageChange }
                placeholder = 'Bill Materials'
                value = { this.state.file.name }
              />
              <FileUploader
                onChange = { this.handleImageChange2 }
                placeholder = 'Medical Certificate'
                value = { this.state.file2.name }
              />
            </div>
            <div className = { 'mpl-form-card-body' }>
              <div className = {'optical-footer-left'}>
                <div className = { 'optical-grid' }>
                  <div className = { 'optical-image-view' }>
                    {$imagePreview}
                    <div className = { 'optical-image-layer' }></div>
                  </div>
                  <div className = { 'optical-image-view' }>
                    {$imagePreview2}
                    <div className = {  'optical-image-layer' }></div>
                  </div>
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

MplFormCardComponent.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default MplFormCardComponent
