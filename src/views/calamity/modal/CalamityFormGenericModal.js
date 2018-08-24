import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Modal, GenericButton, CircularLoader, MultipleFileUploader } from '../../../ub-components/'

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
      setAttachmentArrayFunc,
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
      onFocus
    }=this.props

    const {
       disableSubmit,
       isDismisable,
    }=this.state

    return (
      <Modal>
        <div className={'calamity-form'}>
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
          <br/>
            {
              attachmentsData.length !== 0  ?

              <div>
              <h4>
                Form Attachments
              </h4>
              <MultipleFileUploader
                placeholder = { 'Form Attachments' }
                fileArray = { attachmentsData }
                setFile = { (resp) => setAttachmentArrayFunc(resp) }
                disabled = { showEditSubmitButton }
                errorMessage = {
                  showEditSubmitButton ?
                  '' :
                  `Please upload the required attachments`  }
                />
              </div>
              :
              <div></div>
            }
          <br/>
          <Line/>
          <GenericButton
            type={ 'button' }
            text={ 'Submit' }
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
            }
            className={ 'calamity-submit' } />
        </div>
      </Modal>
    )
  }
}

CalamityFormGenericModal.propTypes={
  onClose : PropTypes.func,
  onClick : PropTypes.func,
  onCancel : PropTypes.func,
}
CalamityFormGenericModal.defaultProps={
  confirm : 'Add',
  cancel : 'Cancel',
}

export default CalamityFormGenericModal
