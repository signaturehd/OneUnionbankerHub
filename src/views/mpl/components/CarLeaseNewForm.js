import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/mplComponentStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import PurposeOfAvailmentModal from '../../mpl/modals/PurposeOfAvailmentModal'
import ModeOfLoanModal from '../../mpl/modals/ModeOfLoanModal'
import TermOfLoanModal from '../../mpl/modals/TermOfLoanModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class CarLeaseNewForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carBrand : '',
      carModel : '',
      makeYear : '',
      primaryColor : '',
      secondayeryColor: '',
      file: '',
      file2: '',
      imagePreviewUrl: '',
      imagePreviewUrl2: '',
      showFileUpload: true,
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
  render () {
    const {
      showPurposeOfAvailment,
      carBrand,
      carModel,
      makeYear,
      primaryColor,
      secondayeryColor,
      file2,
      file,
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
      onGetPurposeOfLoan } = this.props
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

    return (
      <div className = {'mplview-container'}>
        <div className = { 'mpl-grid-column-2' }>
          <Card className = { 'mpl-form-card' }>
            <h4>
              Car Lease Form (New)
            </h4>
            <div className = {'mpl-form-card-body '}>
              <GenericTextBox
                type = 'text'
                placeholder = { 'Brand' }
                type = { 'text' }/>
              <GenericTextBox
                placeholder = { 'Model' }
                type = { 'text' }/>
              <GenericTextBox
                placeholder = { 'Year' }
                type = { 'text' }/>
              <GenericTextBox
                placeholder = { 'Primary Color' }
                type = { 'text' }/>
              <GenericTextBox
                placeholder = { 'Secondary Color' }
                type = { 'text' }/>
              <GenericButton
                type = { 'button' }
                text = { 'continue' }
                onClick = { () => this.sendFormData(amountValue, modeOfLoanId, loanType, poaText, termId) }
                className = { 'mplview-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
          <Card className = { 'mpl-form-preview' }>
            <h4>
              Dealer Quotation Attachment
            </h4>
            <div className = {'optical-body'}>
             <FileUploader
                onChange = { this.handleImageChange }
                placeholder = 'Dealer Quotation'
                value = { this.state.file.name }
              />
              <FileUploader
                onChange = { this.handleImageChange2 }
                placeholder = 'Dealer Quotation'
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

CarLeaseNewForm.propTypes = {
  purposeOfAvailment : PropTypes.array,
  validateLoanType : PropTypes.array,
  loanType : PropTypes.number,
  preferredFormData : PropTypes.func,
  offset : PropTypes.array,
  setSelectedNavigation: PropTypes.func,
}

export default CarLeaseNewForm
