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

import * as func from './functions/CharacterReferenceFunctions'

class CharacterReferenceFragment extends BaseMVPView {
  constructor(props) {
    super(props)
    this.state = {
      showCharacterReferenceModal : false,
      showOccupationModal : false,
      occupationId : '',
      occupationName : '',
      characterReferenceData : [],
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
      barangayTextTextErrorMessage: '',
      streetText: '',
      streetTextErrorMessage: '',
      occupationNameErrorMessage: '',
      cityText: '',
      townText: '', 
    }
  }

  componentDidMount () {
    this.props.onSendPageNumberToView(5)
    this.presenter.getCharacterReference()
  }

  showCharacterReferenceMap (characterReferenceData) {
    this.setState({ characterReferenceData })
  }

  fullNameTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ fullNameText : validate })
  }

  relationshipTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ relationshipText : validate })
  }

  positionTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ positionText : validate })
  }

  companyNameTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ companyNameText : validate })
  }  

  floorTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ floorText : validate })
  }

  districtTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ districtText : validate })
  }
  
  barangayTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ barangayText : validate })
  }

  periodOfProfessionExperienceTextValidate (e) {
    const validate = func.checkedValidateText(e)
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
    const validate = func.checkedValidateText(e)
    this.setState({ addressText : validate })
  }

  streetTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ streetText : validate })
  }

  buildingNameTextValidate (e) {
    const validate = func.checkedValidateText(e)
    this.setState({ buildingNameText : validate })
  }

  validator (string) {
    return func.checkedValidateInput(string)
  }

  validatorEmail (string) {
    return func.checkValidateEmail(string)
  }

  postEditMode () {
    const {
      occupationId,
      occupationName,
      occupationNameErrorMessage,
      characterReferenceData,
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
      barangayTextTextErrorMessage,
      streetText,
      streetTextErrorMessage,
      districtText,
      districtTextErrorMessage,
      townText,
      cityText,
    } = this.state

    const filterEmail = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i
    this.presenter.postCharacterReference(
      occupationId, 
      fullNameText, 
      relationshipText, 
      periodOfProfessionExperienceText, 
      contactNumberText,
      company : {
        position: positionText,
        name: companyNameText,
        departmentFloor: floorText,
        buildingName:  buildingNameText,
        street: streetText,
        district: districtText,
        baranggay: barangayText,
        city: postCharacterReferenceParam.company.city,
        town: postCharacterReferenceParam.company.town
      })
    // if(!this.validator(fullNameText)) {
    //   this.setState({ fullNameTextErrorMessage : 'Fullname field is required' })
    // } else if (!this.validator(occupationName)) {
    //   this.setState({ occupationNameErrorMessage : 'Occupation field is required' }) 
    // } else if (occupationId === 0) {
    //     this.presenter.postCharacterReference(
    //       occupationId, 
    //       fullNameText, 
    //       relationshipText, 
    //       periodOfProfessionExperienceText, 
    //       contactNumberText,
    //       company : {
    //         id : occupationId,
    //         name: fullNameText,
    //         relationship : relationshipText,
    //         numberOfYearsKnown : periodOfProfessionExperienceText,
    //         contactNumber : contactNumberText,
    //         company : companyNameText,
    //       })
    //     console.log('test')
    // } else if (occupationId === 1) {
    //     this.presenter.postCharacterReference(
    //       occupationId, 
    //       fullNameText, 
    //       relationshipText, 
    //       periodOfProfessionExperienceText, 
    //       contactNumberText,
    //       company : {
    //         id : occupationId,
    //         name: fullNameText,
    //         relationship : relationshipText,
    //         numberOfYearsKnown : periodOfProfessionExperienceText,
    //         contactNumber : contactNumberText,
    //         company : companyNameText,
    //       })
    // } else if (occupationId === 2) {
    //   if(!this.validator(addressText)) {
    //     this.setState({ addressTextErrorMessage : 'Address field is required' })
    //   } else if (!filterEmail.test(emailText)) { 
    //     this.setState({ emailTextErrorMessage : 'Email is invalid (e.g test@gmail.com)' })
    //   } else if (!this.validator(contactNumberText)) {
    //     this.setState({ contactNumberTextErrorMessage: 'Contact number field is required'})
    //   } else {
    //     console.log('test')
    //     this.presenter.postCharacterReference(
    //       occupationId, 
    //       fullNameText, 
    //       relationshipText, 
    //       periodOfProfessionExperienceText, 
    //       contactNumberText,
    //       company : {})
    //   }
    // }
  }

  render() {
    const {
      history,
      percentage
    } = this.props

    const {
      showCharacterReferenceModal,
      showOccupationModal,
      occupationId,
      occupationName,
      occupationNameErrorMessage,
      characterReferenceData,
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
      barangayTextTextErrorMessage,
      streetText,
      streetTextErrorMessage,
      districtText,
      districtTextErrorMessage,
      townText,
      cityText
    } = this.state

    return (
    <div>
      { super.render() }
      {
        showCharacterReferenceModal &&
        <CharacterReferenceAddFormModal
          onSave = { () => this.postEditMode() }
          occupationName = { occupationName }
          occupationId = { occupationId }
          showOccupationModal = { showOccupationModal }
          showOccupationModalFunc = { () =>
            this.setState({ showOccupationModal : true }) }
          showRequiredFieldsFunc = { (occupationId, occupationName, showOccupationModal) =>
            this.setState({ occupationId, occupationName, showOccupationModal }) }
          onClose = { () =>
            this.setState({ showCharacterReferenceModal : false }) }

          fullNameTextErrorMessage = { fullNameTextErrorMessage }
          occupationNameErrorMessage = { occupationNameErrorMessage }
          addressTextErrorMessage = { addressTextErrorMessage }
          emailTextErrorMessage = { emailTextErrorMessage }
          contactNumberTextErrorMessage = { contactNumberTextErrorMessage }

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
          cityTextFunc = { (e) => this.setState({ cityText : e })}
          townText = { townText }
          townTextFunc = { (e) => this.setState({ townText : e }) }
          />
      }
      <div>
         <br/>
          <div className = { 'percentage-grid' }>
            <div>
              <h2 className = { 'header-margin-default text-align-left' }>Character Reference</h2>
              <h2>By nominating these persons as your personal character references, you provide consent that UnionBank of the Philippines may conduct a character reference check on your possible employment with the company. You also certify that the information you&#39;ve provided are true and corret</h2>
            </div>
            <Progress
              type = { 'circle' }
              height = { 100 }
              width = { 100 }
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
          <MullptipleCardComponent
            characterReferenceData = { characterReferenceData }
          />
      </div>
    </div>
    )
  }
}

CharacterReferenceFragment.propTypes = {
  history : PropTypes.object,
  onSendPageNumberToView  : PropTypes.func,
}

export default ConnectView(CharacterReferenceFragment, Presenter)
