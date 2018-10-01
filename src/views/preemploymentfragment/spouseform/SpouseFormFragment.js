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
      bloodType: '',
      birthDate: '',
      statusName: '',
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

  submitForm () {
    const {
      enabledLoader,
      lastName,
      firstName,
      middleName,
      occupationName,
      contactNumber,
      bloodType,
      birthDate,
      statusName,
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
    } = this.state

    if (!this.validator(firstName)) {
      this.setState({ firstNameErrorMessage: 'Name of the Bank/ Financial Institution field is required' })
    } else if (!this.validator(middleName)) {
      this.setState({ middleNameErrorMessage : 'Nature of Obligation field is required'  })
    } else if (!this.validator(amount)) {
      this.setState({ amountErrorMessage : 'Amount field is required'  })
    } else if (!this.validator(lastName)) {
      this.setState({ lastNameErrorMessage : 'Status field is required' })
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
      bloodType,
      birthDate,
      statusName,
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
        label = { 'Type of Calamity' }
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
