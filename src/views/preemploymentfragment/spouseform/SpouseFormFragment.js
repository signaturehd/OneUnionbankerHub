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
      spouseData : [],
      enabledLoader : false,
      spouseId: '',
      lastName: '',
      firstName : '',
      middleName: '',
      occupationName : '',
      contactNumber : '',
<<<<<<< Updated upstream
      birthDate: '',
      statusName: '',
      gender: '',
      genderErrorMessage: '',
=======
      bloodType: '',
      birthDate: '',
      statusName: '',
>>>>>>> Stashed changes
      statusNameErrorMessage: '',
      birthDateErrorMessage : '',
      contactNumberErrorMessage : '',
      occupationNameErrorrMessage : '',
      firstNameErrorMessage : '',
      middleNameErrorMessage: '',
      lastNameErrorMessage: '',
      bloodTypeErrorMessage: '',
      noticeResponse: '',
      editMode : false,
      bloodTypeName: '',
<<<<<<< Updated upstream
      showBloodTypeModal : false
=======
>>>>>>> Stashed changes
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

  showSpouseDetails (spouseData) {
    this.setState({ spouseData })
  }

  noticeResponseFunc (noticeResponse) {
    this.setState({ noticeResponse })
  }

  dateFunc (data) {
    this.setState({ birthDate: moment(data).format('MM-DD-YYYY') })
  }

