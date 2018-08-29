import React, { Component } from 'react'
import PropTypes from 'prop-types'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

import {
  Modal,
  GenericButton,
  MultipleFileUploader,
  MultipleAttachments,
  GenericInput,
  SingleInputModal,
  Line
} from '../../../ub-components/'

import './styles/calamityModalStyle.css'
import { format } from '../../../utils/numberUtils'

import imageDefault from '../../../images/profile-picture.png'

import { RequiredValidation } from '../../../utils/validate/'

class CalamityFormGenericModal extends Component {

  constructor (props) {
    super (props)

    this.state = {
      genericFileAttachmentArray : [],
    }
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  getDamagePropertyObject () {
    const {
      property,
      propertyDesc,
      propertyType,
      acquisitionValue,
      estimatedCost,
      getPropertyHolderFunc,
      requestPropertyTypeFunc,
      propertyDescFunc,
      propertyFunc,
      acquisitionFunc,
      estimatedCostFunc,
      hideModalPropertyFormFunc,
      resetInstance,
      propertyErrorMessageFunc,
      propertyTypeErrorMessageFunc,
      propertyDescErrorMessageFunc,
      estimatedCostErrorMessageFunc,
      acquisitionErrorMessageFunc,
    } = this.props

    const {
      genericFileAttachmentArray
    } = this.state

    const damagePropertyObject = {
      propertyName : property,
      description : propertyDesc,
      propertyType : propertyType,
      acquisitionValue : acquisitionValue,
      repairCost : estimatedCost,
      imageKey: genericFileAttachmentArray
    }

    if (!this.validator(property)) {
      propertyErrorMessageFunc('Please provide information in property field')
    } else if (!this.validator(propertyDesc)) {
      propertyDescErrorMessageFunc('Please include the description of the property')
    } else if (!this.validator(propertyType)) {
      propertyTypeErrorMessageFunc('Please select the type of property')
    } else if (!this.validator(acquisitionValue)) {
      acquisitionErrorMessageFunc('Acquisition value is required')
    } else if (!this.validator(estimatedCost)) {
      estimatedCostErrorMessageFunc('Estimated cost is required')
    } else {
      getPropertyHolderFunc(damagePropertyObject)
      resetInstance()
      this.setState({ genericFileAttachmentArray : [] })
      hideModalPropertyFormFunc(false)
    }
  }

  updateSelectedPropertyObject () {
    const {
      updateModeFunc,
      damagePropertyCardHolder,
      property,
      propertyType,
      propertyDesc,
      propertyFunc,
      requestPropertyTypeFunc,
      propertyDescFunc,
      acquisitionFunc,
      estimatedCostFunc,
      resetInstance,
      estimatedCost,
      acquisitionValue,
      getPropertyHolderFunc,
      updateDataPropertyHolderFunc
    } = this.props
    const { genericFileAttachmentArray } =this.state

    const updateInstance = [...damagePropertyCardHolder]
    let updateProperty, updatePropertyDesc, updatePropertyType, updateAcquisitionValue, updateEstimatedCost, updateImages
    damagePropertyCardHolder.map((data, key) => {
      updateProperty = property
      updatePropertyDesc = propertyDesc
      updatePropertyType = propertyType
      updateAcquisitionValue = estimatedCost
      updateImages = [...data.imageKey]
      data.imageKey.map((images, key) => {
        images.base64 = images.base64
        images.file = images.file
        images.name = images.name
      })
      data.propertyName = updateProperty
      data.description = updatePropertyDesc
      data.propertyType = updatePropertyType
      data.acquisitionValue = updateAcquisitionValue
      data.repairCost = updateEstimatedCost
      data.imageKey = updateImages
      })

      updateDataPropertyHolderFunc(updateInstance)
      propertyFunc('')
      propertyDescFunc('')
      requestPropertyTypeFunc('')
      acquisitionFunc('')
      estimatedCostFunc('')
      resetInstance()
      this.setState({ genericFileAttachmentArray : [] })
      updateModeFunc(false)
  }

  render () {
    const {
      showModal,
      showReviewCalamityModal,
      showPropertyTypeModal,
      showPropModal,
      showErrorModal,
      setAttachmentFunc,
      addAttachmentsFunc,
      requestCalamityTypeFunc,
      requestPropertyTypeFunc,
      hideModalPropertyFormFunc,
      hideModalPropertyTypeFunc,
      onClick,
      countFunc,
      onFocus,
      getPropertyHolderFunc,
      propertyFunc,
      propertyDescFunc,
      acquisitionFunc,
      estimatedCostFunc,
      calamityAssistance,
      defaultDamageProperty,
      handleChange,
      showEditSubmitButton,
      property,
      propertyDesc,
      propertyType,
      acquisitionValue,
      estimatedCost,
      propertyTypeValue,
      count,
      setPropertyData,
      propertyErrorMessage,
      propertyTypeErrorMessage,
      propertyDescErrorMessage,
      estimatedCostErrorMessage,
      acquisitionErrorMessage,
      updateMode
    }=this.props

    return (
      <Modal
        onClose = { () => hideModalPropertyFormFunc(false) }
        isDismisable = { true }
        width = { 50 }>
        {
          showPropertyTypeModal &&
          <SingleInputModal
            label = { 'Property Type' }
            inputArray = { propertyTypeValue && propertyTypeValue }
            selectedArray = { (propertyId, propertyType) =>
              setPropertyData(
                propertyId,
                propertyType,
                false,
                '')
            }
            onClose = { () => hideModalPropertyTypeFunc(false) }
          />
        }
        <div>
          <h4>
            Property Form
          </h4>
          <GenericInput
            value={ property }
            onChange={ (e) => propertyFunc(e.target.value) }
            text={ 'Property' }
            type={ 'text' }
            errorMessage = { !property && propertyErrorMessage }/>
          <GenericInput
            value={ propertyDesc  }
            onChange={ (e) => propertyDescFunc(e.target.value) }
            text={ 'Property Description' }
            type={ 'text' }
            errorMessage = { !propertyDesc && propertyDescErrorMessage}/>
          <GenericInput
            value={ propertyType }
            onClick={ () => requestPropertyTypeFunc(true) }
            text={ 'Property Type' }
            errorMessage = { !propertyType && propertyTypeErrorMessage }/>
          <GenericInput
            value={ acquisitionValue  }
            onChange={ (e) => acquisitionFunc(e.target.value) }
            maxLength = { 10 }
            text={ 'Acquisition Value' }
            type={ 'text' }
            errorMessage = { !acquisitionValue && acquisitionErrorMessage }/>
          <GenericInput
            value={ estimatedCost }
            onChange={ (e) => estimatedCostFunc(e.target.value) }
            text={ 'Estimated Repair Cost' }
            type={ 'text' }
            maxLength = { 5 }
            errorMessage = { !estimatedCost && estimatedCostErrorMessage }
            />
          <div className = { 'grid-global' }>
            <h2></h2>
            <div className = { 'text-align-right' }>
              <GenericButton
                text = { 'Add Attachments' }
                onClick = { () => addAttachmentsFunc() }
                />
            </div>
          </div>
          {
            defaultDamageProperty.length !== 0  &&
            <div>
            <h4>
              <br/>
              Form Attachments
            </h4>
            <MultipleAttachments
              count = { count }
              countFunc = { (count) => countFunc(count) }
              placeholder = { '.' }
              fileArray = { defaultDamageProperty }
              setFile = { (genericFileAttachmentArray) =>
                  this.setState({ genericFileAttachmentArray })
              }
              disabled = { showEditSubmitButton }
              errorMessage = {
                showEditSubmitButton ?
                '' :
                `Please upload the required attachments`  }
              />
            </div>
           }
          <br/>
          <Line/>
          <br/>
          <div className = { 'grid-global' }>
            <GenericButton
              text = { 'Cancel' }
              onClick = { () => hideModalPropertyFormFunc(false)  }
              />
            {
              updateMode ?

              <GenericButton
                text={ 'Update' }
                onClick={
                () => this.updateSelectedPropertyObject()
              }/> :
              <GenericButton
                text={ 'Add' }
                onClick={
                () => this.getDamagePropertyObject()
                }/>
            }
          </div>
        </div>
      </Modal>
    )
  }
}

CalamityFormGenericModal.propTypes = {
  setAttachmentFunc : PropTypes.func,
  updateModeFunc : PropTypes.func,
  addAttachmentsFunc : PropTypes.func,
  requestCalamityTypeFunc : PropTypes.func,
  requestPropertyTypeFunc: PropTypes.func,
  getPropertyHolderFunc : PropTypes.func,
  acquisitionFunc : PropTypes.func,
  estimatedCostFunc : PropTypes.func,
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  setAttachmentFunc  : PropTypes.func,
  onCancel : PropTypes.func,
  propertyType : PropTypes.func,
  hideModalPropertyFormFunc : PropTypes.func,
  hideModalPropertyTypeFunc : PropTypes.func,
  showPropertyTypeModal : PropTypes.bool,
  updateMode  : PropTypes.bool,
  defaultDamageProperty : PropTypes.array,
  propertyTypeValue : PropTypes.object,
  propertyErrorMessage : PropTypes.string,
  propertyTypeErrorMessage : PropTypes.string,
  propertyDescErrorMessage : PropTypes.string,
  estimatedCostErrorMessage : PropTypes.string,
  acquisitionErrorMessage : PropTypes.string,
}
CalamityFormGenericModal.defaultProps={
  confirm : 'Add',
  cancel : 'Cancel',
}

export default CalamityFormGenericModal
