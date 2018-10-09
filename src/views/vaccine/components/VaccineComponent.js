import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Line,
  GenericInput,
  GenericButton,
  MultipleFileUploader,
  DatePicker,
} from '../../../ub-components/'

import VaccineMultipleCardComponent from './VaccineMultipleCardComponent'
import VaccineDependentMultipleCardComponent from './VaccineDependentMultipleCardComponent'


import './styles/vaccineStyle.css'

class VaccineComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      showEditSubmitButton,
      showEditSubmitFunc,
      showDependentFunc,
      showVaccineFunc,
      showAppModesFunc,
      showFormReview,
      editFormDataFunc,
      dependentName,
      vaccineName,
      orderingStart,
      orderingEnd,
      cost,
      appModeName,
      vaccineCardHolder,
      setCardHolderDefaultyFunc,
      dependentErrorMessage,
      vaccineErrorMessage,
      appModeErrorMessage,
      onSubmitFunc,
      vaccineList,
      showVaccineList,
      addVaccineList,
      cancelToList,
      addToList,
      showClaimingType,
      claimingName,
      showRelationship,
      relationshipName,
      setBirthDate,
      birthDate,
      showGender,
      genderName
    } = this.props

    return (
      <div className = { 'vaccine-form' } >
        {
          showVaccineList &&
            vaccineList.length > 0 ?
              <div>
                <GenericButton
                  type = { 'button' }
                  text = { 'Add' }
                  onClick = { () => addVaccineList() }
                />
                <br/>
                {

                }
                <br/>
                {
                  vaccineList.length !== 0 &&
                  <GenericButton
                    type = { 'button' }
                    text = { 'Submit' }
                    onClick = { () => onSubmitFunc() }
                    className = { 'vaccine-submit-form-button' }
                  />
                 }
              </div>
              :
              <div>
                <GenericInput
                  text = { 'Dependents' }
                  onClick = { () => showDependentFunc() }
                  value = { dependentName }
                  errorMessage = { dependentErrorMessage }
                  disabled = { showEditSubmitButton }
                  readOnly
                />
                <div className = { 'grid-global' }>
                  <h2 className = { 'font-weight-bold text-align-left' }>Select vaccine(s)</h2>
                  <div className = { 'text-align-right' }>
                    <GenericButton
                      text = { 'Add Vaccine' }
                      onClick = { () => showVaccineFunc() }
                      disabled = { showEditSubmitButton }
                      />
                      <br/>
                    {
                      vaccineErrorMessage &&
                      <span className = { 'error-message' }>
                        { vaccineErrorMessage }
                      </span>
                    }
                  </div>
                </div>
                <br/>
                {
                vaccineCardHolder.length !==0 &&
                  <VaccineMultipleCardComponent
                    cardDataHolder = { vaccineCardHolder }
                    setCard = { (resp) => setCardHolderDefaultyFunc(resp) }
                    disabled = { showEditSubmitButton }
                    errorMessage = { vaccineErrorMessage }
                  />
                }
                <br/>
                <Line/>
                <GenericInput
                  text = { 'Application Mode' }
                  onClick = { () => showAppModesFunc() }
                  value = { appModeName }
                  errorMessage = { appModeErrorMessage }
                  disabled = { showEditSubmitButton }
                  readOnly
                />
                <GenericInput
                  text = { 'Claiming Type' }
                  onClick = { () => showClaimingType() }
                  value = { claimingName }
                  disabled = { showEditSubmitButton }
                  readOnly
                />
                <GenericInput
                  text = { 'Relationship' }
                  onClick = { () => showRelationship() }
                  value = { relationshipName }
                  disabled = { showEditSubmitButton }
                  readOnly
                />
                <DatePicker
                  text = { 'Birthdate' }
                  readOnly
                  selected = { birthDate }
                  disabled = { showEditSubmitButton }
                  onChange = { (data) => setBirthDate(data) }
                />
                <GenericInput
                  text = { 'Gender' }
                  readOnly
                  value = { genderName }
                  disabled = { showEditSubmitButton }
                  onClick = { () => showGender() }
                />
                <div className = { 'vaccine-form-review' }>
                  <GenericButton
                    type = { 'button' }
                    text = { 'Cancel' }
                    onClick = {
                      () => cancelToList()
                    }
                    className = { 'vaccine-submit' } />
                  <GenericButton
                    type = { 'button' }
                    text = { 'Add to list' }
                    onClick = {
                      () => addToList()
                    }
                    className = { 'vaccine-submit' } />
                </div>
              </div>
        }
        <br/>
        <Line/>
        {
          showEditSubmitButton &&
          <center>
            <h2 className = { 'font-size-12px' }>Please review the information you have selected before submitting the transaction</h2>
          </center>
        }
        {
          showEditSubmitButton &&
          <div className = { 'vaccine-form-review' }>
            <GenericButton
              type = { 'button' }
              text = { 'Edit' }
              className = { 'vaccine-edit-form' }
              onClick = { () =>
                editFormDataFunc()
                }
              />
            <GenericButton
              type = { 'button' }
              text = { 'Submit' }
              onClick = { () => onSubmitFunc() }
              className = { 'vaccine-submit-form-button' }
              />
          </div>
        }
      </div>
    )
  }
}
VaccineComponent.propTypes = {
  showEditSubmitButton : PropTypes.bool,
  showEditSubmitFunc : PropTypes.func,
  showDependentFunc : PropTypes.func,
  showVaccineFunc : PropTypes.func,
  showFormReview : PropTypes.func,
  editFormDataFunc : PropTypes.func,
  setCardHolderDefaultyFunc : PropTypes.func
}
export default VaccineComponent
