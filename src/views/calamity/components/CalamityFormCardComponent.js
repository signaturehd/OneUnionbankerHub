import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  DatePicker,
  GenericButton,
  Line,
  MultipleFileUploader,
} from '../../../ub-components/'

import './styles/calamityComponentStyle.css'

import CalamityMultiplePropertyCardComponent from './CalamityMultiplePropertyCardComponent'

import { RequiredValidation, MoneyValidation } from '../../../utils/validate'
import { format } from '../../../utils/numberUtils'

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

  render () {
    const {
      onShowPropertyFormModalFunc,
      calamityAssistance,
      attachmentsData,
      setAttachmentDefaultyFunc,
      setCardHolderDefaultyFunc,
      requestCalamityTypeFunc,
      requestPropertyTypeFunc,
      handleChangeDate,
      showEditSubmitButton,
      calamityName,
      calamityType,
      calamityId,
      preferredDate,
      calamityTypeErrorMessage,
      onClick,
      damagePropertyCardHolder,
      onEditModeProperty,
      onSubmit,
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
          onChange={ (e) => handleChangeDate(e) }
          text = { 'Date of Occurrence' }
          />
        <div className = { 'grid-global' }>
          <div>
            <h2 className = { 'font-weight-bold' }>Damage Properties</h2>
          </div>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Property' }
              onClick = { (resp, key) => onShowPropertyFormModalFunc(resp, key, false) }
              />
          </div>
        </div>
        <br/>
        {
        damagePropertyCardHolder.length !==0 &&
          <CalamityMultiplePropertyCardComponent
            cardDataHolder = { damagePropertyCardHolder }
            setCard = { (resp) => setCardHolderDefaultyFunc(resp) }
            disabled = { showEditSubmitButton }
            onEditModeProperty = { (
              propertyName,
              description,
              propertyType,
              cquisitionValue,
              repairCost,
              imageKey,
              updateMode,
              showPropertyModal,
              editMode) =>
              onEditModeProperty(
                propertyName,
                description,
                propertyType,
                cquisitionValue,
                repairCost,
                imageKey,
                updateMode,
                showPropertyModal,
                editMode
              ) }
            errorMessage = {
              showEditSubmitButton ?
              '' :
              `Please upload the required attachments`  }
            />
        }
        <br/>
        <Line/>
        <br/>
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
                setFile = { (resp) => setAttachmentDefaultyFunc(resp) }
                disabled = { showEditSubmitButton }
                errorMessage = {
                  showEditSubmitButton ?
                  '' :
                  `Please upload the required attachments`  }
                />
            </div>
          }
          <br/>
          <GenericButton
            text = { 'Submit' }
            onClick = { () => onSubmit(calamityId, preferredDate.format('MM/DD/YYYY'), damagePropertyCardHolder, attachmentsData) }
            className = { 'calamity-submit' } />
        </div>
      )
    }
  }

CalamityFormCardComponent.propTypes={
  handleChangeDate: PropTypes.func,
  onEditModeProperty: PropTypes.func,
  setAttachmentDefaultyFunc: PropTypes.func,
  setCardHolderDefaultyFunc: PropTypes.func,
  requestCalamityTypeFunc: PropTypes.func,
  showEditSubmitButton: PropTypes.bool,
  calamityName: PropTypes.string,
  calamityType: PropTypes.array,
  damagePropertyCardHolder: PropTypes.array,
  attachmentsData: PropTypes.array,
  attachmentArray: PropTypes.array,
  preferredDate: PropTypes.string,
  calamityTypeErrorMessage: PropTypes.string,
}

export default CalamityFormCardComponent
