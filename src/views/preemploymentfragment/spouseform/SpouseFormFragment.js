import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  GenericButton,
  CircularLoader,
  GenericInput,
  SingleInputModal,
  Card,
  DatePicker,
  Checkbox,
  MultipleFileUploader,
} from '../../../ub-components/'

import { RequiredValidation } from '../../../utils/validate/'

import Presenter from './presenter/SpousePresenter'

import { Progress } from 'react-sweet-progress'

import 'react-sweet-progress/lib/style.css'
import './styles/spouseStyle.css'

class SpouseFormFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      bloodObjectParam: [],
      spouseData : '',
      enabledLoader : false,
      spouseId: '',
      lastName: '',
      firstName : '',
      middleName: '',
      occupationName : '',
      contact : '',
      birthDate: '',
      statusName: '',
      gender: '',
      genderErrorMessage: '',
      bloodType: '',
      statusName: '',
      statusNameErrorMessage: '',
      birthDateErrorMessage : '',
      contactNumberErrorMessage : '',
      occupationNameErrorMessage : '',
      firstNameErrorMessage : '',
      middleNameErrorMessage: '',
      lastNameErrorMessage: '',
      occupationNameErrorMessage: '',
      bloodTypeErrorMessage: '',
      noticeResponse: '',
      editMode : false,
      bloodTypeName: '',
      showBloodTypeModal : false
    }
  }

  componentDidMount () {
    console.log()
    this.props.onSendPageNumberToView(17)
    this.presenter.getSpouse()
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showBloodType (bloodObjectParam) {
    this.setState({ bloodObjectParam })
  }

  showSpouseDetails (spouseData) {
    const nullChecker = spouseData && spouseData
    const nullCheckerName = spouseData && spouseData.name
    this.setState({ 
      firstName : nullCheckerName.first,
      middleName : nullCheckerName.middle,
      lastName : nullCheckerName.last,
      bloodTypeName : nullChecker.bloodType,
      birthDate : nullChecker.birthDate,
      occupationName : nullChecker.occupation,
      contact : nullChecker.contactNumber,
      gender : nullChecker.gender,
      spouseId : nullChecker.id,
    })
    this.setState({ spouseData })
  }

  noticeResponseFunc (noticeResponse) {
    this.setState({ noticeResponse })
  }

  dateFunc (data) {
    this.setState({ birthDate: moment(data).format('MM-DD-YYYY') })
  }

  firstNameErrorMessageFunc (firstNameErrorMessage) {
    this.setState({ firstNameErrorMessage })
  }

  middleNameErrorMessageFunc (middleNameErrorMessage) {
    this.setState({ middleNameErrorMessage })
  }

  lastNameErrorMessageFunc (lastNameErrorMessage) {
    this.setState({ lastNameErrorMessage })
  }

  occupationErrorMessageFunc (occupationNameErrorMessage) {
    this.setState({ occupationNameErrorMessage })
  }

  contactNumberErrorMessageFunc (contactNumberErrorMessage) {
    this.setState({ contactNumberErrorMessage })
  }

  genderErrorMessageFunc (genderErrorMessage) {
    this.setState({ genderErrorMessage })
  }

  postSaveFunction () {
    const {
      firstName, 
      middleName,
      lastName,
      birthDate,
      occupation,
      contact,
      status,
      gender,
      healthHospitalizationPlan,
      groupLifeInsurance,
      spouseId
    } = this.state

    this.presenter.postSpouseForm(
      firstName, 
      middleName,
      lastName,
      birthDate,
      occupation,
      contact,
      status,
      gender,
      healthHospitalizationPlan,
      groupLifeInsurance,
      spouseId)
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      bloodObjectParam,
      spouseData,
      enabledLoader,
      lastName,
      firstName,
      middleName,
      occupationName,
      contact,
      bloodType,
      birthDate,
      statusName,
      gender,
      genderErrorMessage,
      birthDateErrorMessage,
      statusNameErrorMessage,
      firstNameErrorMessage,
      middleNameErrorMessage,
      lastNameErrorMessage,
      occupationNameErrorMessage,
      contactNumberErrorMessage,
      bloodTypeErrorMessage,
      noticeResponse,
      spouseId,
      editMode,
      bloodTypeName,
      showBloodTypeModal
    } = this.state

    return(
    <div>
    { super.render() }
    {
      showBloodTypeModal && 

      <SingleInputModal
        label = { 'Blood Type' }
        inputArray = { bloodObjectParam && bloodObjectParam }
        selectedArray = { (bloodTypeId, bloodTypeName) =>
          this.setState({
            bloodTypeName,
            showBloodTypeModal : false,
            bloodTypeErrorMessage : ''
          })
        }
        onClose = { () => this.setState({ showBloodTypeModal : false }) }
      />
    }
      <div className = { 'percentage-grid' }>
        <div>
          <h2 className={ 'header-margin-default text-align-left' }>Spouse Form</h2>
          <h2>Fill up the spouse form.</h2>
        <br/>
        </div>
        <Progress
          type = { 'circle' }
          height = { 100 }
          width = { 100 }
          percent={ percentage }
        />
        </div>
      <div>
        <div> 
          <div>
            <GenericInput
              text = { 'First Name' }
              value = { firstName }
              maxLength = { 30 }
              errorMessage = { firstName ? '' : firstNameErrorMessage }
              onChange = { (e) => this.setState({ firstName : e.target.value }) }
              />
            <GenericInput
              text = { 'Middle Name' }
              value = { middleName }
              maxLength = { 20 }
              errorMessage = { middleName ? '' : middleNameErrorMessage }
              onChange = { (e) => this.setState({ middleName : e.target.value }) }
              />
            <GenericInput
              text = { 'Last Name' }
              value = { lastName }
              errorMessage = { lastName ? '' : lastNameErrorMessage }
              onChange = { (e) => this.setState({ lastName : e.target.value }) }
              />
            <GenericInput
              text = { 'Occupation' }
              value = { occupationName }
              errorMessage = { occupationName ? '' : occupationNameErrorMessage }
              onChange = { (e) => this.setState({ occupationName : e.target.value }) }
              />
            <GenericInput
              text = { 'Contact Number' }
              value = { contact }
              maxLength = { 12 }
              errorMessage = { contact ? '' : contactNumberErrorMessage }
              onChange = { (e) => this.setState({ contact : e.target.value }) }
              />
            <div>
              <h2 className = { 'font-size-12px' }>Gender</h2>
              <br/>
              <div className = { 'grid-global' }>
                <div className = { 'grid-global' } >
                  <Checkbox
                    label = { 'Male' }
                    />
                  <Checkbox
                    label = { 'Female' }
                    />
                </div>
                <div></div>
              </div>
              <br/>
            </div>
            <div className = { 'grid-global' } >
              <GenericInput
                text = { 'Blood Type' }
                value = { bloodTypeName }
                errorMessage = { bloodTypeName ? '' : bloodTypeErrorMessage }
                onClick = { () => this.setState({ showBloodTypeModal : true }) }
                />
              <div className = { 'status-margin text-align-center' }>
                <GenericInput
                  value = { statusName  }
                  text = { 'Status' }
                  errorMessage = { statusName ? '' : statusNameErrorMessage }
                  onChange = { (e) => this.setState({ statusName : e.target.value }) }
                  />
              </div>
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
        </div>  
        <br/>
        <center>
          {
            editMode ?
            <GenericButton
              className = { 'global-button' }
              text = { 'Edit' }
              />
              :
            <GenericButton
              className = { 'global-button' }
              text = { 'Save' }
              onClick = { () => this.postSaveFunction() }
              />
          }
        </center>
      </div>
    </div>
    )
  }
}

SpouseFormFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

SpouseFormFragment.defaultProps = {
}

export default ConnectView(SpouseFormFragment, Presenter)
