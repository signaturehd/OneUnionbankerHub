import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router-dom'

import BaseMVPView from '../../common/base/BaseMVPView'
import ConnectView from '../../../utils/ConnectView'

import {
  Modal,
  GenericButton,
  CircularLoader,
  GenericInput,
  Card
} from '../../../ub-components/'

import Presenter from './presenter/CharacterReferencePresenter'

import { Progress } from 'react-sweet-progress'

import './styles/characterReferenceStyle.css'
import 'react-sweet-progress/lib/style.css'

import { NotifyActions } from '../../../actions'
import store from '../../../store'

import CharacterReferenceAddFormModal from './modals/CharacterReferenceAddFormModal'
import MullptipleCardComponent from './components/CharacterReferenceMultipleCardComponent'

import NoticeResponseModal from '../../notice/NoticeResponseModal'

import * as func from './functions/CharacterReferenceFunctions'

class CharacterReferenceFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showCharacterReferenceModal : false,
      showOccupationModal : false,
      showNoticeResponse : false,
      enabledLoader : false,
      occupationId : 0,
      occupationName : '',
      addressText: '',
      addressTextErrorMessage: '',
      fullNameText : '',
      fullNameTextErrorMessage: '',
      emailText : '',
      emailTextErrorMessage: '',
      contactNumberText : '',
      contactNumberTextErrorMessage: '',
      relationshipText : '',
      relationshipTextErrorMessage: '',
      periodOfProfessionExperienceText : '',
      periodOfProfessionExperienceTextErrorMessage: '',
      companyNameText : '',
      companyNameTextErrorMessage: '',
      positionText: '',
      positionTextErrorMessage: '',
      floorText: '',
      floorTextErrorMessage: '',
      buildingNameText: '',
      buildingNameTextErrorMessage: '',
      districtText: '',
      districtTextErrorMessage: '',
      barangayText: '',
      barangayTextErrorMessage: '',
      streetText: '',
      streetTextErrorMessage: '',
      occupationNameErrorMessage: '',
      cityText: '',
      cityTextErrorMessage: '',
      townText: '',
      townTextErrorMessage: '',
      editData : '',
      editMode : false,
      selectedId : '',
      noticeResponse : '',
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(6)
  }

  callBackCharacterReference () {
    this.props.characterReferencePresenter()
  }

  noticeResponseModal (noticeResponse) {
    this.setState({ noticeResponse, showNoticeResponse : true })
    this.props.reloadPreEmploymentForm()
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  /* Error Message Method */

  setFullNameErrorMessage (fullNameTextErrorMessage) {
    this.setState({ fullNameTextErrorMessage })
  }

  setAddressErrorMessage (addressTextErrorMessage) {
    this.setState({ addressTextErrorMessage })
  }

  setEmailErrorMessage (emailTextErrorMessage) {
    this.setState({ emailTextErrorMessage })
  }

  setPositionErrorMessage (positionTextErrorMessage) {
    this.setState({ positionTextErrorMessage })
  }

  setCompanyNameErrorMessage (companyNameTextErrorMessage) {
    this.setState({ companyNameTextErrorMessage })
  }

  setOccupationNameErrorMessage (occupationNameErrorMessage) {
    this.setState({ occupationNameErrorMessage })
  }

  setContactNumberErrorMessage (contactNumberTextErrorMessage) {
    this.setState({ contactNumberTextErrorMessage })
  }

  setRelationshipErrorMessage (relationshipTextErrorMessage) {
    this.setState({ relationshipTextErrorMessage })
  }

  setYearsKnown (periodOfProfessionExperienceTextErrorMessage) {
    this.setState({ periodOfProfessionExperienceTextErrorMessage })
  }

  setFloorErrorMessage (floorTextErrorMessage) {
    this.setState({ floorTextErrorMessage })
  }

  setBuildingErrorMessage (buildingNameTextErrorMessage) {
    this.setState({ buildingNameTextErrorMessage })
  }

  setStreetErrorMessage (streetTextErrorMessage) {
    this.setState({ streetTextErrorMessage })
  }

  setCityErrorMessage (cityTextErrorMessage) {
    this.setState({ cityTextErrorMessage })
  }

  setTownErrorMessage (townTextErrorMessage) {
    this.setState({ townTextErrorMessage })
  }

  setDistrictErrorMessage (districtTextErrorMessage) {
    this.setState({ districtTextErrorMessage })
  }

  setBarangayErrorMessage (barangayTextErrorMessage) {
    this.setState({ barangayTextErrorMessage })
  }

  /* Validation */

  fullNameTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ fullNameText : validate })
  }

  relationshipTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ relationshipText : validate })
  }

  positionTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ positionText : validate })
  }

  companyNameTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ companyNameText : validate })
  }

  floorTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ floorText : validate })
  }

  districtTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ districtText : validate })
  }

  barangayTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ barangayText : validate })
  }

  periodOfProfessionExperienceTextValidate (e) {
    const validate = func.checkValidateNumber(e)
    this.setState({ periodOfProfessionExperienceText : validate })
  }

  emailTextValidate (e) {
    this.setState({ emailText : e })
  }

  contactNumberTextValidate (e) {
    const validate = func.checkValidateNumber(e)
    this.setState({ contactNumberText : validate })
  }

  addressTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ addressText : validate })
  }

  streetTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ streetText : validate })
  }

  buildingNameTextValidate (e) {
    const validate = func.checkNoSymbol(e)
    this.setState({ buildingNameText : validate })
  }

  validator (string) {
    return func.checkedValidateInput(string)
  }

  validatorEmail (string) {
    return func.checkValidateEmail(string)
  }

  /* Posting  */
  postEditMode () {
    const {
      selectedId,
      occupationName,
      occupationId,
      addressText,
      fullNameText,
      emailText,
      contactNumberText,
      relationshipText,
      periodOfProfessionExperienceText,
      positionText,
      companyNameText,
      floorText,
      buildingNameText,
      barangayText,
      streetText,
      districtText,
      townText,
      cityText,
      editMode
    } = this.state

    const {
      characterReferenceData
    } = this.props

    let companyObject = {
     company : {
      position: positionText,
      name: companyNameText,
      departmentFloor: floorText,
      buildingName:  buildingNameText,
      street: streetText,
      district: districtText,
      baranggay: barangayText,
      city: cityText,
      town: townText
      }
    }
    if(!editMode) {
      this.presenter.postCharacterReference(
        selectedId,
        fullNameText,
        relationshipText,
        periodOfProfessionExperienceText,
        contactNumberText,
        companyObject,
        emailText,
        addressText,
        occupationId
       )
    } else {
      this.presenter.putCharacterReference(
        selectedId,
        fullNameText,
        relationshipText,
        periodOfProfessionExperienceText,
        contactNumberText,
        companyObject,
        emailText,
        addressText,
        occupationId
       )
    }
  }

  resetMode () {
    this.setState({
      occupationId : '',
      showCharacterReferenceModal : false,
      selectedId: '',
      occupationName : '',
      occupationNameErrorMessage : '',
      addressText : '',
      addressTextErrorMessage : '',
      fullNameText : '',
      fullNameTextErrorMessage : '',
      emailText : '',
      emailTextErrorMessage : '',
      contactNumberText : '',
      contactNumberTextErrorMessage : '',
      relationshipText : '',
      relationshipTextErrorMessage : '',
      periodOfProfessionExperienceText : '',
      periodOfProfessionExperienceTextErrorMessage : '',
      positionText : '',
      positionTextErrorMessage : '',
      companyNameText : '',
      companyNameTextErrorMessage : '',
      floorText : '',
      floorTextErrorMessage : '',
      buildingNameText : '',
      buildingNameTextErrorMessage : '',
      barangayText : '',
      barangayTextErrorMessage : '',
      streetText : '',
      streetTextErrorMessage : '',
      districtText : '',
      districtTextErrorMessage : '',
      townText : '',
    })
  }

  putEditMode (resp) {
    if(resp.occupation === 1) {
      this.setState({
        occupationName : 'Employed',
        occupationId : resp.occupation,
      })
    } else if (resp.occupation === 2) {
      this.setState({
        occupationName : 'Self-Employed',
        occupationId : resp.occupation,
      })
    } else if (resp.occupation === 3) {
      this.setState({
        occupationName : 'Unemployed',
        occupationId : resp.occupation,
      })
    }
    if(resp.company !== null) {
      this.setState({
        showCharacterReferenceModal : true,
        selectedId : resp.id,
        occupationId : resp.occupation,
        addressText : resp.address,
        fullNameText : resp.name,
        emailText : resp.email,
        contactNumberText : resp.contactNumber,
        relationshipText : resp.relationship,
        periodOfProfessionExperienceText : resp.numberOfYearsKnown,
        positionText : resp.company.position,
        companyNameText : resp.company.name,
        floorText : resp.company.departmentFloor,
        buildingNameText : resp.company.buildingName,
        barangayText : resp.company.baranggay,
        streetText : resp.company.street,
        districtText : resp.company.district,
        townText : resp.company.town,
        cityText : resp.company.city
      })
    } else {
      this.setState({
        showCharacterReferenceModal : true,
        selectedId : resp.id,
        occupationId : resp.occupation,
        addressText : resp.address,
        fullNameText : resp.name,
        emailText : resp.email,
        contactNumberText : resp.contactNumber,
        relationshipText : resp.relationship,
        periodOfProfessionExperienceText : resp.numberOfYearsKnown,
      })
    }
  }

  onEditModeProperty (resp) {
    this.putEditMode(resp)
    this.setState({ editMode : true })
  }

  onDeleteProperty (id) {
    this.presenter.deleteCharacterReference(id)
  }

  render() {
    const {
      percentage
    } = this.props

    const {
      showCharacterReferenceModal,
      enabledLoader,
      showOccupationModal,
      showNoticeResponse,
      occupationId,
      occupationName,
      occupationNameErrorMessage,
      addressText,
      addressTextErrorMessage,
      fullNameText,
      fullNameTextErrorMessage,
      emailText,
      emailTextErrorMessage,
      contactNumberText,
      contactNumberTextErrorMessage,
      relationshipText,
      relationshipTextErrorMessage,
      periodOfProfessionExperienceText,
      periodOfProfessionExperienceTextErrorMessage,
      positionText,
      positionTextErrorMessage,
      companyNameText,
      companyNameTextErrorMessage,
      floorText,
      floorTextErrorMessage,
      buildingNameText,
      buildingNameTextErrorMessage,
      barangayText,
      barangayTextErrorMessage,
      streetText,
      streetTextErrorMessage,
      districtText,
      districtTextErrorMessage,
      townText,
      townTextErrorMessage,
      cityText,
      cityTextErrorMessage,
      editMode,
      noticeResponse
    } = this.state


    const {
      characterReferenceData
    } = this.props

    return (
    <div>
      { super.render() }
      {
        showNoticeResponse &&
        <NoticeResponseModal
          noticeResponse = { noticeResponse }
          onClose = { () => this.setState({ showNoticeResponse : false }) }
          />
      }
      {
        showCharacterReferenceModal &&
        <CharacterReferenceAddFormModal
          editMode = { editMode }
          onSave = { () => this.postEditMode() }
          occupationName = { occupationName }
          occupationId = { occupationId }
          showOccupationModal = { showOccupationModal }
          showOccupationModalFunc = { () =>
            this.setState({ showOccupationModal : true }) }
          showRequiredFieldsFunc = { (occupationId, occupationName, showOccupationModal) =>
            this.setState({ occupationId, occupationName, showOccupationModal }) }
          onClose = { () => {
            this.setState({ showCharacterReferenceModal : false })
            this.resetMode()
          }}

          fullNameTextErrorMessage = { fullNameTextErrorMessage }
          addressTextErrorMessage = { addressTextErrorMessage }
          emailTextErrorMessage = { emailTextErrorMessage }
          contactNumberTextErrorMessage = { contactNumberTextErrorMessage }
          relationshipTextErrorMessage = { relationshipTextErrorMessage }
          periodOfProfessionExperienceTextErrorMessage = { periodOfProfessionExperienceTextErrorMessage }
          occupationNameErrorMessage = { occupationNameErrorMessage }
          townTextErrorMessage = { townTextErrorMessage }
          cityTextErrorMessage = { cityTextErrorMessage }
          streetTextErrorMessage = { streetTextErrorMessage }
          floorTextErrorMessage = { floorTextErrorMessage }
          barangayTextErrorMessage = { barangayTextErrorMessage }
          districtTextErrorMessage = { districtTextErrorMessage }
          companyNameTextErrorMessage = { companyNameTextErrorMessage }
          buildingNameTextErrorMessage = { buildingNameTextErrorMessage }
          positionTextErrorMessage = { positionTextErrorMessage }

          addressText = { addressText }
          addressTextFunc = { (e) =>
            this.addressTextValidate(e) }
          fullNameText = { fullNameText }
          fullNameTextFunc = { (e) =>
            this.fullNameTextValidate(e) }
          emailText = { emailText }
          emailTextFunc = { (e) =>
            this.emailTextValidate(e) }
          contactNumberText = { contactNumberText }
          contactNumberTextFunc = { (e) =>
            this.contactNumberTextValidate(e) }
          relationshipText = { relationshipText }
          relationshipTextFunc = { (e) =>
            this.relationshipTextValidate(e) }
          periodOfProfessionExperienceText = { periodOfProfessionExperienceText }
          periodOfProfessionExperienceTextFunc = { (e) =>
            this.periodOfProfessionExperienceTextValidate(e) }
          positionText = { positionText }
          positionTextFunc = { (e) =>
            this.positionTextValidate(e) }
          companyNameText = { companyNameText }
          companyNameTextFunc = { (e) =>
            this.companyNameTextValidate(e) }
          floorText = { floorText }
          floorTextFunc = { (e) =>
            this.floorTextValidate(e) }
          buildingNameText = { buildingNameText }
          buildingNameTextFunc = { (e) =>
            this.buildingNameTextValidate(e) }
          streetText = { streetText }
          streetTextFunc = { (e) =>
            this.streetTextValidate(e) }
          districtText = { districtText }
          districtTextFunc = { (e) =>
            this.districtTextValidate(e) }
          barangayText = { barangayText }
          barangayTextFunc = { (e) =>
            this.barangayTextValidate(e) }
          cityText = { cityText }
          townText = { townText }
          cityTextFunc = { (e) => this.setState({ cityText : e })}
          townTextFunc = { (e) => this.setState({ townText : e }) }
          onEditSave = { () => this.postEditMode() }
          />
      }
      <div>
       <br/>
        <div className = { 'percentage-grid' }>
          <div>
            <h2 className = { 'header-margin-default text-align-left' }>Character Reference</h2>
            <h2>By nominating these persons as your personal character references, you provide consent that UnionBank of the Philippines may conduct a character reference check on your possible employment with the company. You also certify that the information you&#39;ve provided are true and correct</h2>
          </div>
          <Progress
            type = { 'circle' }
            height = { 65 }
            width = { 65 }
            percent = { percentage } />
          </div>
        <br/>
      </div>
      <div>
        <div className = { 'grid-global' } >
          <h2 className = { 'font-weight-bold' }>Character Reference</h2>
          <div className = { 'text-align-end' }>
            <GenericButton
              text = { 'ADD' }
              onClick = { () => this.setState({ showCharacterReferenceModal : true }) }
            />
          </div>
        </div>

        <br/>
        <div>
          {
            enabledLoader ?

            <center>
              <CircularLoader show = { enabledLoader }/>
            </center>

            :

            <div>
            {
              characterReferenceData.length > 0 ?
              <MullptipleCardComponent
                characterReferenceData = { characterReferenceData }
                onEditModeProperty = { (resp) => this.onEditModeProperty(resp)  }
                onDeleteProperty = { (id) => this.onDeleteProperty(id)  }
              />
              :
              <div>
                <br/>
                <center>
                  <h2 className = { 'font-weight-normal' }> No Character Reference </h2>
                </center>
                <br/>
              </div>
            }
            </div>
          }
        </div>
      </div>
    </div>
    )
  }
}

CharacterReferenceFragment.propTypes = {
  onSendPageNumberToView  : PropTypes.func,
}

export default ConnectView(CharacterReferenceFragment, Presenter)
