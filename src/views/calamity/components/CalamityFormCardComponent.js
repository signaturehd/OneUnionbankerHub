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
      onShowPropertyFormModalFunc,
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
        <GenericInput
          value={ calamityName }
          onClick={ () => requestCalamityTypeFunc(true) }
          text={ 'Type of Calamity' }
          errorMessage = { calamityTypeErrorMessage }
        />
        <DatePicker
          maxDate={ moment() }
          readOnly
          selected={ preferredDate}
          onChange={ (e) => handleChange(e) }
          text = { 'Date of Occurrence' }
          />
        <Line/>
        <br/>
        <div className = { 'grid-global' }>
          <div>
            <h2 className = { 'font-weight-bold' }>Damage Properties</h2>
          </div>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Property' }
              onClick = { () => onShowPropertyFormModalFunc() }
              />
          </div>
        </div>
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
