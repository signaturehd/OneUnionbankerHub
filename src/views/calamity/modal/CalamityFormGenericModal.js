import React, { Component } from 'react'
import PropTypes from 'prop-types'

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

class CalamityFormGenericModal extends Component {

  constructor (props) {
    super (props)

    this.state = {
      genericFileAttachmentArray : [],
    }
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
      hideModalPropertyFormFunc
    } = this.props

    const {
      genericFileAttachmentArray
    } = this.state

    const damagePropertyObject = {
      properTyName : property,
      description : propertyDesc,
      acquisitionValue : acquisitionValue,
      repairCost : estimatedCost,
      imageKey: genericFileAttachmentArray
    }
    getPropertyHolderFunc(damagePropertyObject)
    propertyFunc('')
    requestPropertyTypeFunc('')
    propertyDescFunc('')
    acquisitionFunc('')
    estimatedCostFunc('')
    this.setState({ genericFileAttachmentArray : [] })
    hideModalPropertyFormFunc(false)
  }

  render () {
    const {
      calamityAssistance,
      defaultDamageProperty,
      setAttachmentFunc,
      addAttachmentsFunc,
      requestCalamityTypeFunc,
      requestPropertyTypeFunc,
      hideModalPropertyFormFunc,
      getPropertyHolderFunc,
      propertyFunc,
      propertyDescFunc,
      acquisitionFunc,
      estimatedCostFunc,
      handleChange,
      showEditSubmitButton,
      showModal,
      showReviewCalamityModal,
      showPropModal,
      showErrorModal,
      property,
      propertyDesc,
      propertyType,
      acquisitionValue,
      estimatedCost,
      estimatedCostErrorMessage,
      propertyTypeValue,
      onClick,
      onFocus,
      count,
      countFunc,
      showPropertyTypeModal,
      setPropertyData
    }=this.props

    const {
       genericFileAttachmentArray,
    }=this.state

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
            onClose = { () => hidePropertyModalFunc(false) }
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
            type={ 'text' }/>
          <GenericInput
            value={ propertyDesc }
            onChange={ (e) => propertyDescFunc(e.target.value) }
            text={ 'Property Description' }
            type={ 'text' }/>
          <GenericInput
            value={ propertyType }
            onClick={ () => requestPropertyTypeFunc(true) }
            text={ 'Property Type' }/>
          <GenericInput
            value={ acquisitionValue }
            onChange={ (e) => acquisitionFunc(e.target.value) }
            text={ 'Acquisition Value' }
            type={ 'text' }/>
          <GenericInput
            value={ estimatedCost }
            onChange={ (e) => estimatedCostFunc(e.target.value) }
            text={ 'Estimated Repair Cost' }
            type={ 'text' }
            maxLength = { 5 }
            errorMessage = { estimatedCostErrorMessage }
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
          <GenericButton
            text={ 'Add' }
            onClick={
            () => this.getDamagePropertyObject()
            }/>
          </div>
        </div>
      </Modal>
    )
  }
}

CalamityFormGenericModal.propTypes={
  getPropertyHolderFunc : PropTypes.func,
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  setAttachmentFunc  : PropTypes.func,
  onCancel : PropTypes.func,
  propertyType : PropTypes.func,
  hideModalPropertyFormFunc : PropTypes.func,
  hidePropertyModalFunc : PropTypes.func,
  showPropertyTypeModal : PropTypes.bool,
  defaultDamageProperty : PropTypes.array,
  propertyTypeValue : PropTypes.object,
}
CalamityFormGenericModal.defaultProps={
  confirm : 'Add',
  cancel : 'Cancel',
}

export default CalamityFormGenericModal
