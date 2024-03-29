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
      editMode,
      genderObject,
      relationshipObject,
      siblingsObject,
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
      hospitalization,
      groupPlan,
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
      showRelationShipModal,
      isParentOrSiblings,
      selectedBloodTypeFunc,
      selectedStatusFunc,
      selectedRelationshipFunc,
      birthDateFunc,
      relationshipNameFunc,
      relationshipFunc,
      hospitalizationFunc,
      groupPlanFunc,
      selectedGenderFunc,
      saveFormSubmission,
      editFormSubmission,
      showGenderModal
    } = this.props

    return (
      <Modal
        isDismisable = { true }
        onClose = { onClose }>
        <center>
          <h2>{ isParentOrSiblings ? 'Parent' : 'Siblings' } Form</h2>
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
          showGenderModal &&
          <SingleInputModal
            label = { 'Select Gender' }
            inputArray = { genderObject }
            selectedArray = { (genderId, gender) =>
              selectedGenderFunc(
                genderId,
                gender,
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
          showRelationShipModal &&

          <SingleInputModal
            label = { 'Relationship' }
            inputArray = { isParentOrSiblings ? relationshipObject : siblingsObject }
            selectedArray = { (id, relationship) =>
              {
                selectedRelationshipFunc(
                  id,
                  relationship,
                  false,
                  ''
                )
                relationshipNameFunc (relationship)
              }
            }
            onClose = { () => relationshipFunc(false) }
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
              readOnly
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
            {
              isParentOrSiblings ?
              <div className = { 'grid-global' } >
                <GenericInput
                  value = { relationship  }
                  text = { 'Relationship' }
                  errorMessage = { relationship ? '' : relationshipErrorMessage }
                  onClick = { () => relationshipFunc(true) }
                  />
                <GenericInput
                  value = { statusName  }
                  text = { 'Status' }
                  errorMessage = { statusName ? '' : statusNameErrorMessage }
                  onClick = { () => statusNameFunc(true) }
                  />
              </div>
              :
              <GenericInput
                value = { statusName  }
                text = { 'Status' }
                errorMessage = { statusName ? '' : statusNameErrorMessage }
                onClick = { () => statusNameFunc(true) }
                />
            }
            <div className = { 'grid-global' } >
              {
                !isParentOrSiblings &&
                <GenericInput
                  value = { gender  }
                  text = { 'Gender' }
                  readOnly
                  errorMessage = { gender ? '' : genderErrorMessage }
                  onClick = { () => genderCodeFunc(true) }
                  />
              }
              <GenericInput
                text = { 'Blood Type' }
                value = { bloodTypeName }
                errorMessage = { bloodTypeName ? '' : bloodTypeErrorMessage }
                onClick = { () => bloodTypeFunc(true) }
                />
            </div>
            <div className = { 'grid-global-rows' }>
              {
                // <div>
                //   <Checkbox
                //     checked = { hospitalization }
                //     label = { 'Hospitalization Plan' }
                //     onChange = { () => hospitalizationFunc() }
                //     />
                //   <br/>
                // </div>
              }
              <div>
                <Checkbox
                  checked = { groupPlan }
                  label = { 'Group Life Insurance' }
                  onChange = { () => groupPlanFunc() }
                />
              </div>
            </div>
          </div>
          {
            editMode ?

            <center>
              <GenericButton
                text = { 'Edit' }
                onClick = { () => editFormSubmission() }
              />
            </center>
            :

            <center>
              <GenericButton
                text = { 'Save' }
                onClick = { () => saveFormSubmission() }
              />
            </center>
          }
        </div>
      </Modal>
    )
  }
}

ParentModal.propTypes = {

}

export default ParentModal
