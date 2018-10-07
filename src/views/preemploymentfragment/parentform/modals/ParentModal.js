import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  GenericInput,
  DatePicker,
  Checkbox,
  SingleInputModal
} from '../../../../ub-components/'

import moment from 'moment'

class ParentModal extends Component {

  constructor (props) {
    super (props)
  }

  render () {
    const {
      genderObject,
      bloodObject,
      statusObject,
      firstNameFunc,
      lastNameFunc,
      middleNameFunc,
      occupationNameFunc,
      contactNumberFunc,
      bloodTypeFunc,
      statusNameFunc,
      genderCodeFunc,
      lastName,
      firstName,
      middleName,
      occupationName,
      bloodTypeName,
      contact,
      bloodType,
      birthDate,
      statusName,
      gender,
      relationship,
      birthDateErrorMessage,
      statusNameErrorMessage,
      firstNameErrorMessage,
      middleNameErrorMessage,
      lastNameErrorMessage,
      occupationNameErrorMessage,
      contactNumberErrorMessage,
      bloodTypeErrorMessage,
      relationshipErrorMessage,
      genderErrorMessage,
      onClose,
      showStatusModal,
      showBloodTypeModal,
      showGenderModal,
      selectedBloodTypeFunc,
      selectedStatusFunc,
      selectedGenderFunc,
      birthDateFunc,
      relationshipNameFunc,
      genderFunc,
      saveForm
    } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>
        <center>
          <h2>Parent Form</h2>
        </center>
        <br/>
        {
          showBloodTypeModal &&
          <SingleInputModal
            label = { 'Blood Type' }
            inputArray = { bloodObject }
            selectedArray = { (bloodTypeId, bloodTypeName) =>
              selectedBloodTypeFunc(
                bloodTypeName,
                false,
                ''
              )
            }
            onClose = { () => bloodTypeFunc(false) }
          />
        }
        {
          showStatusModal &&

          <SingleInputModal
            label = { 'Status' }
            inputArray = { statusObject }
            selectedArray = { (statusId, statusName) =>
              selectedStatusFunc(
                statusId,
                statusName,
                false,
                ''
              )
            }
            onClose = { () => statusNameFunc(false) }
          />
        }
        {
          showGenderModal &&

          <SingleInputModal
            label = { 'Gender' }
            inputArray = { genderObject }
            selectedArray = { (genderCode, gender) =>
              selectedGenderFunc(
                genderCode,
                gender,
                false,
                ''
              )
            }
            onClose = { () => genderFunc(false) }
          />
        }
        <div>
          <div>
            <GenericInput
              text = { 'First Name' }
              value = { firstName }
              maxLength = { 30 }
              errorMessage = { firstName ? '' : firstNameErrorMessage }
              onChange = { (e) => firstNameFunc(e.target.value) }
              />
            <GenericInput
              text = { 'Middle Name' }
              value = { middleName }
              maxLength = { 20 }
              errorMessage = { middleName ? '' : middleNameErrorMessage }
              onChange = { (e) => middleNameFunc(e.target.value) }
              />
            <GenericInput
              text = { 'Last Name' }
              value = { lastName }
              maxLength = { 20 }
              errorMessage = { lastName ? '' : lastNameErrorMessage }
              onChange = { (e) => lastNameFunc(e.target.value) }
              />
            <DatePicker
              text = { 'Birth Date' }
              maxDate = {  moment() }
              hint = { '(eg. MM/DD/YYYY)' }
              selected = { birthDate && moment(birthDate) }
              onChange = { (e)  =>
                birthDateFunc(e.format('MM/DD/YYYY'))
               }
              />
            <GenericInput
              text = { 'Occupation' }
              value = { occupationName }
              errorMessage = { occupationName ? '' : occupationNameErrorMessage }
              onChange = { (e) => occupationNameFunc( e.target.value) }
              />
            <GenericInput
              text = { 'Contact Number' }
              value = { contact }
              maxLength = { 12 }
              errorMessage = { contact ? '' : contactNumberErrorMessage }
              onChange = { (e) => contactNumberFunc(e.target.value) }
              />
            <div className = { 'grid-global' } >
              <GenericInput
                value = { relationship  }
                text = { 'Relationship' }
                disabled
                errorMessage = { relationship ? '' : relationshipErrorMessage }
                onChange = { () => relationshipNameFunc(true) }
                />
              <GenericInput
                value = { statusName  }
                text = { 'Status' }
                errorMessage = { statusName ? '' : statusNameErrorMessage }
                onClick = { () => statusNameFunc(true) }
                />
            </div>
            <div className = { 'grid-global' } >
              <GenericInput
                value = { gender  }
                text = { 'Gender' }
                errorMessage = { gender ? '' : genderErrorMessage }
                onClick = { () => genderFunc(true) }
                />
              <GenericInput
                text = { 'Blood Type' }
                value = { bloodTypeName }
                errorMessage = { bloodTypeName ? '' : bloodTypeErrorMessage }
                onClick = { () => bloodTypeFunc(true) }
                />
            </div>
            <div className = { 'grid-global-rows' }>
              <div>
                <Checkbox
                  label = { 'Group Life Insurance' }
                  />
                <br/>
              </div>
              <div>
                <Checkbox
                  label = { 'Hospitalization Plan' }
                />
              </div>
            </div>
          </div>
          <center>
            <GenericButton
              text = { 'Save' }
              onClick = { () => saveForm() }
            />
          </center>
        </div>
      </Modal>
    )
  }
}

ParentModal.propTypes = {

}

export default ParentModal
