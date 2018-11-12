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
import CalamityFormGenericModal from './modal/CalamityFormGenericModal'

import FormComponent from './components/CalamityFormCardComponent'
import { RequiredValidation } from '../../utils/validate'

import * as CalamityFunction from './function/CalamityFunction'

import moment from 'moment'

let id = 0

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

let indexCount = 0

class CalamityFragment extends BaseMVPView {

  constructor(props) {
    super(props)

    this.state={
      showConfirmation : false,
      showNoticeModal : false,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      showEditSubmitButton : false,
      showCalamityTypeModal: false,
      showErrorModal : false,
      showPropertyTypeModal: false,
      enabledLoader:false,
      showPropertyModal:false,
      updateMode:false,
      date: null,
      noticeResponse : null,
      calamityAssistance: [],
      attachmentArray: [],
      attachmentDefaultArray: [],
      attachmentsData: [],
      calamityType: [],
      defaultDamageProperty: [{
          name: `${'Damage Property ' + letters.charAt(indexCount) + '' + 1}`
        }
      ],
      damagePropertyCardHolder : [],
      calamityId: '',
      calamityName: '',
      preferredDate: '',
      propertyId: '',
      property: '',
      propertyErrorMessage: '',
      propertyDesc: '',
      propertyDescErrorMessage: '',
      propertyType: '',
      propertyTypeErrorMessage: '',
      acquisitionValue: '',
      acquisitionErrorMessage: '',
      estimatedCost: '',
      estimatedCostErrorMessage: '',
      data : '',
      calamityTypeErrorMessage: '',
      count : 2,
      propertyTypeValue : [ {id: 1, name: 'Replaceable'},
                            {id: 2, name: 'Irreplaceable'} ],
      editModeData: '',
      editedId : null,
    }
    this.validator = this.validator.bind(this)
  }

  validateAcquisitionFunc (value) {
    this.setState({ acquisitionValue: CalamityFunction.Number(value) })
  }

  validateEstimatedCostFunc (value) {
    CalamityFunction.MinMaxNumberValidation(value) ?
      this.setState({ estimatedCost: CalamityFunction.Number(value), estimatedCostErrorMessage : '' }) :
      this.setState({ estimatedCost: CalamityFunction.Number(value), estimatedCostErrorMessage: 'Estimated Repair Cost exceeds 30,000' })
  }

