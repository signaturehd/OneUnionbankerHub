import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/laptopLeaseComponentStyle.css'
import {
  GenericTextBox,
  GenericInput,
  Card,
  GenericButton,
  FileUploader,
  MultipleFileUploader,
  Line
} from '../../../ub-components/'

import LaptopBrandModal from '../modals/LaptopBrandModal'

class LaptopLeaseCardComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      loanType,
      history,
      laptopModel,
      carBrand,
      screenSize,
      primaryColor,
      solRCDefault,
      solRC,
      solId,
      solIdErrorMessage,
      cmUnit,
      secondaryColor,
      showQuotation,
      showFileUpload,
      onGetLaptopBrandsFunc,
      onlaptopModelValidateFunc,
      onValidateyearFunc,
      onValidatePrimaryColor,
      onValidateSecondaryColor,
      onValidateSolRC,
      onShowEnterSolRCModalFunc,
      onShowInsurancePaymentFunc,
      insurancePayment,
      onChangeSolRCFunc,
      onChangeSolIdFunc,
      solRCErrorMessage,
      onSubmit,
      onEdit,
      onContinue,
      yearErrorMessage,
      showEditMode,
      getFileArray,
      attachments
    }=this.props

    return (
      <div className={'carview-container'}>
        <div className={ 'car-grid-column-2' }>
          <div></div>
          <div className={ 'car-form-card' }>
            <Line/>
            <br/>
            <div className={ 'car-form-card-body' }>

            <div className = { 'grid-global' }>
              <GenericInput
                placeholder = { 'Brand' }
                errorMessage = { '' }
                onClick ={ () => onGetLaptopBrandsFunc() }
                text = { 'Brands' }
                disabled = { showEditMode }
                value = { carBrand }
                readOnly
                />
              <GenericInput
                placeholder = { 'Model' }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Model' }
                onChange = { (e) => onlaptopModelValidateFunc(e.target.value) }
                value = { laptopModel }
                />
            </div>
            <div className = { 'grid-global' }>
              <GenericInput
                value = { screenSize }
                disabled = { showEditMode }
                maxLength = { 4 }
                onChange = { (e) => onValidateyearFunc(e.target.value) }
                text = { 'Screen size' }
                disabled = { showEditMode }
                errorMessage = { yearErrorMessage }
                />
                <GenericInput
                  value = { secondaryColor }
                  disabled = { showEditMode }
                  hint = { '(e.g) Red, Black, White & etc.' }
                  onChange = { (e) => onValidateSecondaryColor(e.target.value)  }
                  maxLength = { 20 }
                  errorMessage = { '' }
                  text = { 'Color Family' }
                />
            </div>
            <div className = { 'grid-global' }>
              <GenericInput
                value = { primaryColor }
                onChange = { (e) => onValidatePrimaryColor(e.target.value)  }
                maxLength = { 20 }
                errorMessage = { '' }
                disabled = { showEditMode }
                text = { 'Operating System' }
              />
              <GenericInput
                value = { secondaryColor }
                disabled = { showEditMode }
                onChange = { (e) => onValidateSecondaryColor(e.target.value)  }
                maxLength = { 20 }
                errorMessage = { '' }
                text = { 'Processor Type' }
              />
            </div>
            <div className = { 'grid-global' }>
              <GenericInput
                disabled = { showEditMode }
                value = { insurancePayment }
                onClick = { () => onShowInsurancePaymentFunc() }
                readOnly
                errorMessage = { '' }
                text = { 'Hard Drive Capacity' }
              />
              <GenericInput
                value = { secondaryColor }
                disabled = { showEditMode }
                onChange = { (e) => onValidateSecondaryColor(e.target.value)  }
                maxLength = { 20 }
                errorMessage = { '' }
                text = { 'System Memory' }
              />
            </div>
            <div className = { 'grid-global' }>
              <GenericInput
                disabled = { showEditMode }
                value = { solId }
                onChange = { (e) => onChangeSolIdFunc(e.target.value) }
                errorMessage = { solIdErrorMessage }
                text = { 'Graphics Card' }
                maxLength = { 20 }
              />
              <GenericInput
                disabled = { showEditMode }
                value = { solRCDefault ? solRCDefault : solRC }
                onChange = { (e) => onChangeSolRCFunc(e.target.value) }
                onClick = { () => onShowEnterSolRCModalFunc }
                errorMessage = { solRCErrorMessage }
                text = { 'Estimated Cost' }
                maxLength = { 20 }
              />
            </div>
              <GenericInput
                value = { cmUnit }
                disabled = { showEditMode }
                readOnly
                text = { 'Delivery Option' }
              />
              {
                showFileUpload &&
                <MultipleFileUploader
                  placeholder = { 'Dealer Quotations' }
                  disabled = { showEditMode }
                  fileArray = { attachments }
                  setFile = { (file) => getFileArray(file) }
                  />
              }
              <br/>
              <Line/>
              {
                showEditMode &&
                <center>
                  <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
                </center>
              }
              <br/>
              {
                showEditMode ?
                <div className = { 'grid-global' }>
                  <GenericButton
                    text={ 'Edit' }
                    onClick={ () =>
                      onEdit()
                      }
                    className={ 'carview-submit' } />
                  <GenericButton
                    text={ 'Submit' }
                    onClick={ () =>
                      onSubmit()
                      }
                    className={ 'carview-submit' } />

                </div>
                :
                <GenericButton
                  text={ 'Continue' }
                  onClick={ () =>
                    onContinue()
                    }
                  className={ 'carview-submit' } />
              }
            </div>
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

LaptopLeaseCardComponent.propTypes = {
  loanType : PropTypes.number,
  screenSize : PropTypes.string,
  setSelectedNavigation: PropTypes.func,
  getFileArray: PropTypes.func,
  onShowInsurancePaymentFunc: PropTypes.func,
  insurancePayment: PropTypes.string,
  history: PropTypes.object,
  carBrand: PropTypes.string,
  solRCDefault: PropTypes.string,
  solRC: PropTypes.string,
  solId: PropTypes.string,
  onChangeSolIdFunc: PropTypes.func,
  solIdErrorMessage: PropTypes.string,
  cmUnit: PropTypes.string,
  laptopModel: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
  yearErrorMessage: PropTypes.string,
  primaryColor: PropTypes.bool,
  showQuotation: PropTypes.bool,
  showFileUpload: PropTypes.bool,
  onlaptopModelValidateFun: PropTypes.func,
  onChangeSolRCFunc: PropTypes.func,
  onValidateyearFunc: PropTypes.func,
  onValidatePrimaryColor: PropTypes.func,
  onValidateSecondaryColor: PropTypes.func,
  onValidateSolRC: PropTypes.func,
  onShowEnterSolRCModalFunc: PropTypes.func,
  onSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  onContinue: PropTypes.func,
  attachments : PropTypes.array
}

export default LaptopLeaseCardComponent
