import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ConnectView from '../../utils/ConnectView'
import Presenter from './presenter/CalamityPresenter'
import BaseMVPView from '../common/base/BaseMVPView'

import {
  CircularLoader,
  SingleInputModal,
  MultipleInputModal
} from '../../ub-components/'

import store from '../../store'
import { NotifyActions } from '../../actions'

import { format } from './../../utils/numberUtils'

import CalamityModal from './modal/CalamityModal'
import CalamityReviewModal from './modal/CalamityReviewModal'
import PropertyTypeModal from './modal/PropertyTypeModal'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import ConfirmationModal from './modal/CalamityReviewModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'

import FormComponent from './components/CalamityFormCardComponent'
import { RequiredValidation } from '../../utils/validate'

import * as CalamityFunction from './function/CalamityFunction'

class CalamityFragment extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state={
      showConfirmation : false,
      showNoticeModal : false,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      showEditSubmitButton : false,
      showReviewCalamityModal: false,
      showCalamityTypeModal: false,
      showErrorModal : false,
      showPropertyTypeModal: false,
      showModal: false,
      enabledLoader:false,
      calamityAssistance: [],
      attachmentArray: [],
      attachmentsData: [],
      calamityType: [],
      calamityId: '',
      calamityName: '',
      preferredDate: '',
      propertyId: '',
      property: '',
      propertyDesc: '',
      propertyType: '',
      acquisitionValue: '',
      estimatedCost: '',
      data : '',
      calamityTypeErrorMessage: '',
      estimatedCostErrorMessage: '',
      date: null,
      noticeResponse : null,
      propertyTypeValue : [ {id: 1, name: 'Replaceable'},
                            {id: 2, name: 'Irreplaceable'} ]
    }
    this.validator = this.validator.bind(this)
    this.handleChange=this.handleChange.bind(this)
  }

  validateAcquisitionFunc (value) {
    this.setState({ acquisitionValue: CalamityFunction.Number(value) })
  }

  validateEstimatedCostFunc (value) {
    CalamityFunction.MinMaxNumberValidation(value) ?
      this.setState({ estimatedCost: CalamityFunction.Number(value), estimatedCostErrorMessage : '' }) :
      this.setState({ estimatedCost: CalamityFunction.Number(value), estimatedCostErrorMessage: 'Estimated Repair Cost exceeds 30,000' })
  }

  handleChange(data) {
    this.setState({ preferredDate: data })
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateCalamityAssistance()
  }

  showAttachmentsMap (attachmentsData) {
    this.setState({ attachmentsData })
  }

  setFileAttachments (attachmentArray) {
    this.setState({ attachmentArray })
  }

  showValidatedMaternity (calamityAssistance) {
    this.setState({ calamityAssistance })
  }

  validatePropertyFunc (value) {
    this.setState({ property: CalamityFunction.symbolValidation(value) })
  }

  validatePropertyDescFunc (value) {
    this.setState({ propertyDesc: CalamityFunction.symbolValidation(value) })
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showCalamityTypeMap (calamityType) {
    this.setState({ calamityType })
  }

  showCalamityTypeModal (showCalamityTypeModal) {
   this.setState({ showCalamityTypeModal })
  }

  showPropertyTypeModal (showPropertyTypeModal) {
   this.setState({ showPropertyTypeModal })
  }

  confirmation (showConfirmation, data) {
    if (!this.validator(data.calamityType)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Calamity Type field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.preferredDate)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Date of Occurrence field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.property)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Property field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.propertyDesc)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Property description field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.propertyType)) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Property Type field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.acquisitionValue) || data.acquisitionValue==0) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Acquisition Value field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else if (!this.validator(data.estimatedCost) || data.estimatedCost==0) {
      store.dispatch(NotifyActions.addNotify({
         title : 'Calamity Assistance' ,
         message : 'Please provide information to Estimated Cost field',
         type : 'warning',
         duration : 2000
       })
     )
    }
    else {
      this.setState({ showConfirmation, data })
    }
  }

  submitForm (data) {
    this.presenter.addCalamityAssistance(
      data.calamityId,
      data.preferredDate.format('MM/DD/YYYY'),
      data.property,
      data.propertyDesc,
      data.propertyType,
      data.acquisitionValue,
      data.estimatedCost,
      data.fileBC,
      data.fileDP
    )
  }

  setValidateCalamityAssistance(calamityAssistance) {
    this.setState({ calamityAssistance })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  noticeOfUndertaking (noticeResponse) {
  this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits')
  }

  render () {
    const {
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showReviewCalamityModal,
      showCalamityTypeModal,
      showPropertyTypeModal,
      showPropModal,
      showModal,
      calamityAssistance,
      enabledLoader,
      date,
      response,
      showConfirmation,
      data,
      attachmentArray,
      attachmentsData,
      calamityId,
      calamityName,
      calamityType,
      preferredDate,
      propertyId,
      property,
      propertyDesc,
      propertyType,
      propertyTypeValue,
      acquisitionValue,
      estimatedCost,
      calamityTypeErrorMessage,
      estimatedCostErrorMessage
    }=this.state

    return (
      <div>
      {
        showConfirmation &&
        <ConfirmationModal
          data = { data }
          submitForm = { (data) =>
            this.submitForm(data) }
          onClose = { () => this.setState({ showConfirmation : false }) }
        />
      }

      {
        showNoticeModal &&
        <NoticeModal
          onClose={ () => this.setState({ showNoticeModal : false })}
          noticeResponse={ noticeResponse }
          benefitId={ '22' }
          onDismiss={ (showNoticeModal, response) =>
            this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
        />
      }

      {
        showNoticeResponseModal &&
        <ResponseModal
          onClose={ () => {
            this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
          }}
          noticeResponse={ response }
        />
      }

      {
        showBenefitFeedbackModal &&
        <BenefitFeedbackModal
          benefitId={ '22' }
          onClose={ () => {
            this.props.history.push('/mybenefits/benefits'),
            this.setState({ showBenefitFeedbackModal : false })
          }}
        />
      }

        {
          showCalamityTypeModal &&
          <SingleInputModal
            label = { 'Type of Calamity' }
            inputArray = { calamityType && calamityType }
            selectedArray = { (calamityId, calamityName) =>
              this.setState({
                calamityId,
                calamityName,
                showCalamityTypeModal : false,
                calamityTypeErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showCalamityTypeModal : false }) }
          />
        }

        {
          showPropertyTypeModal &&
          <SingleInputModal
            label = { 'Property Type' }
            inputArray = { propertyTypeValue && propertyTypeValue }
            selectedArray = { (propertyId, propertyType) =>
              this.setState({
                propertyId,
                propertyType,
                showPropertyTypeModal : false,
                propertyTypeErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showPropertyTypeModal : false }) }
          />
        }

          {
            showReviewCalamityModal &&
            <CalamityReviewModal
              calamityId={ calamityId }
              calamityName={ calamityName }
              preferredDate={ preferredDate }
              property={ property }
              propertyDesc={ propertyDesc }
              propertyType={ propertyType }
              acquisitionValue={ acquisitionValue }
              estimatedCost={ estimatedCost }

              onCancel={  () => this.setState({ showReviewCalamityModal : false })  }
              onClose={ () => this.setState({ showReviewCalamityModal : false }) }

              onClick={ () => this.onGetClicked(
                calamityId,
                calamityType,
                preferredDate,
                property,
                propertyDesc,
                propertyType,
                acquisitionValue,
                estimatedCost,

                )
              }
              onClose={
                () => {
                  this.setState({ showReviewCalamityModal : false })
                }
              }
            />
          }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Calamity Assistance Form
          </h2>
        </div>
        {
          enabledLoader ?
           <center className={ 'circular-loader-center' }>
             <CircularLoader show={ this.state.enabledLoader }/>
           </center> :
          <FormComponent
            onClick = {
              (showConfirmation, data) => {
                this.confirmation(showConfirmation, data)
              }
            }
            calamityAssistance={ calamityAssistance }
            attachmentsData = { attachmentsData }
            calamityId = { calamityId }
            calamityName={ calamityName }
            calamityType = { calamityType }
            preferredDate = { preferredDate }
            property = { property }
            propertyDesc = { propertyDesc }
            propertyType = { propertyType }
            acquisitionValue = { acquisitionValue }
            estimatedCost = { estimatedCost }
            calamityTypeErrorMessage = { calamityTypeErrorMessage }
            estimatedCostErrorMessage = { estimatedCostErrorMessage }
            propertyFunc = { (resp) => this.validatePropertyFunc(resp) }
            propertyDescFunc = { (resp) => this.validatePropertyDescFunc(resp) }
            acquisitionFunc = { (resp) => this.validateAcquisitionFunc(resp) }
            estimatedCostFunc = { (resp) => this.validateEstimatedCostFunc(resp) }
            handleChange = { (resp) => this.handleChange(resp) }
            requestCalamityTypeFunc = { (resp) => this.showCalamityTypeModal(resp) }
            requestPropertyTypeFunc = { (resp) => this.showPropertyTypeModal(resp) }
            setAttachmentArrayFunc = { (updatedAttachments) => this.setFileAttachments(updatedAttachments) }
            getPreferredDate = { data =>
              this.setState({ date :  data })}

              getFormData={ (
                calamityId,
                calamityType,
                preferredDate,
                property,
                propertyDesc,
                propertyType,
                acquisitionValue,
                estimatedCost,
                fileBC,
                fileDP,
                imgPrevBC,
                imgPrevDP
              ) => this.confirmation(
                calamityId,
                calamityType,
                preferredDate,
                property,
                propertyDesc,
                propertyType,
                acquisitionValue,
                estimatedCost,
                fileBC,
                fileDP,
                imgPrevBC,
                imgPrevDP
                )
              }
          />
        }
      </div>
    )
  }
}


export default ConnectView(CalamityFragment, Presenter)