<<<<<<< Updated upstream
  postSaveFunc () {
    const {
=======
  submitForm () {
    const {
      enabledLoader,
>>>>>>> Stashed changes
      lastName,
      firstName,
      middleName,
      occupationName,
      contactNumber,
<<<<<<< Updated upstream
      birthDate,
      statusName,
      gender,
      genderErrorMessage,
=======
      bloodType,
      birthDate,
      statusName,
>>>>>>> Stashed changes
      birthDateErrorMessage,
      statusNameErrorMessage,
      firstNameErrorMessage,
      middleNameErrorMessage,
      lastNameErrorMessage,
      occupationNameErrorMessage,
      contactNumberErrorMessage,
      bloodTypeErrorMessage,
<<<<<<< Updated upstream
      spouseId,
      bloodTypeName,
=======
      noticeResponse,
      spouseId,
>>>>>>> Stashed changes
    } = this.state

    if (!this.validator(firstName)) {
      this.setState({ firstNameErrorMessage: 'First name field is required' })
    } else if (!this.validator(middleName)) {
      this.setState({ middleNameErrorMessage : 'Middle name field is required'  })
    } else if (!this.validator(lastName)) {
      this.setState({ lastNameErrorMessage : 'Last name field is required'  })
    } else if (!this.validator(occupationName)) {
      this.setState({ occupationNameErrorMessage : 'Occupation field is required' })
    } else if (!this.validator(gender)) {
      this.setState({ genderErrorMessage : 'Gender field is required'  })
    } else {
      if(editMode) {
        this.presenter.putFinancialStatus(
          firstName,
          middleName,
          amount,
          statusId,
          financeId
        )
        this.setState({ showFinancialFormModal : false })
        this.setState({
          firstName : '',
          middleName : '',
          amount : '',
          statusId : '',
          fiananceId : '',
          editMode: false,
        })
      } else {
      this.presenter.addFinancialStatus(
        firstName,
        middleName,
        amount,
        statusId,
        financeId)

        this.setState({ showFinancialFormModal : false })
        this.setState({
          firstName : '',
          middleName : '',
          amount : '',
          statusId : '',
          fiananceId : '',
          editMode: false,
        })
      }
    }
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      spouseData,
      enabledLoader,
      lastName,
      firstName,
      middleName,
      occupationName,
      contactNumber,
<<<<<<< Updated upstream
      birthDate,
      statusName,
      gender,
      genderErrorMessage,
=======
      bloodType,
      birthDate,
      statusName,
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
      showBloodTypeModal
=======
>>>>>>> Stashed changes
    } = this.state

    const bloodObjectParam = [
      {
        id : 0,
        name: 'Type A+'
      },
      {
        id : 1,
        name : 'Type A-'
      },
      {
        id : 2,
        name : 'Type B+'
      },
      {
        id : 3,
        name : 'Type B-'
      },
      {
        id : 4,
        name : 'Type 0+'
      },
      {
        id : 5,
        name : 'Type 0-'
      },
      {
        id : 6,
        name : 'Type AB+'
      },
      {
        id : 7,
        name : 'Type AB-'
      }
    ]

    return(
    <div>
    { super.render() }
    {
      showBloodTypeModal && 

      <SingleInputModal
<<<<<<< Updated upstream
        label = { 'Blood Type' }
=======
        label = { 'Type of Calamity' }
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        </div>
      <div>
       {
        spouseData &&
        spouseData.map((resp, key) => 
          <div>
            <GenericInput
              text = { 'First Name' }
              value = { resp.name.first ? resp.name.first : firstName }
              maxLength = { 30 }
              errorMessage = { firstName ? '' : firstNameErrorMessage }
              onChange = { (e) => this.setState({ middleName : e.target.value }) }
              />
            <GenericInput
              text = { 'Middle Name' }
              value = { resp.name.middle ? resp.name.middle : middleName }
              maxLength = { 20 }
              errorMessage = { middleName ? '' : middleNameErrorMessage }
              onChange = { (e) => this.setState({ middleName : e.target.value }) }
              />
            <GenericInput
              text = { 'Last Name' }
              value = { resp.name.last ? resp.name.last : lastName }
              errorMessage = { lastName ? '' : lastNameErrorMessage }
              onChange = { (e) => this.setState({ lastName : e.target.value }) }
              />
            <GenericInput
              text = { 'Occupation' }
              value = { resp.occupation ? resp.occupation : occupationName }
              errorMessage = { occupationName ? '' : occupationNameErrorMessage }
              onChange = { (e) => this.setState({ occupation : e.target.value }) }
              />
            <GenericInput
              text = { 'Contact Number' }
              value = { resp.contact ? resp.contact : contactNumber }
              errorMessage = { contactNumber ? '' : contactNumberErrorMessage }
              onChange = { (e) => this.setState({ contactNumber : e.target.value }) }
              />
            <div className = { 'grid-global' } >
              <GenericInput
                text = { 'Blood Type' }
                value = { resp.bloodType ? resp.bloodType : bloodTypeName }
                errorMessage = { bloodTypeName ? '' : bloodTypeErrorMessage }
                onClick = { () => this.setState({ showBloodTypeModal : true }) }
                />
              <div className = { 'gender-margin' }>
                <div className = { 'grid-global' }>
                  <Checkbox
                    label = { 'Male' }
                    checked = { spouseData.gender === 'M' && 'M' }
                    onChange = { () => this.setState({  }) }
                    />
                  <Checkbox
                    label = { 'Female' }
                    checked = { spouseData.gender === 'F' && 'F' }
                    />
                </div>
              </div>
            </div>
            <div className = { 'grid-global' }>
              <DatePicker
                text = { 'Birth Date' }
                errorMessage = { birthDate ? '' : birthDateErrorMessage }
                selected = { spouseData && spouseData.birthDate ? spouseData.birthDate : birthDate }
                onChange = { (e) => this.dateFunc(e) }
                hint = { '(eg. MM/DD/YYYY)' }
                />
              <div className = { 'status-margin text-align-center' }>
                <GenericInput
                  value = { spouseData && spouseData.status ? spouseData.status : statusName  }
                  text = { 'Status' }
                  errorMessage = { statusName ? '' : statusNameErrorMessage }
                  onChange = { (e) => this.setState({ statusName : e.target.value }) }
                  />
              </div>
            </div>
            <div className = { 'grid-global' }>
              <Checkbox
                label = { 'Group Life Insurance' }
                />
              <Checkbox
                label = { 'Hospitalization Plan' }
                />
            </div>
          </div>
          )
       }
=======
      </div>
      <div>
        <GenericInput
          text = { 'First Name' }
          value = { firstName }
          maxLength = { 30 }
          errorMessage = { firstName ? '' : firstNameErrorMessage }
          />
        <GenericInput
          text = { 'Middle Name' }
          value = { spouseData.middleName ? spouseData.middleName : middleName }
          maxLength = { 20 }
          errorMessage = { middleName ? '' : middleNameErrorMessage }
          onChange = { (e) => this.setState({ middleName : e.target.value }) }
          />
        <GenericInput
          text = { 'Last Name' }
          value = { spouseData.lastName ? spouseData.lastName : lastName }
          errorMessage = { lastName ? '' : lastNameErrorMessage }
          onChange = { () => {} }
          />
        <GenericInput
          text = { 'Occupation' }
          value = { spouseData.occupationName ? spouseData.occupationName : occupationName }
          errorMessage = { occupationName ? '' : occupationNameErrorMessage }
          onChange = { () => {} }
          />
        <GenericInput
          text = { 'Contact Number' }
          value = { spouseData.contactNumber ? spouseData.contactNumber : contactNumber }
          errorMessage = { contactNumber ? '' : contactNumberErrorMessage }
          onChange = { () => {} }
          />
        <GenericInput
          text = { 'Blood Type' }
          value = { spouseData.bloodType ? spouseData.bloodType : bloodType }
          errorMessage = { bloodType ? '' : bloodTypeErrorMessage }
          onClick = { () => this.setState({ showBloodTypeModal : true }) }
          />
        <div className = { 'grid-global' }>
          <DatePicker
            text = { 'Birth Date' }
            errorMessage = { birthDate ? '' : birthDateErrorMessage }
            selected = { spouseData.birthDate ? spouseData.birthDate : birthDate }
            onChange = { (e) => this.dateFunc(e) }
            hint = { '(eg. MM/DD/YYYY)' }
            />
          <div className = { 'status-margin' } >
            <GenericInput
              value = { spouseData.status ? spouseData.status : statusName  }
              text = { 'Status' }
              errorMessage = { statusName ? '' : statusNameErrorMessage }
              onChange = { () => {} }
              />
          </div>
        </div>
        <div className = { 'grid-global' }>
          <Checkbox
            label = { 'Group Life Insurance' }
            />
          <Checkbox
            label = { 'Hospitalization Plan' }
            />
        </div>
>>>>>>> Stashed changes
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
              onClick = { () => postSaveFunc() }
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
