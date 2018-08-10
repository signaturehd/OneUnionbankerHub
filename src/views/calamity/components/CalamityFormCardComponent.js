import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  DatePicker,
  GenericButton,
  Line,
  MultipleFileUploader
} from '../../../ub-components/'

import './styles/calamityComponentStyle.css'

import { RequiredValidation, MoneyValidation } from '../../../utils/validate'
import { format } from '../../../utils/numberUtils'

import CalamityModal from '../modal/CalamityModal'
import CalamityReviewModal from '../modal/CalamityReviewModal'
import PropertyTypeModal from '../modal/PropertyTypeModal'

import store from '../../../store'
import { NotifyActions } from '../../../actions/'

import {
  RequiredDecimalValidation,
  RequiredAlphabetValidation,
  MinMaxNumberValidation
} from '../../../utils/validate'

import moment from 'moment'

class CalamityFormCardComponent extends Component {

  constructor (props) {
    super (props)
  }

  onGetClicked (
    calamityId,
    calamityType,
    preferredDate,
    property,
    propertyDesc,
    propertyType,
    acquisitionValue,
    estimatedCost) {
      this.props.getFormData(
        calamityId,
        calamityType,
        preferredDate,
        property,
        propertyDesc,
        propertyType,
        acquisitionValue,
        estimatedCost
      )
  }

  getExtension (filename) {
    const parts=filename.split('/')
    return parts[parts.length - 1]
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
    return (
      <div className={'calamity-form'}>
            <h4>
              Property Form
            </h4>
                <GenericInput
                  value={ calamityName }
                  onClick={ () => requestCalamityTypeFunc(true) }
                  text={ 'Type of Calamity' }
                  errorMessage = { calamityTypeErrorMessage }
                />
                <br/>
                  <DatePicker
                    maxDate={ moment() }
                    selected={ preferredDate}
                    onChange={ (e) => handleChange(e) }
                    text = { 'Date of Occurrence' }
                    />
                <h4 className={ 'font-size-10px' }>(eg. MM/DD/YYYY)</h4>
                <br/>
              <GenericInput
                value={ property }
                onChange={ (e) => propertyFunc(e.target.value) }
                text={ 'Property' }
                type={ 'text' }/>
                <br/>
              <GenericInput
                value={ propertyDesc }
                onChange={ (e) => propertyDescFunc(e.target.value) }
                text={ 'Property Description' }
                type={ 'text' }/>
                <br/>
              <GenericInput
                value={ propertyType }
                onClick={ () => requestPropertyTypeFunc(true) }
                text={ 'Property Type' }/>
            <br/>
              <GenericInput
                value={ acquisitionValue }
                onChange={ (e) => acquisitionFunc(e.target.value) }
                text={ 'Acquisition Value' }
                type={ 'text' }/>
            <br/>
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
          <br/>
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
    )
  }
}

CalamityFormCardComponent.propTypes={
  onFocus: PropTypes.func,
  handleChange: PropTypes.func,
  MinMaxNumberValidation: PropTypes.func,
  requestCalamityTypeFunc: PropTypes.func,
  requestPropertyTypeFunc: PropTypes.func,
  propertyFunc: PropTypes.func,
  propertyDescFunc: PropTypes.func,
  acquisitionFunc: PropTypes.func,
  estimatedCostFunc: PropTypes.func,
  showErrorModal: PropTypes.bool,
  showEditSubmitButton: PropTypes.bool,
  calamityName: PropTypes.string,
  calamityType: PropTypes.array,
  preferredDate: PropTypes.string,
  property: PropTypes.string,
  propertyDesc: PropTypes.string,
  propertyType: PropTypes.string,
  acquisitionValue: PropTypes.string,
  estimatedCost: PropTypes.string,
  calamityTypeErrorMessage: PropTypes.string,
  estimatedCostErrorMessage: PropTypes.string
}

export default CalamityFormCardComponent
