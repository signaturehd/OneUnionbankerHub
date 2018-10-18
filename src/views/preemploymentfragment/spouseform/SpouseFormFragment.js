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
        name : 'Birth Certificate'
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

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showBloodType (bloodObjectParam) {
    this.setState({ bloodObjectParam })
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
      occupationName : nullChecker.occupation,
      contact : nullChecker.contactNumber,
      genderId : nullChecker.gender,
      gender: nullChecker.gender === 'M' ? 'Male' : 'Female',
      spouseId : nullChecker.id,
      statusId : nullChecker.status,
      statusName : nullChecker.status === 1 ? 'Deceased' : 'Living',
      hospitalization : nullChecker.healthHospitalizationPlan,
      groupPlan : nullChecker.groupLifeInsurance,
      editMode: editMode
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

  showStatus (statusObject) {
    this.setState({ statusObject })
  }

  saveFunction () {
    const {
      firstName,
      middleName,
      lastName,
      birthDate,
      occupation,
      contact,
      status,
      gender,
      bloodType,
      hospitalization,
      groupPlan,
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
      bloodType,
      hospitalization,
      groupPlan,
      spouseId,
      spouseAttachmentsArray)
  }

  updateFunction () {
    const {
      firstName,
      middleName,
      lastName,
      birthDate,
      occupationName,
      contact,
      statusId,
      gender,
      bloodType,
      hospitalization,
      groupPlan,
      spouseId,
      spouseAttachmentsArray
    } = this.state

    this.presenter.putSpouseForm(
      firstName,
      middleName,
      lastName,
      birthDate,
      occupationName,
      contact,
      statusId,
      gender,
      bloodType,
      hospitalization,
      groupPlan,
      spouseId,
      spouseAttachmentsArray)
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
        onClose = { () =>
          this.setState({ showNoticeResponseModal: false }) }
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
                maxLength = { 20 }
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
              <div className = { 'grid-global' }>
                <GenericInput
                  text = { 'Gender' }
                  value = { gender }
                  maxLength = { 12 }
                  errorMessage = { gender ? '' : genderErrorMessage }
                  onClick = { () => this.setState({ showGenderModal : true }) }
                  />
                <DatePicker
                  selected = { moment() }
                  maxDate = { moment() }
                  text = { 'Birth Date' }
                  hint = { '(eg. MM/DD/YYYY)' }
                  />
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
          {
            attachments.length !== 0 &&
              enabledLoader ?
              <center>
              <CircularLoader show = { enabledLoader } />
              </center>
              :
              <PreEmploymentViewAttachmentsComponent
                file = { attachments }
                onClick = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }/>
          }
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add Atttachments' }
              onClick = { () => {
              const updatedAttachments = [...spouseAttachments]
              let newCount = count + 1
              this.setState({ count : newCount })
              updatedAttachments.push({
                name : 'Birth Certificate ' + count
              })
              this.setState({ spouseAttachments : updatedAttachments })
                }
              }
            />
          </div>
          <MultipleAttachments
            count = { count }
            countFunc = { (count) => this.setState({ count }) }
            placeholder = { '.' }
            fileArray = { spouseAttachments }
            setFile = { (spouseAttachmentsArray) =>
                this.setState({ spouseAttachmentsArray })
            }
          />
          <br/>
          <center>
            {
              editMode ?
              <GenericButton
                className = { 'global-button' }
                text = { 'Edit' }
                onClick = { () => this.updateFunction() }
                />
                :
              <GenericButton
                className = { 'global-button' }
                text = { 'Save' }
                onClick = { () => this.saveFunction() }
                />
            }
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
