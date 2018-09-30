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

import "react-sweet-progress/lib/style.css"
import './styles/spouseStyle.css'

class SpouseFormFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      financeStatus : [],
      enabledLoader : false,
      showFinanceStatusErrorMessage : '',
      statusId: '',
      financeId: '',
      lastName: '',
      firstName : '',
      middleName: '',
      amount: '',
      firstNameErrorMessage : '',
      middleNameErrorMessage: '',
      amountErrorMessage: '',
      lastNameErrorMessage: '',
      noticeResponse: '',
      editMode : false,
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(17)
  }

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
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

  noticeResponseFunc (noticeResponse) {
    this.setState({ showFinanceModal : true })
    this.setState({ noticeResponse })
  }

  submitForm () {
    const {
      firstName,
      middleName,
      amount,
      lastName,
      statusId,
      firstNameErrorMessage,
      middleNameErrorMessage,
      amountErrorMessage,
      lastNameErrorMessage,
      financeId,
      editMode
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
      enabledLoader,
      financeStatus,
      financeDetailsHolder,
      statusId,
      lastName,
      firstName,
      middleName,
      amount,
      showFinanceStatusModal,
      firstNameErrorMessage,
      middleNameErrorMessage,
      amountErrorMessage,
      lastNameErrorMessage,
      showFinanceStatusErrorMessage,
      noticeResponse,
      showFinanceModal,
      showFinancialFormModal,
      index,
      viewMoreText,
      financeId,
      editMode
    } = this.state


    return(
    <div>
    { super.render() }
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
          percent={ percentage } />
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
          value = { middleName }
          maxLength = { 20 }
          errorMessage = { middleName ? '' : middleNameErrorMessage }
          />
        <GenericInput
          text = { 'Last Name' }
          value = { lastName }
          errorMessage = { lastName ? '' : lastNameErrorMessage }
          />
        <GenericInput
          text = { 'Occupation' }
          errorMessage = { '' }
          onClick = { () => {} }
          />
        <GenericInput
          text = { 'Contact Number' }
          errorMessage = { '' }
          onClick = { () => {} }
          />
        <GenericInput
          text = { 'Blood Type' }
          errorMessage = { '' }
          onClick = { () => {} }
          />
        <div className = { 'grid-global' }>
          <DatePicker
            text = { 'Birth Date' }
            errorMessage = { '' }
            onClick = { () => {} }
            />
          <GenericInput
            text = { 'Status' }
            errorMessage = { '' }
            onClick = { () => {} }
            />
        </div>
        <div className = { 'grid-global' }>
          <Checkbox
            label = { 'Group Life Insurance' }
            />
          <Checkbox
            label = { 'Hospitalization Plan' }
            />
        </div>
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

export default ConnectView(SpouseFormFragment, Presenter )
