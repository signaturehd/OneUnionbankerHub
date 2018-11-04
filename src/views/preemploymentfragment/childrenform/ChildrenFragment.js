import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  SingleInputModal,
  Card
} from '../../../ub-components/'

import { RequiredValidation } from '../../../utils/validate/'

import ChildrenFormModal from './modals/ChildrenModal'
import ChildrenMultipleCardComponent from './components/ChildrenMultipleCardComponent'
import Presenter from './presenter/ChildrenPresenter'

import { Progress } from 'react-sweet-progress'

import NoticeResponse from '../../notice/NoticeResponseModal'

import * as func from './functions/ChildrenFunctions'

import "react-sweet-progress/lib/style.css"
import './styles/childrenStyle.css'

class ChildrenFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      childrenData : [],
      bloodObject: [],
      statusObject : [],
      genderObject : [],
      attachments : [],
      defaultAttachmentsArray : [{
        name : 'Birth Certificate'
      }],
      enabledLoader : false,
      showNoticeResponse : false,
      showBloodTypeModal : false,
      showStatusModal : false,
      showEditModeModal : false,
      showGenderModal : false,
      showViewModal : false,
      showPdfViewComponent : false,
      enabledLoaderPdfModal : false,
      index : 4,
      viewFile : '',
      viewMoreText : 'View more',
      childrenId : '',
      lastName: '',
      firstName : '',
      middleName: '',
      occupationName : '',
      contact : '',
      birthDate: '',
      statusId: '',
      statusName: '',
      gender: '',
      genderId : '',
      hospitalization : '',
      groupPlan : '',
      relationship: '',
      bloodTypeName: '',
      noticeResponse: '',
      genderErrorMessage: '',
      statusNameErrorMessage: '',
      birthDateErrorMessage : '',
      contactNumberErrorMessage : '',
      occupationNameErrorMessage : '',
      firstNameErrorMessage : '',
      middleNameErrorMessage: '',
      lastNameErrorMessage: '',
      bloodTypeErrorMessage: '',
      relationshipErrorMessage: '',
      count : 2,
      editMode: false,
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(18)
    this.presenter.getObjectData()
    this.presenter.getChildren()
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : true })
  }

  hideDocumentLoader () {
    this.setState({ enabledLoaderPdfModal : false })
  }

  showChildrenDetails (childrenData) {
    this.setState({ childrenData })
  }

  noticeResponseFunc (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponse : true })
  }

  showGender (genderObject) {
    this.setState({ genderObject })
  }

  showBloodType (bloodObject) {
    this.setState({ bloodObject })
  }

  showStatus (statusObject) {
    this.setState({ statusObject })
  }

  /* Validation */

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  firstNameValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ firstName : validate })
  }

  middleNameValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ middleName : validate })
  }

  lastNameValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ lastName : validate })
  }

  contactValidate (e) {
    const validate = func.checkValidateNumber(e)
    this.setState({ contact : validate })
  }

  occupationNameValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ occupationName : validate })
  }

  relationshipValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ relationship : validate })
  }

  showAttachmentsFileView (data) {
    let arrayNew = [...this.state.attachments]
    const objectArray = {
      file : data
    }
    arrayNew.push(objectArray)
    this.setState({ attachments : arrayNew })
  }

  /*edit mode*/

  editForm (selectedCard) {
    const nullChecker = selectedCard && selectedCard
    const nullCheckerName = selectedCard && selectedCard.name
    this.setState({
      showEditModeModal : true,
      firstName : nullCheckerName.first,
      middleName : nullCheckerName.middle,
      lastName : nullCheckerName.last,
      bloodTypeName : nullChecker.bloodType,
      birthDate : nullChecker.birthDate,
      occupationName : nullChecker.occupation,
      contact : nullChecker.contactNumber,
      gender : nullChecker.gender === 'M' ? 'Male' : 'Female',
      genderId : nullChecker.gender === 'M' ? 'M' : 'F',
      childrenId : nullChecker.id,
      relationship : nullChecker.relationship,
      statusId : nullChecker.status,
      statusName : nullChecker.status === 1 ? 'Deceased' : 'Living',
      hospitalization : nullChecker.healthHospitalizationPlan,
      groupPlan : nullChecker.groupLifeInsurance,
    })
    this.presenter.checkAttachments(nullChecker)
  }

  defaultValueForm () {
    this.setState({
      editMode : false,
      firstName : '',
      middleName  : '',
      lastName : '',
      bloodTypeName : '',
      birthDate : '',
      occupationName  : '',
      contact : '',
      gender : '',
      genderId : '',
      childrenId : '',
      relationship : '',
      statusId : '',
      statusName : '',
      hospitalization : '',
      groupPlan : '',
      attachments: [],
      defaultAttachmentsArray : [{
        name : 'Birth Certificate'
      }],
    })
  }

  submitForm () {
    const {
      childrenId,
      firstName,
      lastName,
      middleName,
      genderId,
      relationship,
      statusId,
      contact,
      occupationName,
      birthDate,
      bloodTypeName,
      hospitalization,
      groupPlan,
      editMode,
      defaultAttachmentsArray
    } = this.state

    let gender = genderId === 'M' ? 'M' : 'F'

    if(editMode) {
      this.presenter.putChildren(
        childrenId,
        firstName,
        lastName,
        middleName,
        gender,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization,
        groupPlan,
        defaultAttachmentsArray
      )
      this.setState({ showEditModeModal : false })
      this.editForm()
      this.defaultValueForm()
    } else {
      this.presenter.postChildren(
        childrenId,
        firstName,
        lastName,
        middleName,
        genderId,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization,
        groupPlan,
        defaultAttachmentsArray
      )
      this.setState({ showEditModeModal : false })
      this.editForm()
      this.defaultValueForm()
    }
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage,
    } = this.props

    const {
      childrenData,
      bloodObject,
      statusObject,
      genderObject,
      defaultAttachmentsArray,
      enabledLoader,
      lastName,
      firstName,
      middleName,
      occupationName,
      contact,
      birthDate,
      statusId,
      statusName,
      gender,
      genderId,
      relationship,
      bloodTypeName,
      genderErrorMessage,
      birthDateErrorMessage,
      statusNameErrorMessage,
      firstNameErrorMessage,
      middleNameErrorMessage,
      lastNameErrorMessage,
      occupationNameErrorMessage,
      contactNumberErrorMessage,
      bloodTypeErrorMessage,
      relationshipErrorMessage,
      noticeResponse,
      viewMoreText,
      index,
      showNoticeResponse,
      showStatusModal,
      showBloodTypeModal,
      showEditModeModal,
      showGenderModal,
      isParentOrSiblings,
      hospitalization,
      groupPlan,
      count,
      editMode,
      showViewModal,
      showPdfViewComponent,
      viewFile,
      attachments,
      enabledLoaderPdfModal
    } = this.state

    const isVisible = (childrenData && childrenData.length > 4) ? '' : 'hide'

    return(
    <div>
    { super.render() }
      {
        showNoticeResponse &&
        <NoticeResponse
          noticeResponse = { noticeResponse }
          onClose = { () => {
            this.props.reloadPreEmploymentForm()
            this.setState({ showNoticeResponse : false })
          } }
        />
      }
      {
        showEditModeModal &&
        <ChildrenFormModal
          showViewModal = { showViewModal }
          showPdfViewComponent = { showPdfViewComponent }
          viewFile = { viewFile }
          closeViewAttachments = { () => this.setState({ showViewModal : false }) }
          viewAttachments = { (viewFile) => this.setState({ viewFile, showViewModal : true }) }
          attachments = { attachments }
          enabledLoaderPdfModal = { enabledLoaderPdfModal }
          count = { count }
          defaultAttachmentsArray = { defaultAttachmentsArray }
          editMode = { editMode }
          showStatusModal = { showStatusModal }
          showBloodTypeModal = { showBloodTypeModal }
          showGenderModal = { showGenderModal }
          bloodObject = { bloodObject }
          statusObject = { statusObject }
          genderObject = { genderObject }
          firstNameFunc = { (e) => this.firstNameValidate(e) }
          lastNameFunc = { (e) => this.lastNameValidate(e) }
          middleNameFunc = { (e) => this.middleNameValidate(e) }
          occupationNameFunc = { (e) => this.occupationNameValidate(e) }
          contactNumberFunc = { (e) => this.contactValidate(e) }
          birthDateFunc = { (birthDate) => this.setState({ birthDate }) }
          relationshipNameFunc = { (relationship) => this.relationshipValidate(relationship) }
          bloodTypeFunc = { (showBloodTypeModal) => this.setState({ showBloodTypeModal }) }
          statusNameFunc = { (showStatusModal) => this.setState({ showStatusModal }) }
          groupPlanFunc = { () => this.setState({ groupPlan : groupPlan === 1 ? 0 : 1 }) }
          hospitalizationFunc = { () => this.setState({ hospitalization : hospitalization === 1 ? 0 : 1 }) }
          genderFunc = { (showGenderModal) => this.setState({ showGenderModal }) }
          genericFileAttachmentArray = { (attachment, tempCount) => {
            const attachmentTemp = [...attachment]
            let newCount = tempCount + 1
            this.setState({ count : newCount })
              attachmentTemp.push({
                name : 'Birth Certificate ' + tempCount
              })
            this.setState({ defaultAttachmentsArray : attachmentTemp })
            }
          }
          lastName = { lastName }
          firstName = { firstName }
          middleName = { middleName }
          occupationName = { occupationName }
          contact = { contact }
          birthDate = { birthDate }
          statusId = { statusId }
          statusName = { statusName }
          gender = { gender }
          relationship = { relationship }
          hospitalization = { hospitalization }
          groupPlan = { groupPlan }
          relationshipErrorMessage = { relationshipErrorMessage }
          bloodTypeName = { bloodTypeName }
          birthDateErrorMessage = { birthDateErrorMessage }
          genderErrorMessage = { genderErrorMessage }
          birthDateErrorMessage = { birthDateErrorMessage }
          statusNameErrorMessage = { statusNameErrorMessage }
          firstNameErrorMessage = { firstNameErrorMessage }
          middleNameErrorMessage = { middleNameErrorMessage }
          lastNameErrorMessage = { lastNameErrorMessage }
          occupationNameErrorMessage = { occupationNameErrorMessage }
          contactNumberErrorMessage = { contactNumberErrorMessage }
          bloodTypeErrorMessage = { bloodTypeErrorMessage }
          onClose = { () => {
            this.setState({ showEditModeModal : false })
            this.defaultValueForm()
          } }
          saveForm = { () => this.submitForm() }
          selectedStatusFunc = {
          (
            statusId,
            statusName,
            showStatusModal,
            statusNameErrorMessage) =>  this.setState({
            statusId,
            statusName,
            showStatusModal,
            statusNameErrorMessage })
          }
          selectedBloodTypeFunc = {
            (
              bloodTypeName,
              showBloodTypeModal,
              bloodTypeErrorMessage
            ) => this.setState({
              bloodTypeName,
              showBloodTypeModal,
              bloodTypeErrorMessage
            })
          }
          selectedGenderFunc = { (
            genderId,
            gender,
            showGenderModal,
            genderErrorMessage
          ) => this.setState({
            genderId : genderId === 0 ? 'M' : 'F',
            gender : gender === 'Male' ? 'Male' : 'Female',
            showGenderModal,
            genderErrorMessage
          })
        }
        />
      }
      <div>
        <br/>
        <div className = { 'percentage-grid' }>
          <div>
          <h2 className = { 'header-margin-default text-align-left' }>Children Form</h2>
          <h2>Fill up children form.</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
        </div>
        <br/>
        <div className = { 'grid-global' }>
          <div></div>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add' }
              onClick  = { () => this.setState({ showEditModeModal : true }) }
            />
          </div>
        </div>
        <br/>
        {
          enabledLoader ?
          <center>
            <br/>
            <h2>Please wait while we we&#39;re retrieving your children record/s </h2>
            <br/>
            <CircularLoader show = { enabledLoader }/>
            <br/>
          </center>
          :
          <ChildrenMultipleCardComponent
            childrenData = { childrenData }
            onDeleteModeProperty = { (e) => this.presenter.removeChildren(e) }
            onEditModeProperty = { (e) => {
              this.setState({ editMode: true })
              this.editForm(e)
            } }
            index = { index }
            />
        }
        <br/>
        <button
          type = { 'button' }
          className = { `viewmore tooltip ${ isVisible }` }
          onClick = {
            () => {
              if(index === childrenData.length)
                this.setState({ index : 4, viewMoreText : 'View more' })
              else
                this.setState({ index : childrenData.length, viewMoreText : 'View less' })
            }
          }>
          <img src={ require('../../../images/icons/horizontal.png') } />
          <span className={ 'tooltiptext' }>{ viewMoreText }</span>
        </button>
      </div>
    </div>
    )
  }
}

ChildrenFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

ChildrenFragment.defaultProps = {
}

export default ConnectView(ChildrenFragment, Presenter )
