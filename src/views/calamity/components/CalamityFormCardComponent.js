import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  DatePicker,
  GenericButton,
  Line,
  MultipleFileUploader,
  GenericMultipleCard
} from '../../../ub-components/'

import './styles/calamityComponentStyle.css'

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
      handleChange,
      showEditSubmitButton,
      calamityName,
      calamityType,
      preferredDate,
      calamityTypeErrorMessage,
      onClick,
      damagePropertyCardHolder
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
        <br/>
        {
        damagePropertyCardHolder.length !==0 &&
          <GenericMultipleCard
            fileArray = { damagePropertyCardHolder }
            setCard = { (resp) => setCardHolderDefaultyFunc(resp) }
            disabled = { showEditSubmitButton }
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
            onClick = { () => {}}
            className = { 'calamity-submit' } />
        </div>
      )
    }
  }

CalamityFormCardComponent.propTypes={
  handleChange: PropTypes.func,
  setAttachmentDefaultyFunc: PropTypes.func,
  setCardHolderDefaultyFunc: PropTypes.func,
  requestCalamityTypeFunc: PropTypes.func,
  showEditSubmitButton: PropTypes.bool,
  calamityName: PropTypes.string,
  calamityType: PropTypes.array,
  damagePropertyCardHolder: PropTypes.array,
  attachmentsData: PropTypes.array,
  preferredDate: PropTypes.string,
  calamityTypeErrorMessage: PropTypes.string,
}

export default CalamityFormCardComponent
