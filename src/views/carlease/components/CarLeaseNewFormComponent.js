import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/carleaseStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class CarLeaseNewFormComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      carBrand : '',
      carModel : '',
      makeYear : '',
      primaryColor : '',
      secondaryColor: '',
      file: '',
      imagePreviewUrl: '',
      showFileUpload: true,
    }
     this.onChange = this.onChange.bind(this)
     this.getCarBrand = this.getCarBrand.bind(this)
     this.getCarModel = this.getCarModel.bind(this)
     this.getPrimaryColor = this.getPrimaryColor.bind(this)
     this.getSecondaryColor = this.getSecondaryColor.bind(this)
     this.handleImageChange = this.handleImageChange.bind(this)
     this.onGetClicked = this.onGetClicked.bind(this)
  }

  getCarBrand (e) {
    this.setState({ carBrand : e.target.value })
  }

  getCarModel (e) {
    this.setState({ carModel : e.target.value })
  }

  getPrimaryColor (e) {
    this.setState({ primaryColor : e.target.value })
  }

  getSecondaryColor (e) {
    this.setState({ secondaryColor : e.target.value })
  }

  onChange (e) {
      const re = /^[0-9\.]+$/
      if (e.target.value === '' || re.test(e.target.value)) {
        this.setState({ makeYear: e.target.value })
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

  onGetClicked (
    carBrand,
    carModel,
    makeYear,
    primaryColor,
    secondaryColor,
    file) {
    this.props.onSubmit(
      carBrand,
      carModel,
      makeYear,
      primaryColor,
      secondaryColor,
      file
    )
  }

  render () {
    const {
      carBrand,
      carModel,
      makeYear,
      primaryColor,
      secondaryColor,
      file,
      imagePreviewUrl,
      showFileUpload } = this.state
    const {
      loanType } = this.props

      const styles = {
        image : {
          backgroundImage: `url('${imagePreviewUrl}')`,
          width : '-webkit-fill-available',
          height : '-webkit-fill-available',
          backgroundSize : 'cover',
          backgroundRepeat : 'no-repeat',
        }
      }

      let $imagePreview = null
        $imagePreview = (<div style = { styles.image }></div>)

    return (
      <div className={'carview-container'}>
        <div className={ 'car-grid-column-2' }>
          <Card className={ 'car-form-card' }>
            <h4>
              Car Lease Form (Old)
            </h4>
            <div className={ 'car-form-card-body' }>
              <GenericTextBox
                value={ carBrand }
                onChange={ this.getCarBrand }
                placeholder={ 'Brand' }
                type={ 'text' }/>
              <GenericTextBox
                value={ carModel }
                onChange={ this.getCarModel }
                placeholder={ 'Model' }
                type={ 'text' }/>
              <GenericTextBox
                value={ makeYear }
                onChange={ this.onChange }
                placeholder={ 'Year' }
                type={ 'text' } />
              <GenericTextBox
                value={ primaryColor }
                onChange={ this.getPrimaryColor }
                placeholder={ 'Primary Color' }
                type={ 'text' }/>
              <GenericTextBox
                value={ secondaryColor }
                onChange={ this.getSecondaryColor }
                placeholder={ 'Secondary Color' }
                type={ 'text' }/>
              <GenericButton
                type={ 'button' }
                text={ 'continue' }
                onClick={ () =>
                  this.onGetClicked(
                    carBrand,
                    carModel,
                    makeYear,
                    primaryColor,
                    secondaryColor,
                    file)
                  }
                className={ 'carview-submit' } />
            </div>
          </Card>
          {
            showFileUpload &&
          <Card className={ 'car-form-preview' }>
            <h4>
              Dealer Quotation Attachment
            </h4>
            <div className={ 'optical-body' }>
             <FileUploader
                onChange={ this.handleImageChange }
                placeholder={ 'File Attachments' }
                value={ file.name }
              />
            </div>
            <div className={ 'car-form-card-body' }>
              <div className={ 'car-footer-left' }>
                <div className={ 'car-grid' }>
                  <div className={ 'car-image-view' }>
                    { $imagePreview }
                    <div className={ 'car-image-layer' }></div>
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

CarLeaseNewFormComponent.propTypes = {
  loanType : PropTypes.number,
  setSelectedNavigation: PropTypes.func,
}

export default CarLeaseNewFormComponent
