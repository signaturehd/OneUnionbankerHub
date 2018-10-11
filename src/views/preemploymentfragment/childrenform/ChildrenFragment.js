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

import "react-sweet-progress/lib/style.css"
import './styles/childrenStyle.css'

class ChildrenFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      financeStatus : [],
      childrenData : [],
      showFinanceStatusModal : false,
      enabledLoader : false,
      showFinanceStatusErrorMessage : '',
      statusId: '',
      financeId: '',
      statusName: '',
      bankNameInstitution : '',
      natureObligation: '',
      amount: '',
      bankNameInstitutionErrorMessage : '',
      natureObligationErrorMessage: '',
      amountErrorMessage: '',
      statusNameErrorMessage: '',
      noticeResponse: '',
      showFinanceModal : false,
      showChildrenFormModal : false,
      editMode : false,
      financeDetailsHolder : [],
      index : 4,
      viewMoreText : 'View more',
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(18)
    this.presenter.getFinancialStatus()
    this.presenter.getFinancialDetails()
    this.presenter.getChildren()
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

  circularLoader (enabledLoader) {
    this.setState({ enabledLoader })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
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

  /*edit mode*/

  editForm (selectedCard, isParentOrSiblings) {
    const nullChecker = selectedCard && selectedCard
    const nullCheckerName = selectedCard && selectedCard.name
    this.setState({ showEditModeModal : true })
    this.setState({
      isParentOrSiblings : isParentOrSiblings,
      firstName : nullCheckerName.first,
      middleName : nullCheckerName.middle,
      lastName : nullCheckerName.last,
      bloodTypeName : nullChecker.bloodType,
      birthDate : nullChecker.birthDate,
      occupationName : nullChecker.occupation,
      contact : nullChecker.contactNumber,
      gender : nullChecker.gender === 'M' ? 'Male' : 'Female',
      genderId : nullChecker.gender === 'M' ? 'M' : 'F',
      parentId : nullChecker.id,
      relationship : nullChecker.relationship,
      statusId : nullChecker.status,
      statusName : nullChecker.status === 1 ? 'Deceased' : 'Living',
      hospitalization : nullChecker.healthHospitalizationPlan,
      groupPlan : nullChecker.groupLifeInsurance,
    })
  }

  submitForm () {
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
    this.setState({ showEditModeModal : false })
    if(isParentOrSiblings === true) {
      this.presenter.updateParentForm(
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
        hospitalization,
        groupPlan,
      )
    } else if (isParentOrSiblings === false) {
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
        hospitalization,
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
        hospitalization,
        groupPlan,
      )
    }
  }

  addForm () {
    this.setState({ showEditModeModal : true })
    this.setState({
      isParentOrSiblings : null,
      firstName : '',
      middleName : '',
      lastName  : '',
      bloodTypeName : '',
      birthDate : nullChecker.birthDate,
      occupationName : '',
      contact :  '',
      gender  : '',
      genderId : '',
      parentId  : '',
      relationship  : '',
      statusId  : '',
      statusName  : '',
    })
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
    } = this.state


    const isVisible = (childrenData && childrenData.length > 4) ? '' : 'hide'

    return(
    <div>
    { super.render() }
      {
        showFinanceModal &&
        <Modal>
          <center>
            <h2>{ noticeResponse }</h2>
            <br/>
            <GenericButton
              onClick = { () => this.setState({ showFinanceModal : false }) }
              text = { 'Ok' }
              />
          </center>
        </Modal>
      }
      {
        showChildrenFormModal &&
        <ChildrenFormModal
          isParentOrSiblings = { isParentOrSiblings }
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
          genderFunc = { (showGenderModal) => this.setShospitalizationFunctate({ showGenderModal }) }
          genderCodeFunc = { (e) => {} }
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
          onClose = { () => this.setState({ showEditModeModal : false }) }
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
            height = { 100 }
            width = { 100 }
            percent={ percentage } />
        </div>
        <br/>
        <div className = { 'grid-global' }>
          <div></div>
          <div className = { 'text-align-right' }>
            <GenericButton
              text = { 'Add' }
              onClick = { () => this.setState({ showChildrenFormModal : true }) }
              />
          </div>
        </div>
        <br/>
        {
          enabledLoader ?
          <center>
            <CircularLoader show = { enabledLoader }/>
          </center>
          :
          <div>
            <ChildrenMultipleCardComponent
              index = { index }
              childrenData = { childrenData }
              financeDetailsHolder = { financeDetailsHolder }
              onEditModeProperty = { (resp) => this.editMode(resp) }
              />
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
        }
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
