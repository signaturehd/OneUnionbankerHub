import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/MaternityAssistancePresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal,
  MultipleInputModal,
} from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import store from '../../store'
import { NotifyActions } from '../../actions'

import FormComponent from './components/MaternityAssistanceFormCardComponent'

import * as MaternityAssistanceFunction from
'./function/MaternityAssistanceFunction'

import moment from 'moment'

class MaternityAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super (props)
      this.state = {
        showNoticeModal : false,
        showNoticeResponseModal : false,
        enabledLoader : false,
        showTypeOfDeliveryModalResp: false,
        showEditSubmitButton: false,
        titleChange: true,
        showBenefitFeedbackModal : false,
        attachmentsData: [],
        maternityData : [],
        attachmentArray: [],
        typeOfDeliveryData : [],
        typeDeliveryId: '',
        typeDeliveryName: '',
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
    }
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateMaternityAssistance()
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
    const validate = MaternityAssistanceFunction.checkedAmount(e)
    this.setState({ amount : validate, amountErrorMessage : '' })
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
      orNumberText.toString(),
      moment(preferredDate).format('MM/DD/YYYY'),
      attachmentArray)
  }

  showFormReviewFieldDisabled (e) {
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

  render () {
    const {
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
      dateOfDeliveryErrorMessage
    } = this.state

    const {
      selectedArray,
      classProp
    } = this.props

    return (
      <div>
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
          <SingleInputModal
            label = { 'Dependents' }
            inputArray = { typeOfDeliveryData && typeOfDeliveryData }
            selectedArray = { (typeDeliveryId, typeDeliveryName) =>
              this.setState({
                typeDeliveryId,
                typeDeliveryName,
                showTypeOfDeliveryModalResp : false,
                typeOfDeliveryErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showTypeOfDeliveryModalResp : false }) }
          />
        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          {
            titleChange ?
            <h2 className = { 'header-margin-default' }>
              Maternity Assistance
            </h2>
            :
            <h2 className = { 'header-margin-default' }>
              Form Summary
            </h2>
          }
        </div>
        {
          enabledLoader ?
          <center className = { 'circular-loader-center' }>
            <CircularLoader show = { true }/>
          </center> :
          <FormComponent
            oRNumberFunc = { (resp) => this.validateSymbol(resp) }
            dateFunc = { (resp) => this.validateDate(resp) }
            showFormReview = { (resp) => this.showFormReviewFieldDisabled(resp) }
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
          />
        }
      </div>
    )
  }
}

MaternityAssistanceFragment.propTypes = {
  selectedArray : PropTypes.func,
  classProp : PropTypes.string,
}

export default ConnectView(MaternityAssistanceFragment, Presenter)
