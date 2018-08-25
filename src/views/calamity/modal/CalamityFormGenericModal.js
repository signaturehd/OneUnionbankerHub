import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  MultipleFileUploader,
  GenericInput,
  Line
} from '../../../ub-components/'

import './styles/calamityModalStyle.css'
import { format } from '../../../utils/numberUtils'

import imageDefault from '../../../images/profile-picture.png'

class CalamityFormGenericModal extends Component {

  constructor (props) {
    super (props)

    this.state={
      disableSubmit : false,
      isDismisable : true
    }
  }

  render () {
    const {
      calamityAssistance,
      attachmentsData,
      setAttachmentFunc,
      addAttachmentsFunc,
      requestCalamityTypeFunc,
      requestPropertyTypeFunc,
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
      calamityName,
      calamityType,
      preferredDate,
      property,
      propertyDesc,
      propertyType,
      acquisitionValue,
      estimatedCost,
      calamityTypeErrorMessage,
      estimatedCostErrorMessage,
      propertyTypeValue,
      presenter,
      onClick,
      onFocus,
      hideModalPropertyFormFunc
    }=this.props

    const {
       disableSubmit,
       isDismisable,
    }=this.state

    return (
      <Modal
        isDismisable = { true }
        width = { 50 }>
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
              attachmentsData.length !== 0  &&
              <div>
              <h4>
                <br/>
                Form Attachments
              </h4>
              <MultipleFileUploader
                placeholder = { '.' }
                fileArray = { attachmentsData }
                setFile = { (resp) => setAttachmentFunc(resp) }
                disabled = { showEditSubmitButton }
                errorMessage = {
                  showEditSubmitButton ?
                  '' :
                  `Please upload the required attachments`  }
                />
              </div>
             }
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
            () => onClick(true,
              {
                calamityId,
                calamityType,
                preferredDate,
                property,
                propertyDesc,
                propertyType,
                acquisitionValue,
                estimatedCost
              }
            )
          }/>
          </div>
        </div>
      </Modal>
    )
  }
}

CalamityFormGenericModal.propTypes={
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  hideModalPropertyFormFunc : PropTypes.func,
  onCancel : PropTypes.func,
  attachmentsData : PropTypes.array,
  setAttachmentFunc  : PropTypes.func,
}
CalamityFormGenericModal.defaultProps={
  confirm : 'Add',
  cancel : 'Cancel',
}

export default CalamityFormGenericModal
