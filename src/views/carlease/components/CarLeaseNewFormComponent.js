import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/carleaseStyle.css'
import {
  GenericTextBox,
  GenericInput,
  Card,
  GenericButton,
  FileUploader,
  Line
} from '../../../ub-components/'

import { RequiredAlphabetValidation, RequiredNumberValidation } from '../../../utils/validate'
import CarBrandsModal from '../modals/CarBrandsModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class CarLeaseNewFormComponent extends Component {

  constructor (props) {
    super(props)
    this.state={
      file: '',
      imagePreviewUrl: '',
      navigate: false,
    }
     this.handleImageChange=this.handleImageChange.bind(this)
     this.onGetClicked=this.onGetClicked.bind(this)
  }

   getExtension (filename) {
     const parts=filename.split('/')
     return parts[parts.length - 1]
   }

   handleImageChange (e) {
     e.preventDefault()

     const reader=new FileReader()
     const [file]=e.target.files
     let isValid
       switch (this.getExtension(file.type).toLowerCase()) {
         case 'jpeg' :
           isValid=true
           break
         case 'jpg' :
           isValid=true
           break
         case 'png' :
           isValid=true
           break
         case 'pdf' :
           isValid=true
           break
     }

     if (isValid) {
        reader.onloadend=() => {
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

  onGetClicked (
    carBrand,
    carModel,
    makeYear,
    solRC,
    cmUnit,
    primaryColor,
    secondaryColor,
    file,) {
    this.props.onSubmit(
      carBrand,
      carModel,
      makeYear,
      solRC,
      cmUnit,
      primaryColor,
      secondaryColor,
      file)
  }

  render () {
    const {
      file,
      imagePreviewUrl,
      navigate,
    }=this.state

    const {
      loanType,
      history,
      carModel,
      carBrand,
      makeYear,
      primaryColor,
      solRCDefault,
      cmUnit,
      secondaryColor,
      showQuotation,
      showFileUpload,
      onGetCarBrandsFunc,
      onCarModelValidateFunc,
      onValidateyearFunc,
      onValidatePrimaryColor,
      onValidateSecondaryColor,
      onValidateSolRC,
      onShowEnterSolRCModalFunc
    }=this.props

    const styles={
      image : {
        backgroundImage: `url('${imagePreviewUrl}')`,
        width : '-webkit-fill-available',
        height : '-webkit-fill-available',
        backgroundSize : 'cover',
        backgroundRepeat : 'no-repeat',
      }
    }

    let $imagePreview=null
      $imagePreview=(<div style={ styles.image }></div>)

    return (
      <div className={'carview-container'}>
        <div className={ 'car-grid-column-2' }>
          <div></div>
          <div className={ 'car-form-card' }>
            <Line/>
            <br/>
            <div className={ 'car-form-card-body' }>
              <GenericInput
                placeholder = { 'Brand' }
                errorMessage = { '' }
                onClick ={ () => onGetCarBrandsFunc() }
                text = { 'Brands' }
                value = { carBrand }
                readOnly
                />
              <GenericInput
                placeholder = { 'Model' }
                errorMessage = { '' }
                text = { 'Model' }
                onChange = { (e) => onCarModelValidateFunc(e.target.value) }
                value = { carModel }
                />
              <GenericInput
                value = { makeYear }
                hint = { '(e.g) 2001... 2017, 2018' }
                maxLength = { 4 }
                onChange = { (e) => onValidateyearFunc(e.target.value) }
                text = { 'Year' }
                errorMessage = { '' }
                />
              <GenericInput
                value = { primaryColor }
                hint = { '(e.g) Red, Black, White & etc.' }
                onChange = { (e) => onValidatePrimaryColor(e.target.value)  }
                maxLength = { 20 }
                errorMessage = { '' }
                text = { 'Primary Color' }
              />
              <GenericInput
                value = { secondaryColor }
                hint = { '(e.g) Red, Black, White & etc.' }
                onChange = { (e) => onValidateSecondaryColor(e.target.value)  }
                maxLength = { 20 }
                errorMessage = { '' }
                text = { 'Secondary Color' }
              />
              <GenericInput
                value = { solRCDefault }
                onClick = { () => {} }
                maxLength = { 20 }
                readOnly
                onClick = { () => onShowEnterSolRCModalFunc }
                errorMessage = { '' }
                text = { 'Sol RC' }
              />
              <GenericInput
                value = { cmUnit }
                readOnly
                text = { 'CM Unit' }
              />
              {
                showFileUpload &&
                <div>
                  <h4>
                    Dealer Quotation Attachment
                  </h4>
                  <div>
                   <FileUploader
                      onChange = { this.handleImageChange }
                      placeholder = { 'File Attachments' }
                      value = { file.name }
                      base64 = { $imagePreview }
                      disabled = { false }
                    />
                  </div>
                </div>
                }
                <GenericButton
                  type={ 'button' }
                  text={ 'continue' }
                  onClick={ () =>
                    this.onGetClicked(
                      carBrand,
                      carModel,
                      makeYear,
                      solRCDefault,
                      cmUnit,
                      primaryColor,
                      secondaryColor,
                      file)
                    }
                  className={ 'carview-submit' } />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

CarLeaseNewFormComponent.propTypes = {
  loanType : PropTypes.number,
  makeYear : PropTypes.number,
  setSelectedNavigation: PropTypes.func,
  history: PropTypes.object,
  carBrand: PropTypes.string,
  solRCDefault: PropTypes.string,
  cmUnit: PropTypes.string,
  carModel: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  primaryColor: PropTypes.bool,
  showQuotation: PropTypes.bool,
  showFileUpload: PropTypes.bool,
  onCarModelValidateFun: PropTypes.func,
  onValidateyearFunc: PropTypes.func,
  onValidatePrimaryColor: PropTypes.func,
  onValidateSecondaryColor: PropTypes.func,
  onValidateSolRC: PropTypes.func,
  onShowEnterSolRCModalFunc: PropTypes.func,
}

export default CarLeaseNewFormComponent
