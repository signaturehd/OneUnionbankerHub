import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MaternityAssistancePresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal,
  MultipleInputModal,
  Line,
  Modal,
  GenericButton
} from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
import MaternityTypeOfDeliveryModals from './modals/MaternityTypeOfDeliveryModals'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/MaternityAssistanceFormCardComponent'
import FormComponentSSS from './components/MaternityAssistanceSSSFormCardComponent'

import * as MaternityAssistanceFunction from
'./function/MaternityAssistanceFunction'

import moment from 'moment'

class MaternityAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super (props)
      this.state = {
        showConfirmationModal : false,
        showNoticeModal : false,
        showNoticeResponseModal : false,
        enabledLoader : false,
        showTypeOfDeliveryModalResp: false,
        showEditSubmitButton: false,
        titleChange: true,
        showBenefitFeedbackModal : false,
        respMat1Confirmation: '',
        attachmentsData: [],
        maternityData : [],
        attachmentArray: [],
        typeOfDeliveryData : [],
        typeDeliveryId: '',
        typeDeliveryName: '',
        typeOfDeliveryLimit: '',
        amount: '',
        orNumberText: '',
        preferredDate: '',
        deliveryDate: '',
        noticeResponse : '',
        attachmentErrorMessage: '',
        dateErrorMessage: '',
        orNumberErrorMessage: '',
        amountErrorMessage : '',
        typeOfDeliveryErrorMessage : '',
        dateOfDeliveryErrorMessage : '',
        roomNumberText: '',
        roomNumberErrorMessage: '',
        houseNumberText: '',
        houseNumberErrorMessage: '',
        streetNameText : '',
        streetNameErrorMessage : '',
        streetNameFunc : '',
        barangayText : '',
        barangayErrorMessage : '',
        barangayFunc : '',
        cityText : '',
        cityErrorMessage : '',
        cityFunc: '',
        provinceText : '',
        provinceErrorMessage : '',
        provinceFunc: '',
        zipCodeText : '',
        zipCodeErrorMessage : '',
        zipCodeFunc: '',
        noPregnancyText : '',
        noPregnancyErrorMessage: '',
        noPregnancyFunc : '',
        noDeliveryText : '',
        noDeliveryErrorMessage: '',
        noDeliveryFunc : '',
        noMiscarriageText : '',
        noMiscarriageErrorMessage: '',
        noMiscarriageFunc: ''
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateMaternityAssistance()
  }

  confirmationMat1Response (resp) {
    this.setState({ showConfirmationModal : resp })
  }

  showConfirmationModal (respMat1Confirmation) {
    this.setState({ respMat1Confirmation })
  }

  noticeOfUndertaking (noticeResponse) {
   this.setState({ showNoticeModal : true, noticeResponse })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  showValidatedMaternity (maternityData) {
    this.setState({ maternityData })
  }

  showAttachmentsMap (attachmentsData) {
    this.setState({ attachmentsData })
  }

  showTypeOfDeliveryMap (typeOfDeliveryData) {
    this.setState({ typeOfDeliveryData })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/medical')
  }

  showTypeOfDeliveryModal (showTypeOfDeliveryModalResp) {
    this.setState({ showTypeOfDeliveryModalResp })
  }

  setFileAttachments (attachmentArray) {
    this.setState({ attachmentArray })
  }

  validateAmount (e) {
    const {
      typeOfDeliveryLimit,
      amount
    } = this.state

    const validate = MaternityAssistanceFunction.checkedAmount(e)
    if(parseInt(validate) > parseInt(typeOfDeliveryLimit)) {
      this.setState({ amountErrorMessage : `reimbursable amount should not exceed to ${ typeOfDeliveryLimit }` })
    } else {
      this.setState({ amount : validate, amountErrorMessage : '' })
    }
  }

  validateSymbol (e) {
    const validate = MaternityAssistanceFunction.checkedValidateSymbol(e)
    this.setState({ orNumberText : validate.toUpperCase(), orNumberErrorMessage : '' })
  }

  validateDate (e) {
    const validate = MaternityAssistanceFunction.checkedMDYDate(e)
    this.setState({ preferredDate : validate, dateErrorMessage : '' })
  }

  validateDeliveryDate (e) {
    const validate = MaternityAssistanceFunction.checkedMDYDate(e)
    this.setState({ deliveryDate : validate, dateOfDeliveryErrorMessage : '' })
  }

  validateRequired (e) {
    return MaternityAssistanceFunction.checkedValidateInput(e)
  }

  validateRequiredRoomNumber (e) {
    const validate = MaternityAssistanceFunction.checkedValidateInputNumber(e)
    this.setState({ roomNumberText : validate, roomNumberErrorMessage : '' })
  }

  validateRequiredHouseNumber (e) {
    const validate = MaternityAssistanceFunction.checkedValidateInputNumber(e)
    this.setState({ houseNumberText : validate, houseNumberErrorMessage : '' })
  }

  validateRequiredAddress (e) {
    const validate = MaternityAssistanceFunction.checkedValidateAddress(e)
    this.setState({ streetNameText : validate, streetNameErrorMessage : '' })
  }

  validateRequiredSubdivision (e) {
    const validate = MaternityAssistanceFunction.checkedValidateAddress(e)
    this.setState({ subdivisionText : validate, subdivisionTextErrorMessage : '' })
  }

  validateRequiredBarangay (e) {
    const validate = MaternityAssistanceFunction.checkedValidateAddress(e)
    this.setState({ barangayText : validate, barangayErrorMessage : '' })
  }

  validateRequiredCity (e) {
    const validate = MaternityAssistanceFunction.checkedValidateText(e)
    this.setState({ cityText : validate, cityErrorMessage : '' })
  }

  validateRequiredProvince (e) {
    const validate = MaternityAssistanceFunction.checkedValidateText(e)
    this.setState({ provinceText : validate, provinceErrorMessage : '' })
  }

  validateRequiredZipCode (e) {
    const validate = MaternityAssistanceFunction.checkedValidateInputNumber(e)
    this.setState({ zipCodeText : validate, zipCodeErrorMessage : '' })
  }

  validateRequiredNoPregnancy (e) {
    const validate = MaternityAssistanceFunction.checkedValidateInputNumber(e)
    this.setState({ noPregnancyText : validate, noPregnancyErrorMessage : '' })
  }

  validateRequiredNoDelivery (e) {
    const validate = MaternityAssistanceFunction.checkedValidateInputNumber(e)
    this.setState({ noDeliveryText : validate, noPregnancyErrorMessage : '' })
  }

  validateRequiredNoMiscarriage (e) {
    const validate = MaternityAssistanceFunction.checkedValidateInputNumber(e)
    this.setState({ noMiscarriageText : validate, noMiscarriageErrorMessage : '' })
  }

  editFormReview (e) {
    this.setState({ showEditSubmitButton : false, titleChange : true })
  }

  submitForm () {
    const {
      typeDeliveryId,
      deliveryDate,
      amount,
      preferredDate,
      orNumberText,
      attachmentArray
    } = this.state
    this.presenter.addMaternityAssistance(
      typeDeliveryId,
      moment(deliveryDate).format('MM/DD/YYYY'),
      amount,
      moment(preferredDate).format('MM/DD/YYYY'),
      orNumberText,
      attachmentArray)
  }

  showFormReviewFieldDisabled () {
    const {
      typeDeliveryName,
      deliveryDate,
      amount,
      preferredDate,
      orNumberText,
      attachmentArray
    } = this.state

    if(!this.validateRequired(typeDeliveryName)){
      this.setState({ typeOfDeliveryErrorMessage : 'Please provide the type of delivery' })
    } else if (!this.validateRequired(deliveryDate)) {
      this.setState({ dateOfDeliveryErrorMessage : 'Please provide the date of delivery' })
    } else if (!this.validateRequired(amount)) {
      this.setState({ amountErrorMessage : 'Please enter an amount' })
    } else if (!this.validateRequired(preferredDate)) {
      this.setState({ dateErrorMessage : 'Please provide the Official Receipt Date' })
    } else if (!this.validateRequired(orNumberText)) {
      this.setState({ orNumberErrorMessage : 'Please provide the Official Receipt Number' })
    } else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
      })
    }
  }

  showFormReviewFieldDisabledSSS () {
    const {
      roomNumberText,
      houseNumberText,
      streetNameText,
      subdivisionText,
      barangayText,
      cityText,
      provinceText,
      zipCodeText,
      noPregnancyText,
      deliveryDate,
      noDeliveryText,
      noMiscarriageText,
    } = this.state

    if(!this.validateRequired(roomNumberText)){
      this.setState({ roomNumberErrorMessage : 'Field is required' })
    } else if (!this.validateRequired(houseNumberText)) {
      this.setState({ houseNumberErrorMessage : 'Field is required' })
    } else if (!this.validateRequired(streetNameText)) {
      this.setState({ streetNameErrorMessage : 'Street name field is required' })
    } else if (!this.validateRequired(subdivisionText)) {
      this.setState({ subdivisionErrorMessage : 'Subdivision field is required' })
    } else if (!this.validateRequired(barangayText)) {
      this.setState({ barangayErrorMessage : 'Barangay field is required' })
    } else if (!this.validateRequired(provinceText)) {
      this.setState({ provinceErrorMessage : 'Province field is required' })
    } else if (!this.validateRequired(zipCodeText)) {
      this.setState({ zipCodeErrorMessage : 'Zip Code field is required' })
    } else if (!this.validateRequired(noPregnancyText)) {
      this.setState({ noPregnancyErrorMessage : 'No of Pregnancy field is required' })
    } else if (!this.validateRequired(deliveryDate)) {
      this.setState({ dateOfDeliveryErrorMessage : 'Date of delivery is required' })
    } else if (!this.validateRequired(noDeliveryText)) {
      this.setState({ noDeliveryErrorMessage : 'Number of delivery is required' })
    } else if (!this.validateRequired(noMiscarriageText)) {
      this.setState({ noMiscarriageErrorMessage : 'Number of Miscarriage is required' })
    } else {
      this.setState({
        showEditSubmitButton: true,
        titleChange: false,
      })
    }
  }

  submitFormSSS () {
    const {
      roomNumberText,
      houseNumberText,
      streetNameText,
      subdivisionText,
      barangayText,
      cityText,
      provinceText,
      zipCodeText,
      noPregnancyText,
      deliveryDate,
      noDeliveryText,
      noMiscarriageText,
    } = this.state

    this.presenter.addMaternityAssistanceSSS(
      roomNumberText,
      houseNumberText,
      streetNameText,
      subdivisionText,
      barangayText,
      cityText,
      provinceText,
      zipCodeText,
      noPregnancyText,
      moment(deliveryDate).format('MM/DD/YYYY'),
      noDeliveryText,
      noMiscarriageText)
  }

  render () {
    const {
      respMat1Confirmation,
      showConfirmationModal,
      showNoticeModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showTypeOfDeliveryModalResp,
      enabledLoader,
      maternityData,
      attachmentsData,
      typeOfDeliveryData,
      typeDeliveryId,
      typeDeliveryName,
      orNumberText,
      preferredDate,
      deliveryDate,
      noticeResponse,
      amount,
      attachmentArray,
      showEditSubmitButton,
      titleChange,
      attachmentErrorMessage,
      dateErrorMessage,
      amountErrorMessage,
      orNumberErrorMessage,
      typeOfDeliveryErrorMessage,
      dateOfDeliveryErrorMessage,
      roomNumberText,
      roomNumberErrorMessage,
      houseNumberText,
      houseNumberErrorMessage,
      streetNameText,
      streetNameErrorMessage,
      streetNameFunc,
      subdivisionText,
      subdivisionErrorMessage,
      subdivisionFunc,
      barangayText,
      barangayErrorMessage,
      barangayFunc,
      cityText,
      cityErrorMessage,
      cityFunc,
      provinceText,
      provinceErrorMessage,
      provinceFunc,
      zipCodeText,
      zipCodeErrorMessage,
      zipCodeFunc,
      noPregnancyText,
      noPregnancyErrorMessage,
      noPregnancyFunc,
      noDeliveryText,
      noDeliveryErrorMessage,
      noDeliveryFunc,
      noMiscarriageText,
      noMiscarriageErrorMessage,
      noMiscarriageFunc
    } = this.state

    const {
      selectedArray,
      classProp
    } = this.props

    return (
      <div>
        {
          showConfirmationModal &&
          <Modal>
            <center>
              <h2>{ respMat1Confirmation }</h2>
              <br/>
              <GenericButton
                text = { 'Ok' }
                onClick = { () => {
                  this.setState({ showConfirmationModal : false })
                  this.navigate()
                }}
                />
            </center>
          </Modal>
        }
        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '9' }
            onDismiss={ (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
          />
        }
        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose={ () => {
              this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
            }}
            noticeResponse={ noticeResponse }
          />
        }
        {
          showBenefitFeedbackModal &&
          <BenefitFeedbackModal
            benefitId={ '9' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/medical'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }
        {
          showTypeOfDeliveryModalResp &&
          <MaternityTypeOfDeliveryModals
            label = { 'Type of Delivery' }
            inputArray = { typeOfDeliveryData && typeOfDeliveryData }
            selectedArray = { (typeDeliveryId, typeDeliveryName, typeOfDeliveryLimit) =>
              this.setState({
                typeDeliveryId,
                typeDeliveryName,
                typeOfDeliveryLimit,
                showTypeOfDeliveryModalResp : false,
                typeOfDeliveryErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showTypeOfDeliveryModalResp : false }) }
          />
        }
        <div>
          {
          enabledLoader ?
            <center className = { 'circular-loader-center' }>
              <CircularLoader show = { true }/>
            </center> :
            <div>
            <i
              className = { 'back-arrow' }
              onClick = { this.navigate.bind(this) }>
            </i>
            {
              titleChange ?
              <div>
                <h2 className = { 'header-margin-default' }>
                  { maternityData &&
                    maternityData.hasMat1 === 1 ?
                    'Maternity Assistance' :
                    'Maternity Notification SSS' }
                </h2>
              </div>
              :
              <div>
                <h2 className = { 'header-margin-default' }>
                  Form Summary
                </h2>
              </div>
            }
            {
              maternityData &&
              maternityData.hasMat1 === 1 ?
              <FormComponent
                recipient = { maternityData.recepient }
                oRNumberFunc = { (resp) => this.validateSymbol(resp) }
                dateFunc = { (resp) => this.validateDate(resp) }
                showFormReview = { () => this.showFormReviewFieldDisabled() }
                setAttachmentArrayFunc = { (updatedAttachments) => this.setFileAttachments(updatedAttachments) }
                onSubmitFunc = { () => this.submitForm() }
                editFormDataFunc = { () => this.editFormReview() }
                requestTypeOfDeliveryFunc = { (resp) => this.showTypeOfDeliveryModal(resp) }
                dateOfDelivertFunc = { (resp) => this.validateDeliveryDate(resp) }
                desiredAmountFunc = { (resp) => this.validateAmount(resp) }
                typeDeliveryName = { typeDeliveryName }
                amount = { amount }
                orNumberText = { orNumberText }
                preferredDate = { preferredDate }
                deliveryDate = { deliveryDate }
                attachmentsData = { attachmentsData }
                showEditSubmitButton = { showEditSubmitButton }
                attachmentErrorMessage = { attachmentErrorMessage }
                dateErrorMessage = { dateErrorMessage }
                orNumberErrorMessage = { orNumberErrorMessage }
                amountErrorMessage = { amountErrorMessage }
                typeOfDeliveryErrorMessage = { typeOfDeliveryErrorMessage }
                dateOfDeliveryErrorMessage = { dateOfDeliveryErrorMessage }
              /> :
              <FormComponentSSS
                recipient = { maternityData.recepient }
                dateFunc = { (resp) => this.validateDate(resp) }
                showFormReviewSSS = { () => this.showFormReviewFieldDisabledSSS() }
                onSubmitFuncSSS = { () => this.submitFormSSS() }
                editFormDataFunc = { () => this.editFormReview() }
                dateOfDelivertFunc = { (resp) => this.validateDeliveryDate(resp) }
                deliveryDate = { deliveryDate }
                showEditSubmitButton = { showEditSubmitButton }
                dateErrorMessage = { dateErrorMessage }
                dateOfDeliveryErrorMessage = { dateOfDeliveryErrorMessage }
                roomNumberText = { roomNumberText }
                roomNumberErrorMessage = { roomNumberErrorMessage }
                roomNumberFunc = { (resp) => this.validateRequiredRoomNumber(resp) }
                houseNumberText = { houseNumberText }
                houseNumberErrorMessage = { houseNumberErrorMessage }
                houseNumberFunc = { (resp) => this.validateRequiredHouseNumber(resp) }
                streetNameText = { streetNameText }
                streetNameErrorMessage = { streetNameErrorMessage }
                streetNameFunc = { (resp) => this.validateRequiredAddress(resp) }
                subdivisionText = { subdivisionText }
                subdivisionErrorMessage = { subdivisionErrorMessage }
                subdivisionFunc = { (resp) => this.validateRequiredSubdivision(resp) }
                barangayText = { barangayText }
                barangayErrorMessage = { barangayErrorMessage }
                barangayFunc = { (resp) => this.validateRequiredBarangay(resp) }
                cityText = { cityText }
                cityErrorMessage = { cityErrorMessage }
                cityFunc = { (resp) => this.validateRequiredCity(resp) }
                provinceText = { provinceText }
                provinceErrorMessage = { provinceErrorMessage }
                provinceFunc = { (resp) => this.validateRequiredProvince(resp) }
                zipCodeText = { zipCodeText }
                zipCodeErrorMessage = { zipCodeErrorMessage }
                zipCodeFunc = { (resp) => this.validateRequiredZipCode(resp) }
                noPregnancyText = { noPregnancyText }
                noPregnancyErrorMessage = { noPregnancyErrorMessage }
                noPregnancyFunc = { (resp) => this.validateRequiredNoPregnancy(resp) }
                noDeliveryText = { noDeliveryText }
                noDeliveryErrorMessage = { noDeliveryErrorMessage }
                noDeliveryFunc = { (resp) => this.validateRequiredNoDelivery(resp) }
                noMiscarriageText = { noMiscarriageText }
                noMiscarriageErrorMessage = { noMiscarriageErrorMessage }
                noMiscarriageFunc = { (resp) => this.validateRequiredNoMiscarriage(resp) }
              />
            }
          </div>
          }
        </div>
      </div>
    )
  }
}

MaternityAssistanceFragment.propTypes = {
  selectedArray : PropTypes.func,
  classProp : PropTypes.string,
}

export default ConnectView(MaternityAssistanceFragment, Presenter)