  changeDate(data) {
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

  setFileAttachmentsArray (attachmentDefaultArray) {
    this.setState({ attachmentDefaultArray })
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

  submitForm (id, date, damageProperty, attachmentArray) {

    let validateAttachments = false
    attachmentArray && attachmentArray.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    if (id === null || id === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'My Benefits',
          message: 'Type of Calamity is required',
          type: 'warning',
          duration: 2000
        })
      )
    } else if (date === null || date === '') {
      store.dispatch(NotifyActions.addNotify({
          title: 'My Benefits',
          message: 'Date of Occurence is required',
          type: 'warning',
          duration: 2000
        })
      )
    } else if (damageProperty === null || !damageProperty.length) {
      store.dispatch(NotifyActions.addNotify({
          title: 'My Benefits',
          message: 'Damage Property is required',
          type: 'warning',
          duration: 2000
        })
      )
    }else if (!attachmentArray.length) {
       store.dispatch(NotifyActions.addNotify({
          title : 'My Benefits' ,
          message : 'Attachments is required',
          type : 'warning',
          duration : 2000
        })
      )
    } else if (validateAttachments) {
      attachmentArray && attachmentArray.map(
        (attachment, key) => {
          if(!attachment.file) {
            store.dispatch(NotifyActions.addNotify({
               title : 'My Benefits',
               message : attachment.name + ' is required',
               type : 'warning',
               duration : 2000
             })
           )
          }
        }
      )
     } else {
     this.setState({ showEditSubmitButton : true })
   }
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
      showCalamityTypeModal,
      showPropertyTypeModal,
      showPropModal,
      calamityAssistance,
      enabledLoader,
      date,
      response,
      showConfirmation,
      data,
      attachmentArray,
      attachmentDefaultArray,
      attachmentsData,
      calamityId,
      calamityName,
      calamityType,
      preferredDate,
      propertyId,
      property,
      propertyErrorMessage,
      propertyDesc,
      propertyDescErrorMessage,
      propertyType,
      propertyTypeValue,
      propertyTypeErrorMessage,
      acquisitionValue,
      acquisitionErrorMessage,
      estimatedCost,
      estimatedCostErrorMessage,
      calamityTypeErrorMessage,
      showPropertyModal,
      defaultDamageProperty,
      count,
      damagePropertyCardHolder,
      editModeData,
      updateMode,
      editedId,
      showEditSubmitButton,
    }=this.state
    console.log(indexCount)
    const defaultDamagePropertyStatic = [
      {
        name: `${ 'Damage Property' + ' ' + letters.charAt(indexCount) + '' + count}`
      }
    ]

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
        showPropertyModal &&
        <CalamityFormGenericModal
          calamityId = { calamityId }
          editedId = { editedId }
          id = { id }
          incrementId = { () => ++id }
          damagePropertyCardHolder = { damagePropertyCardHolder }
          updateMode = { updateMode }
          editModeData = { editModeData }
          resetInstance = { () => this.setState({ defaultDamageProperty : defaultDamagePropertyStatic}) }
          propertyTypeValue = { propertyTypeValue }
          defaultDamageProperty = { defaultDamageProperty }
          showPropertyTypeModal = { showPropertyTypeModal }
          property = { property }
          propertyDesc = { propertyDesc }
          propertyType = { propertyType }
          acquisitionValue = { acquisitionValue }
          estimatedCost = { estimatedCost }
          propertyErrorMessage = { propertyErrorMessage }
          propertyTypeErrorMessage = { propertyTypeErrorMessage }
          propertyDescErrorMessage = { propertyDescErrorMessage }
          estimatedCostErrorMessage = { estimatedCostErrorMessage }
          acquisitionErrorMessage = { acquisitionErrorMessage }
          updateModeFunc = { (updateMode) => this.setState({ updateMode }) }
          propertyErrorMessageFunc = { (propertyErrorMessage) => this.setState({ propertyErrorMessage }) }
          propertyTypeErrorMessageFunc = { (propertyTypeErrorMessage) => this.setState({ propertyTypeErrorMessage }) }
          propertyDescErrorMessageFunc = { (propertyDescErrorMessage) => this.setState({ propertyDescErrorMessage }) }
          estimatedCostErrorMessageFunc = { (estimatedCostErrorMessage) => this.setState({ estimatedCostErrorMessage }) }
          acquisitionErrorMessageFunc = { (acquisitionErrorMessage) => this.setState({ acquisitionErrorMessage }) }
          propertyFunc = { (resp) => this.validatePropertyFunc(resp) }
          propertyDescFunc = { (resp) => this.validatePropertyDescFunc(resp) }
          acquisitionFunc = { (resp) => this.validateAcquisitionFunc(resp) }
          estimatedCostFunc = { (resp) => this.validateEstimatedCostFunc(resp) }
          requestPropertyTypeFunc = { (resp) => this.showPropertyTypeModal(resp) }
          setPropertyData = { (
              propertyId,
              propertyType,
              showPropertyTypeModal,
              propertyTypeErrorMessage) =>
            this.setState({
              propertyId,
              propertyType,
              showPropertyTypeModal,
              propertyTypeErrorMessage
            })
          }
          setAttachmentFunc = { (updatedAttachments) => this.setFileAttachmentsArray(updatedAttachments) }
          addAttachmentsFunc = { () => {
            const updatedAttachments = [...defaultDamageProperty]
            let newCount = count + 1
            this.setState({ count : newCount })
            updatedAttachments.push({
              name : `${ 'Damage Property ' +  letters.charAt(indexCount) + '' + count}`
            })
            this.setState({ defaultDamageProperty : updatedAttachments })
            }
          }
          count = { count }
          countFunc = { (count) => this.setState({ count }) }
          hideModalPropertyFormFunc = { (showPropertyModal) => this.setState({ showPropertyModal }) }
          hideModalPropertyTypeFunc = { (showPropertyTypeModal) => this.setState({ showPropertyTypeModal }) }
          updateDataPropertyHolderFunc = { (resp) => {
            this.setState({ damagePropertyCardHolder : resp })
          }}
          getPropertyHolderFunc = { (resp) => {
            const updatePropertyHolder = [...damagePropertyCardHolder]
            updatePropertyHolder.push(resp)
            this.setState({ damagePropertyCardHolder : updatePropertyHolder})
          }}
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
          showEditSubmitButton = { showEditSubmitButton }
          changeStateEditToFalse = { () => this.setState({ showEditSubmitButton : false }) }
          getOnClicked = { (id, date, damageProperty, attachmentArray) =>
            this.submitForm (
              id,
              date,
              damageProperty,
              attachmentArray
            )
          }
          onEditModeProperty = { (
            editedId,
            property,
            propertyDesc,
            propertyType,
            acquisitionValue,
            estimatedCost,
            defaultDamageProperty,
            showPropertyModal,
            updateMode) => this.setState({
              editedId,
              property,
              propertyDesc,
              propertyType,
              acquisitionValue,
              estimatedCost,
              defaultDamageProperty,
              showPropertyModal,
              updateMode,
             })
           }
          onClick = {
            (showConfirmation, data) => {
              this.confirmation(showConfirmation, data)
            }
          }
          onSubmit = {
            (id, date, damageProperty, attachmentArray) =>
            this.presenter.addCalamityAssistance (
              id,
              date,
              damageProperty,
              attachmentArray
            )
          }
          damagePropertyCardHolder = { damagePropertyCardHolder }
          calamityAssistance={ calamityAssistance }
          attachmentsData = { attachmentsData }
          defaultDamageProperty = { defaultDamageProperty }
          calamityId = { calamityId }
          calamityName={ calamityName }
          calamityType = { calamityType }
          preferredDate = { preferredDate }
          handleChangeDate = { (resp) => this.changeDate(resp) }
          requestCalamityTypeFunc = { (resp) => this.showCalamityTypeModal(resp) }
          onShowPropertyFormModalFunc = { () => {
            this.setState({
             property : '',
             propertyDesc : '',
             propertyType : '',
             acquisitionValue : '',
             estimatedCost : '',
             defaultDamageProperty : defaultDamageProperty,
             showPropertyModal : true,
             updateMode : false,
             })
             indexCount = indexCount + 1
            }
          }
          setAttachmentDefaultyFunc = { (attachmentDefaultArray) => this.setFileAttachments(attachmentDefaultArray) }
          setCardHolderDefaultyFunc = { (damagePropertyCardHolder) => this.setState({ damagePropertyCardHolder }) }
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
