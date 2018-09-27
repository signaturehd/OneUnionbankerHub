import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  GenericInput,
  CircularLoader,
  SingleInputModal,
} from '../../../../ub-components/'

import CharacterSelfEmployedComponents from '../components/CharacterSelfEmployedComponents'
import CharacterEmployedComponents from '../components/CharacterEmployedComponents'
import CharacterUnemployedComponents from '../components/CharacterUnemployedComponents'

function CharacterReferenceComponents (props) {
  const occupationId = props.occupationId
  const addressTextFunc = props.addressTextFunc
  const addressText = props.addressText
  const positionText = props.positionText
  const positionTextFunc = props.positionTextFunc
  const companyNameText = props.companyNameText
  const companyNameTextFunc = props.companyNameTextFunc
  const floorText = props.floorText
  const floorTextFunc = props.floorTextFunc
  const buildingNameText = props.buildingNameText
  const buildingNameTextFunc = props.buildingNameTextFunc
  const streetText = props.streetText
  const streetTextFunc = props.streetTextFunc
  const districtText = props.districtText
  const districtTextFunc = props.districtTextFunc
  const barangayText = props.barangayText
  const barangayTextFunc = props.barangayTextFunc
  const relationshipText = props.relationshipText
  const relationshipTextFunc = props.relationshipTextFunc
  const addressTextErrorMessage = props.addressTextErrorMessage

  if(occupationId === 0) {
    return <CharacterSelfEmployedComponents
      positionText = { positionText }
      positionTextFunc = { (e) => positionTextFunc(e) }
      companyNameText = { companyNameText }
      companyNameTextFunc = { (e) => companyNameTextFunc(e) }
      floorText = { floorText }
      floorTextFunc = { (e) => floorTextFunc(e) }
      buildingNameText = { buildingNameText }
      buildingNameTextFunc = { (e) => buildingNameTextFunc(e) }
      streetText = { streetText }
      streetTextFunc = { (e) => streetTextFunc(e) }
      districtText = { districtText }
      districtTextFunc = { (e) => districtTextFunc(e) }
      barangayText = { barangayText }
      barangayTextFunc = { (e) => barangayTextFunc(e) }
      relationshipText = { relationshipText }
      relationshipTextFunc = { (e) => relationshipTextFunc(e) }
    />
  } else if (occupationId === 1) {
    return <CharacterEmployedComponents
      positionText = { positionText }
      positionTextFunc = { (e) => positionTextFunc(e) }
      companyNameText = { companyNameText }
      companyNameTextFunc = { (e) => companyNameTextFunc(e) }
      floorText = { floorText }
      floorTextFunc = { (e) => floorTextFunc(e) }
      buildingNameText = { buildingNameText }
      buildingNameTextFunc = { (e) => buildingNameTextFunc(e) }
      streetText = { streetText }
      streetTextFunc = { (e) => streetTextFunc(e) }
      districtText = { districtText }
      districtTextFunc = { (e) => districtTextFunc(e) }
      barangayText = { barangayText }
      barangayTextFunc = { (e) => barangayTextFunc(e) }
      relationshipText = { relationshipText }
      relationshipTextFunc = { (e) => relationshipTextFunc(e) }
      />
  } else if (occupationId === 2) {
    return <CharacterUnemployedComponents
      addressTextFunc = { (e) => addressTextFunc(e) }
      addressText = { addressText }
      addressTextErrorMessage = { addressTextErrorMessage }
    />
  } else {
    return null
  }
}

class CharacterReferenceAddFormModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const occupationObject = [
    {
      id : 0,
      name: 'Self-Employed'
    },
    {
      id : 1,
      name : 'Employed'
    },
    {
      id: 2,
      name : 'Unemployed'
    }]

    const {
      onClose,
      showOccupationModal,
      showRequiredFieldsFunc,
      showOccupationModalFunc,
      occupationId,
      occupationName,
      onCloseInputModal,
      addressText,
      addressTextFunc,
      fullNameText,
      fullNameTextFunc,
      contactNumberText,
      contactNumberTextFunc,
      periodOfProfessionExperienceText,
      periodOfProfessionExperienceTextFunc,
      relationshipText,
      relationshipTextFunc,
      emailText,
      emailTextFunc,
      positionText,
      positionTextFunc,
      streetText,
      streetTextFunc,
      districtText,
      districtTextFunc,
      barangayText,
      barangayTextFunc,
      buildingNameText,
      buildingNameTextFunc,
      floorText,
      floorTextFunc,
      companyNameText,
      companyNameTextFunc,
      onSave,
      fullNameTextErrorMessage,
      occupationNameErrorMessage,
      addressTextErrorMessage,
      emailTextErrorMessage,
      contactNumberTextErrorMessage,
      relationshipTextErrorMessage,
      periodOfProfessionExperienceTextErrorMessage,
    } = this.props

    return(
      <Modal
        isDismisable = { true }
        onClose = { onClose }
        >
        {
          showOccupationModal &&
          <SingleInputModal
            label = { 'Type of Occupation' }
            inputArray = { occupationObject }
            selectedArray = { (id, name) =>
              showRequiredFieldsFunc(id, name, false)
            }
          />
        }
        <h2 className = { 'font-weight-bold font-size-20px' }>Character Reference Form</h2>
        <h4 className = { 'text-align-left font-size-16px' }>
          Your personal references must have known you for at atleast 2 years. Do not include relatives, in-laws, or previous supervisors.
        </h4>
        <br/>
        <div className = { 'text-align-left' }>
          <GenericInput
            text = { 'Full Name' }
            value = { fullNameText }
            errorMessage = { fullNameText ? '' : fullNameTextErrorMessage  }
            maxLength = { 44 }
            onChange = { (e) => fullNameTextFunc(e.target.value) }
          />
          <GenericInput
            text = { 'Occupation' }
            value = { occupationName }
            errorMessage = { occupationName ? '' : occupationNameErrorMessage }
            type = { 'button' }
            onClick = { () => showOccupationModalFunc() }
          />
          <CharacterReferenceComponents
            occupationId = { occupationId }
            addressText = { addressText }
            addressTextFunc = { (e) => addressTextFunc(e) }
            positionText = { positionText }
            positionTextFunc = { (e) => positionTextFunc(e) }
            companyNameText = { companyNameText }
            companyNameTextFunc = { (e) => companyNameTextFunc(e) }
            floorText = { floorText }
            floorTextFunc = { (e) => floorTextFunc(e) }
            buildingNameText = { buildingNameText }
            buildingNameTextFunc = { (e) => buildingNameTextFunc(e) }
            streetText = { streetText }
            streetTextFunc = { (e) => streetTextFunc(e) }
            districtText = { districtText }
            districtTextFunc = { (e) => districtTextFunc(e) }
            barangayText = { barangayText }
            barangayTextFunc = { (e) => barangayTextFunc(e) }
            relationshipText = { relationshipText }
            relationshipTextFunc = { (e) => relationshipTextFunc(e) }
            addressTextErrorMessage = { addressTextErrorMessage }
            />
          <GenericInput
            text = { 'Email' }
            value = { emailText }
            maxLength = { 30 }
            errorMessage = { emailText ? '' :  emailTextErrorMessage }
            onChange = { (e) => emailTextFunc(e.target.value) }
          />
          <GenericInput
            value = { contactNumberText }
            text = { 'Contact Number' }
            errorMessage = { contactNumberText ? '' : contactNumberTextErrorMessage }
            maxLength = { 12 }
            onChange = { (e) => contactNumberTextFunc(e.target.value) }
          />
          <GenericInput
            text = { 'Relationship' }
            value = { relationshipText }
            maxLength = { 20 }
            errorMessage = { relationshipText ? '' : relationshipTextErrorMessage }
            onChange = { (e) => relationshipTextFunc(e.target.value) }
          />
          <GenericInput
            maxLength = { 20 }
            value = { periodOfProfessionExperienceText }
            text = { 'Period of Professional Experience' }
            errorMessage = { periodOfProfessionExperienceTextErrorMessage }
            onChange = { (e) => periodOfProfessionExperienceTextFunc(e.target.value) }
          />
          <br/>
          <center>
            <GenericButton
              text = { 'Save' }
              onClick = { () => onSave() }
            />
          </center>
        </div>
      </Modal>
    )
  }
}

CharacterReferenceAddFormModal.propTypes = {
  onClose : PropTypes.func,
  showRequiredFieldsFunc : PropTypes.func,
  showOccupationModalFunc : PropTypes.func,
  showOccupationModal : PropTypes.bool,
  occupationId : PropTypes.string,
  addressText : PropTypes.string,
  addressTextFunc : PropTypes.func,
  fullNameText : PropTypes.string,
  fullNameTextFunc : PropTypes.func,
  contactNumberText : PropTypes.string,
  contactNumberTextFunc : PropTypes.func,
  periodOfProfessionExperienceText : PropTypes.string,
  periodOfProfessionExperienceTextFunc : PropTypes.func,
  emailText : PropTypes.string,
  emailTextFunc : PropTypes.func,
  relationshipText : PropTypes.string,
  relationshipTextFunc : PropTypes.func,
  barangayText : PropTypes.string,
  barangayTextFunc : PropTypes.func,
}

export default CharacterReferenceAddFormModal
