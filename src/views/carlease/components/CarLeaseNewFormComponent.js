import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/carleaseStyle.css'
import { GenericTextBox,  Card, GenericButton, FileUploader } from '../../../ub-components/'

import { RequiredAlphabetValidation, RequiredNumberValidation } from '../../../utils/validate'

import CarDealerQuotation from '../modals/CarDealerQuotationModal'
import CarBrandsModal from '../modals/CarBrandsModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

class CarLeaseNewFormComponent extends Component {

  constructor (props) {
    super(props)
    this.state={
      carBrand : '',
      carModel : '',
      makeYear : '',
      primaryColor : '',
      secondaryColor: '',
      file: '',
      imagePreviewUrl: '',
      showFileUpload: false,
      showQuotation: true,
      navigate: false,
      showCarBrands: false,
      carBrandId: ''
    }
     this.onChange=this.onChange.bind(this)
     this.getCarModel=this.getCarModel.bind(this)
     this.getPrimaryColor=this.getPrimaryColor.bind(this)
     this.getSecondaryColor=this.getSecondaryColor.bind(this)
     this.handleImageChange=this.handleImageChange.bind(this)
     this.onGetClicked=this.onGetClicked.bind(this)
  }

  getCarModel (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
      this.setState({ carModel : e.target.value }) :
      this.setState({ carModel : '' })
  }

  getPrimaryColor (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
      this.setState({ primaryColor : e.target.value }) :
      this.setSTate({ primaryColor : '' })
  }

  getSecondaryColor (e) {
    new RequiredAlphabetValidation().isValid(e.target.value) ?
      this.setState({ secondaryColor : e.target.value }):
      this.setState({ secondaryColor : '' })
  }

  onChange (e) {
    new RequiredNumberValidation().isValid(e.target.value) ?
      this.setState({ makeYear: e.target.value })  :
      this.setState({ makeYear: '' })
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
    primaryColor,
    secondaryColor,
    file,
    imagePreviewUrl) {
      const attachments=[{
        "base64Doc" : file,
      }]
    this.props.onSubmit(
      carBrand,
      carModel,
      makeYear,
      primaryColor,
      secondaryColor,
      file
    )
  }

  navigateBenefits () {
    this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const {
      carBrand,
      carBrandId,
      carModel,
      makeYear,
      primaryColor,
      secondaryColor,
      file,
      imagePreviewUrl,
      showFileUpload,
      showQuotation,
      navigate,
      showCarBrands
    }=this.state

    const {
      loanType,
      history,
      brands,
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
          {
            showQuotation &&
            <CarDealerQuotation
              history={ history }
              backToBenefits={ this.navigateBenefits.bind(this) }
              onUserConfirmation={ (showQuotation, showFileUpload) =>
                this.setState({ showQuotation, showFileUpload })
             }
              onClose={ () =>
                this.setState({ showQuotation: false })  }
              />
          }
          {
            showCarBrands &&
            <CarBrandsModal
              brands={ brands }
              onGetCarBrands={ (car, hideModal) =>
              this.setState({ carBrand : car.name, carId : car.id, showCarBrands: hideModal}) }
              onClose={ ()=>
                this.setState({ showCarBrands : false } )
            }
            />
          }
          <Card className={ 'car-form-card' }>
            <h4>
              Car Lease Form (New)
            </h4>
            <div className={ 'car-form-card-body' }>
              <GenericTextBox
                value={ carBrand }
                onClick={ ()=> this.setState({ showCarBrands : true }) }
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
                maxLength={ 4 }
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
                    file,
                    imagePreviewUrl)
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

CarLeaseNewFormComponent.propTypes={
  loanType : PropTypes.number,
  setSelectedNavigation: PropTypes.func,
  history: PropTypes.object,
  brands: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
}

export default CarLeaseNewFormComponent
