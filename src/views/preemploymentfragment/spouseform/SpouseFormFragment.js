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
  MultipleAttachments,
} from '../../../ub-components/'

import { RequiredValidation } from '../../../utils/validate/'

import Presenter from './presenter/SpousePresenter'

import { Progress } from 'react-sweet-progress'

import NoticeResponseModal from '../../notice/NoticeResponseModal'

import PreEmploymentViewAttachmentsComponent from '../../preemployment/components/PreEmploymentViewAttachmentsComponent'
import ViewAttachmentModal from '../../preemployment/modals/ViewAttachmentModal'

import 'react-sweet-progress/lib/style.css'
import './styles/spouseStyle.css'

import * as validate from './functions/SpouseFunctions'

import moment from 'moment'

class SpouseFormFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      bloodObjectParam: [],
      statusObject : [],
      genderObject : [],
      attachments : [],
      spouseAttachments: [{
        id : 0,
        name : 'Marriage Certificate'
      }],
      spouseAttachmentsArray: [],
      selectedGender : null,
      spouseData : '',
      count: 1,
      enabledLoader : false,
      editMode : false,
      bloodTypeName: '',
      showBloodTypeModal : false,
      showNoticeResponseModal: false,
      showStatusModal: false,
      showGenderModal : false,
      showViewModal : false,
      spouseId: '',
      lastName: '',
      firstName : '',
      middleName: '',
      occupationName : '',
      contact : '',
      birthDate: '',
      statusId: '',
      statusName: '',
      genderId: '',
      gender: '',
      genderErrorMessage: '',
      bloodType: '',
      statusName: '',
      hospitalization: '',
      groupPlan: '',
      statusNameErrorMessage: '',
      birthDateErrorMessage : '',
      contactNumberErrorMessage : '',
      occupationNameErrorMessage : '',
      firstNameErrorMessage : '',
      middleNameErrorMessage: '',
      lastNameErrorMessage: '',
      bloodTypeErrorMessage: '',
      noticeResponse: '',
      viewFile: '',
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(17)
    this.presenter.getSpouse()
    this.presenter.getObjectData()
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showBloodType (bloodObjectParam) {
    this.setState({ bloodObjectParam })
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  checkGender (gender) {
    if(gender === 'M') {
      return 'Male'
    } else {
      return 'F'
    }
  }

  checkStatus (status) {
    if(status === 0) {
      return 'Living'
    } else {
      return 'Deceased'
    }
  }

  showSpouseDetails (spouseData, editMode) {
    const nullChecker = spouseData && spouseData
    const nullCheckerName = spouseData && spouseData.name
    this.setState({
      firstName : nullCheckerName.first,
      middleName : nullCheckerName.middle,
      lastName : nullCheckerName.last,
      bloodTypeName : nullChecker.bloodType,
      birthDate : nullChecker.birthDate,
      occupationName : nullChecker.occupation ,
      contact : nullChecker.contactNumber,
      genderId : nullChecker.gender,
      gender: nullChecker.gender ? this.checkGender(nullChecker.gender) : '',
      spouseId : nullChecker.id ,
      statusId : nullChecker.status ,
      statusName : nullChecker.status ? this.checkStatus(nullChecker.status) : '',
      hospitalization : nullChecker.healthHospitalizationPlan ?  nullChecker.healthHospitalizationPlan : 0,
      groupPlan : nullChecker.groupLifeInsurance ? nullChecker.groupLifeInsurance : 0,
      editMode
    })
    this.setState({ spouseData  })
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  noticeResponseFunc (noticeResponse, showNoticeResponseModal) {
    this.setState({ noticeResponse, showNoticeResponseModal })
  }

  reload () {
    this.props.reloadPreEmploymentForm()
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

  showGender (genderObject) {
    this.setState({ genderObject })
  }

  statusNameErrorMessageFunc (statusNameErrorMessage) {
    this.setState({ statusNameErrorMessage })
  }

  birthDateErrorMessageFunc (birthDateErrorMessage) {
    this.setState({ birthDateErrorMessage })
  }

  bloodTypeErrorMessageFunc (bloodTypeErrorMessage) {
    this.setState({ bloodTypeErrorMessage })
  }

  showStatus (statusObject) {
    this.setState({ statusObject })
  }

  saveFunction () {
    const {
      editMode,
      firstName,
      middleName,
      lastName,
      birthDate,
      occupationName,
      contact,
      statusId,
      gender,
      bloodTypeName,
      hospitalization,
      groupPlan,
      spouseId,
      spouseAttachmentsArray
    } = this.state
      if(editMode) {
        this.presenter.putSpouseForm(
          firstName,
          middleName,
          lastName,
          moment(birthDate).format('MM/DD/YYYY'),
          occupationName,
          contact,
          statusId,
          gender,
          bloodTypeName,
          hospitalization,
          groupPlan,
          spouseId,
          spouseAttachmentsArray)
      } else {
        this.presenter.postSpouseForm(
          firstName,
          middleName,
          lastName,
          moment(birthDate).format('MM/DD/YYYY'),
          occupationName,
          contact,
          statusId,
          gender,
          bloodTypeName,
          hospitalization,
          groupPlan,
          spouseId,
          spouseAttachmentsArray)
      }
  }

  /* Remove Option */

  deleteFunction () {
    const { spouseId } = this.state
    this.presenter.removeSpouse(spouseId)
  }

  /* Validation */

  firstNameValidate (e) {
    const isValid = validate.checkAlphabetInput(e)
    this.setState({ firstName : isValid })
  }

  middleNameValidate (e) {
    const isValid = validate.checkAlphabetInput(e)
    this.setState({ middleName : isValid })
  }

  lastNameValidate (e) {
    const isValid = validate.checkAlphabetInput(e)
    this.setState({ lastName : isValid })
  }

  occupationNameValidate (e) {
    const isValid = validate.checkAlphabetInput(e)
    this.setState({ occupationName : isValid })
  }

  contactNumberValidate (e) {
    const isValid = validate.checkNumberInput(e)
    this.setState({ contact : isValid })
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      bloodObjectParam,
      statusObject,
      genderObject,
      attachments,
      spouseAttachmentsArray,
      spouseAttachments,
      spouseData,
      selectedGender,
      count,
      enabledLoader,
      lastName,
      firstName,
      middleName,
      occupationName,
      contact,
      bloodType,
      birthDate,
      statusId,
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
      showBloodTypeModal,
      showNoticeResponseModal,
      showStatusModal,
      showGenderModal,
      showViewModal,
      hospitalization,
      groupPlan,
      viewFile,
    } = this.state

  return(
  <div>
    { super.render() }
    {
      showNoticeResponseModal &&

      <NoticeResponseModal
        noticeResponse = { noticeResponse }
        onClose = { () => {
          this.props.reloadPreEmploymentForm()
          this.setState({ showNoticeResponseModal: false }) }
        }
      />
    }
    {
      showViewModal &&
      <ViewAttachmentModal
        file = { viewFile }
        onClose = { () => this.setState({ showViewModal : false }) }
      />
    }
    {
      showBloodTypeModal &&

      <SingleInputModal
        label = { 'Blood Type' }
        inputArray = { bloodObjectParam }
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
    {
      showStatusModal &&

      <SingleInputModal
        label = { 'Status' }
        inputArray = { statusObject }
        selectedArray = { (statusId, statusName) =>
          this.setState({
            statusId,
            statusName,
            showStatusModal : false,
            statusNameErrorMessage : ''
          })
        }
        onClose = { () => this.setState({ showStatusModal : false }) }
      />
    }
    {
      showGenderModal &&

      <SingleInputModal
        label = { 'Gender' }
        inputArray = { genderObject }
        selectedArray = { (genderId, gender) =>
          this.setState({
            genderId,
            gender,
            showGenderModal : false,
            genderErrorMessage : ''
          })
        }
        onClose = { () => this.setState({ showGenderModal : false }) }
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
          height = { 65 }
          width = { 65 }
          percent = { percentage } />
      </div>
      {
        enabledLoader ?
        <center className={ 'circular-loader-center' }>
          <br/>
          <h2>Please wait while we we&#39;re retrieving spouse information</h2>
          <CircularLoader show={ enabledLoader }/>
        </center> :
        <div>
          <div>
            <div>
              <GenericInput
                text = { 'First Name' }
                value = { firstName }
                maxLength = { 30 }
                errorMessage = { firstName ? '' : firstNameErrorMessage }
                onChange = { (e) => this.firstNameValidate(e.target.value) }
                />
              <GenericInput
                text = { 'Middle Name' }
                value = { middleName }
                maxLength = { 20 }
                errorMessage = { middleName ? '' : middleNameErrorMessage }
                onChange = { (e) => this.middleNameValidate(e.target.value) }
                />
              <GenericInput
                text = { 'Last Name' }
                value = { lastName }
                maxLength = { 20 }
                errorMessage = { lastName ? '' : lastNameErrorMessage }
                onChange = { (e) => this.lastNameValidate(e.target.value) }
                />
              <GenericInput
                text = { 'Occupation' }
                value = { occupationName }
                errorMessage = { occupationName ? '' : occupationNameErrorMessage }
                onChange = { (e) => this.occupationNameValidate(e.target.value) }
                />
              <GenericInput
                text = { 'Contact Number' }
                value = { contact }
                maxLength = { 11 }
                errorMessage = { contact ? '' : contactNumberErrorMessage }
                onChange = { (e) => this.contactNumberValidate(e.target.value) }
                />
              <div className = { 'grid-global' }>
                <GenericInput
                  text = { 'Gender' }
                  value = { gender }
                  readOnly
                  maxLength = { 12 }
                  errorMessage = { gender ? '' : genderErrorMessage }
                  onClick = { () => this.setState({ showGenderModal : true }) }
                  />
                <DatePicker
                  selected = { birthDate ? moment(birthDate) : '' }
                  maxDate = { moment() }
                  text = { 'Birth Date' }
                  readOnly
                  errorMessage = { birthDate ? '' : birthDateErrorMessage }
                  hint = { '(eg. MM/DD/YYYY)' }
                  onChange = { (e) => this.dateFunc(e) }
                  />
              </div>

              <div className = { 'grid-global' } >
                <GenericInput
                  text = { 'Blood Type' }
                  value = { bloodTypeName }
                  readOnly
                  errorMessage = { bloodTypeName ? '' : bloodTypeErrorMessage }
                  onClick = { () => this.setState({ showBloodTypeModal : true }) }
                  />
                <div className = { 'status-margin text-align-center' }>
                  <GenericInput
                    value = { statusName  }
                    text = { 'Status' }
                    readOnly
                    errorMessage = { statusName ? '' : statusNameErrorMessage }
                    onClick = { () => this.setState({ showStatusModal : true }) }
                    />
                </div>
              </div>
              <div className = { 'grid-global-rows' }>
                <div>
                  <Checkbox
                    checked = { hospitalization }
                    label = { 'Hospitalization Plan' }
                    onChange = { () => this.setState({  hospitalization : hospitalization === 1 ? 0 : 1  }) }
                    />
                  <br/>
                </div>
                <div>
                  <Checkbox
                    checked = { groupPlan }
                    label = { 'Group Life Insurance' }
                    onChange = { () => this.setState({ groupPlan : groupPlan === 1 ? 0 : 1 }) }
                  />
                </div>
              </div>
            </div>
          </div>
          <br/>
          {
              enabledLoader ?
              <center>
                <br/>
                <h2>Please wait while we we&#39;re retrieving your documents </h2>
                <br/>
                <CircularLoader show = { enabledLoader } />
                <br/>
              </center>
              :
              <div>
                <PreEmploymentViewAttachmentsComponent
                  file = { attachments }
                  onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
              </div>
          }
          <br/>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Atttachments' }
              onClick = { () => {
              const updatedAttachments = [...spouseAttachments]
              let newCount = count + 1
              this.setState({ count : newCount })
              updatedAttachments.push({
                name : 'Marriage Certificate ' + count
              })
              this.setState({ spouseAttachments : updatedAttachments })
                }
              }
            />
          </div>
          <MultipleAttachments
            count = { count }
            countFunc = { (count) => this.setState({ count }) }
            placeholder = { 'Form Attachments' }
            fileArray = { spouseAttachments }
            setFile = { (spouseAttachmentsArray) =>
                this.setState({ spouseAttachmentsArray })
            }
          />
          <center>
          <div className = { 'grid-global-columns-x3' }>
            <div></div>
            <div>
              {
                editMode ?
                <div className = { 'grid-global' }>
                  <GenericButton
                    className = { 'global-button spouse-employment-button' }
                    text = { 'Delete' }
                    onClick = { () => this.deleteFunction() }
                    />
                  <GenericButton
                    className = { 'global-button spouse-employment-button' }
                    text = { 'Edit' }
                    onClick = { () => this.saveFunction() }
                    />
                </div>
                  :
                <GenericButton
                  className = { 'global-button spouse-employment-button' }
                  text = { 'Save' }
                  onClick = { () => this.saveFunction() }
                  />
              }
            </div>
          </div>
          </center>
        </div>
      }
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
