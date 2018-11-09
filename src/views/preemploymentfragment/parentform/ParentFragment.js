import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import Presenter from './presenter/ParentPresenter'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  SingleInputModal,
  Card,
  Line
} from '../../../ub-components/'

import { RequiredValidation } from '../../../utils/validate/'

import ParentModal from './modals/GenericModal'

import ParentComponent from './components/ParentComponent'
import SiblingComponent from './components/SiblingComponent'

import { Progress } from 'react-sweet-progress'

import "react-sweet-progress/lib/style.css"
import './styles/childrenStyle.css'

import * as func from './functions/ParentFunctions'

import NoticeResponse from '../../notice/NoticeResponseModal'

class ParentFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      parentDetails : [],
      siblingDetails : [],
      bloodObject: [],
      statusObject : [],
      relationshipObject: [],
      siblingsObject: [],
      genderObject : [],
      showNoticeResponse : false,
      editMode : false,
      showBloodTypeModal : false,
      showStatusModal : false,
      showEditModeModal : false,
      showRelationShipModal : false,
      enabledParentLoader : false,
      enabledSiblingsLoader : false,
      showGenderModal : false,
      isParentOrSiblings : null,
      index : 4,
      viewMoreText : 'View more',
      parentId : '',
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
    }
  }

  /* Implementation */
  componentDidMount () {
    if(this.props.reuse) {
    } else {
      this.props.onSendPageNumberToView(19)
    }
    this.presenter.getParents()
    this.presenter.getSiblings()
    this.presenter.getObjectData()
  }

  showParentDetails (parentDetails) {
    this.setState({ parentDetails })
  }

  showParentRelationship (relationshipObject) {
     this.setState({ relationshipObject })
  }

  showSiblingRelationship (siblingsObject) {
     this.setState({ siblingsObject })
  }

  showSiblingDetails (siblingDetails) {
    this.setState({ siblingDetails })
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

  showParentCircularLoader () {
    this.setState({ enabledParentLoader : true })
  }

  hideParentCircularLoader () {
    this.setState({ enabledParentLoader : false })
  }

  showSiblingsCircularLoader () {
    this.setState({ enabledSiblingsLoader : true })
  }

  hideSiblingsCircularLoader () {
    this.setState({ enabledSiblingsLoader : false })
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

  showFirsNameErrorMessage (firstNameErrorMessage) {
    this.setState({ firstNameErrorMessage })
  }

  showMiddleNameErrorMessage (middleNameErrorMessage) {
    this.setState({ middleNameErrorMessage })
  }

  showLastNameErrorMessage (lastNameErrorMessage) {
    this.setState({ lastNameErrorMessage })
  }

  showOccupationErrorMessage (occupationNameErrorMessage) {
    this.setState({ occupationNameErrorMessage })
  }

  showContactErrorMessage (contactNumberErrorMessage) {
    this.setState({ contactNumberErrorMessage })
  }

  showRelationshipErrorMessage (relationshipErrorMessage) {
    this.setState({ relationshipErrorMessage })
  }

  showStatusErrorMessage (statusNameErrorMessage) {
    this.setState({ statusNameErrorMessage })
  }

  showGenderErrorMessage (genderErrorMessage) {
    this.setState({ genderErrorMessage })
  }

  showBloodTypeErrorMessage (bloodTypeErrorMessage) {
    this.setState({ bloodTypeErrorMessage })
  }

  /*edit mode*/

  editForm (selectedCard, isParentOrSiblings, editMode) {
    const nullChecker = selectedCard && selectedCard
    const nullCheckerName = selectedCard && selectedCard.name
    this.setState({ showEditModeModal : true })
    this.setState({
      isParentOrSiblings,
      editMode,
      firstName : nullCheckerName.first,
      middleName : nullCheckerName.middle,
      lastName : nullCheckerName.last,
      bloodTypeName : nullChecker.bloodType,
      birthDate : nullChecker.birthDate,
      occupationName : nullChecker.occupation,
      contact : nullChecker.contactNumber,
      gender : nullChecker.relationship === 'Brother' ? 'Male' : 'Female',
      genderId : nullChecker.relationship === 'Brother' ? 'M' : 'F',
      parentId : nullChecker.id,
      relationship : nullChecker.relationship,
      statusId : nullChecker.status,
      statusName : nullChecker.status === 0 ? 'Living' : 'Deceased',
      hospitalization : nullChecker.healthHospitalizationPlan,
      groupPlan : nullChecker.groupLifeInsurance,
    })
  }

  updateForm () {
    const {
      parentId,
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
      isParentOrSiblings
    } = this.state

    const gender = genderId === 0 ? 'M' : 'F'

    if(isParentOrSiblings) {
      this.presenter.updateParentForm(
        parentId,
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
        hospitalization ? hospitalization : 0,
        groupPlan,
      )
    } else {
      this.presenter.updateSiblingsForm(
        parentId,
        firstName,
        lastName,
        middleName,
        gender,
        relationship,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization ? hospitalization : 0,
        groupPlan,
      )
    }
  }

  /* add form */

  addForm () {
    const {
      parentId,
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
      isParentOrSiblings
    } = this.state
    const gender = genderId === 'M' ? 'M' : 'F'

    if(isParentOrSiblings) {
      this.presenter.addParentForm(
        parentId,
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
        hospitalization ? hospitalization : 0,
        groupPlan,
      )
    } else {
      this.presenter.addSiblingsForm(
        parentId,
        firstName,
        lastName,
        middleName,
        gender,
        relationship,
        statusId,
        contact,
        occupationName,
        birthDate,
        bloodTypeName,
        hospitalization ? hospitalization : 0,
        groupPlan,
      )
    }
  }

  /* reset value */

  resetValue () {
    this.setState({
      isParentOrSiblings: null,
      editMode: false,
      firstName : '',
      middleName : '',
      lastName : '',
      bloodTypeName : '',
      birthDate : '',
      occupationName : '',
      contact : '',
      gender : '',
      genderId : '',
      parentId : '',
      relationship : '',
      statusId : '',
      statusName : '',
      hospitalization : '',
      groupPlan : '',
    })
  }

  /* Delete Education */

  onDeletePropertyFunc (id, isParent) {
    if(isParent) {
      this.presenter.removeParents(id)
    } else {
      this.presenter.removeSiblings(id)
    }
  }

  setModal () {
    this.setState({ showEditModeModal : false  })
  }

  render() {
    const {
      history,
      checkPEUndertaking,
      percentage
    } = this.props

    const {
      parentDetails,
      siblingDetails,
      bloodObject,
      statusObject,
      genderObject,
      enabledParentLoader,
      enabledSiblingsLoader,
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
      showRelationShipModal,
      isParentOrSiblings,
      hospitalization,
      groupPlan,
      editMode,
      relationshipObject,
      siblingsObject,
      showGenderModal
    } = this.state

    const isVisible = (siblingDetails && siblingDetails.length > 4) ? '' : 'hide'


    return (
      <div>
      { super.render() }
      {
        showNoticeResponse &&
        <NoticeResponse
          noticeResponse = { noticeResponse }
          onClose = { () => {
            this.setState({ showNoticeResponse : false })
            this.prop.reloadPreEmploymentForm()
          } }
        />
      }
        {
          showEditModeModal &&
          <ParentModal
            showGenderModal = { showGenderModal }
            relationshipObject = { relationshipObject }
            siblingsObject = { siblingsObject }
            editMode = { editMode }
            isParentOrSiblings = { isParentOrSiblings }
            showStatusModal = { showStatusModal }
            showBloodTypeModal = { showBloodTypeModal }
            showRelationShipModal = { showRelationShipModal }
            bloodObject = { bloodObject }
            statusObject = { statusObject }
            genderObject = { genderObject }
            genderCodeFunc = { (e) => this.setState({ showGenderModal : e }) }
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
            relationshipFunc = { (showRelationShipModal) => this.setState({ showRelationShipModal }) }
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
              this.resetValue()
            } }
            editFormSubmission = { () => this.updateForm() }
            saveFormSubmission = { () => this.addForm() }
            selectedGenderFunc = { (genderId, gender, showGenderModal, showGenderErrorMessage) =>
              this.setState({ genderId, gender, showGenderModal, showGenderErrorMessage  }) }
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
            selectedRelationshipFunc = { (
              id,
              relationship,
              showRelationShipModal,
              relationshipErrorMessage
            ) => this.setState({
              genderId : id === 0 ? 'M' : 'F',
              gender: id === 0 ? 'Male' : 'Female',
              relationship,
              showRelationShipModal,
              relationshipErrorMessage
            })
          }
          />
        }
        <div className = { `${ this.props.reuse ? 'preemployment-container' : '' }` }>
          <div></div>
          <div>
            {
              !this.props.reuse ?
              <div className = { 'percentage-grid' }>
                <div>
                  <h2 className={ 'header-margin-default text-align-left' }>Parent Form</h2>
                  <h2>Fill up the form.</h2>
                  <br/>
                </div>
                <Progress
                  type = { 'circle' }
                  height = { 65 }
                  width = { 65 }
                  percent = { percentage } />
              </div>
              :
              <div className = { 'percentage-grid' }>
                <div>
                  <div className = { 'text-align-left' }>
                    <GenericButton
                      className = { 'global-button profile-button-small' }
                      text = { 'Back to Profile' }
                      onClick = { () =>
                        this.props.history.push('/settings')
                      }
                    />
                  </div>
                  <br/>
                  <h2 className = { 'header-margin-default text-align-left' }>Adding of Siblings</h2>
                </div>
                <div></div>
              </div>
            }
            <br/>
            <Line/>
            <br/>
            {
              !this.props.reuse &&
              <div>
                {
                  parentDetails.length === 2 ?
                  <h2 className = { 'font-weight-bold' }>Parent</h2>
                  :
                  <div className = { 'grid-global' }>
                    <h2 className = { 'font-weight-bold' }>Parent</h2>
                    {
                      !enabledParentLoader &&
                      <div className = { 'text-align-right' }>
                      <GenericButton
                        className = { 'employment-button global-button' }
                        text = { 'Add Parent' }
                        onClick = { () =>
                          this.setState({
                            showEditModeModal : true,
                            isParentOrSiblings : true
                          })
                          }
                        />
                      </div>
                    }
                  </div>
                }
              </div>
            }
            <br/>
            <div>
              {
                !this.props.reuse &&
                <div>
                  {
                    enabledParentLoader  ?
                    <center>
                      <br/>
                      <br/>
                        <h2>Please wait while we we&#39;re updating your information.</h2>
                      <br/>
                      <CircularLoader show = { enabledParentLoader }/>
                      <br/>
                    </center>
                    :
                    <div>
                    {
                      parentDetails.length !== 0 &&
                      <ParentComponent
                        parentDetails = { parentDetails }
                        onEditModeProperty = { (e, e1, e2) => this.editForm(e, e1, e2) }
                        onDeleteProperty = { (id, parentTrue) => this.onDeletePropertyFunc(id, parentTrue) }
                        />
                    }
                    </div>
                  }
                </div>
              }
            </div>
            <br/>
            <Line/>
            <br/>
            <div className = { 'grid-global' }>
              <h2 className = { 'font-weight-bold' }>Siblings</h2>
              {
                !enabledSiblingsLoader &&
                <div className = { 'text-align-right' }>
                  <GenericButton
                    className = { 'employment-button global-button' }
                    text = { 'Add Siblings' }
                    onClick = { () =>
                      this.setState({
                        showEditModeModal : true,
                        isParentOrSiblings : false
                      })
                    }
                  />
                </div>
              }
            </div>
            <br/>
            {
              enabledSiblingsLoader  ?
              <center>
                <br/>
                <br/>
                  <h2>Please wait while we we&#39;re updating your information.</h2>
                <br/>
                <CircularLoader show = { enabledSiblingsLoader }/>
                <br/>
              </center>
              :
              <div>
                {
                  siblingDetails.length !== 0 &&
                  <div>
                    <SiblingComponent
                      siblingDetails = { siblingDetails }
                      onEditModeProperty = { (e, e1, e2) => this.editForm(e, e1, e2) }
                      onDeleteProperty = { (id, parentTrue) => this.onDeletePropertyFunc(id, parentTrue) }
                      index = { index }
                      />
                      <br/>
                    <button
                      type = { 'button' }
                      className = { `viewmore tooltip ${ isVisible }` }
                      onClick = {
                        () => {
                          if(index === siblingDetails.length)
                            this.setState({ index : 4, viewMoreText : 'View more' })
                          else
                            this.setState({ index : siblingDetails.length, viewMoreText : 'View less' })
                        }
                      }>
                      <img src={ require('../../../images/icons/horizontal.png') } />
                      <span className={ 'tooltiptext' }>{ viewMoreText }</span>
                    </button>
                  </div>
                }
              </div>
            }
          </div>
          <div></div>
        </div>
      </div>
    )
  }
}

ParentFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

ParentFragment.defaultProps = {
}

export default ConnectView(ParentFragment, Presenter)
