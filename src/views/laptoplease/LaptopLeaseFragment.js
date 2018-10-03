import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/LaptopLeasePresenter'
import ConnectView from '../../utils/ConnectView'

import * as LaptopLeaseFunctions from './functions/LaptopLeaseFunctions'

import {
  CircularLoader,
  SingleInputModal,
  Modal,
  GenericInput,
  GenericButton,
} from '../../ub-components/'

import { RequiredValidation } from '../../utils/validate/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import BenefitFeedbackModal from '../benefitsfeedback/BenefitFeedbackModal'
// import CarDealerQuotation from './modals/CarDealerQuotationModal'

import FormComponent from './components/LaptopLeaseCardComponent'
import moment from 'moment'
import store from '../../store'
import { NotifyActions } from '../../actions'

class LaptopLeaseFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeModal : false,
      showNoticeResponseModal : false,
      showFileUpload: false,
      showQuotation: true,
      noticeResponse : null,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      showLaptopBrands: false,
      showEnterSolRCModal: false,
      showInsurancePaymentModal: false,
      showEditMode: false,
      carValidate: [],
      deliveryData: [],
      loanType: 15,
      leaseMode: 1,
      carBrand: '',
      carId: '',
      laptopModel: '',
      screenSize: '',
      primaryColor: '',
      secondaryColor: '',
      file: [],
      solRC: '',
      solId: '',
      solIdErrorMessage: '',
      solRCInput: '',
      insurancePayment: '',
      insuranceId: '',
      solRCErrorMessage : '',
      yearErrorMessage : '',
      attachmentsRequired : [ {name : 'Dealer Quotations'}]
    }
    this.sendFormData = this.sendFormData.bind(this)
    this.validator = this.validator.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateLaptopLease()
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showLaptopLeaseValidate (laptopValidate) {
    this.setState({ laptopValidate })
  }

  setFileAttachments (file) {
    this.setState({ file })
  }

  validateSolRC (e) {
    const validate = LaptopLeaseFunctions.checkedValidateInputNumber(e)
    this.setState({ solRC : validate, solRCErrorMessage : '' })
  }

  validateSolId (e) {
    const validate = LaptopLeaseFunctions.checkedValidateInputNumber(e)
    this.setState({ solId : validate, solIdErrorMessage : '' })
  }

  validateInputLaptopModelValue (e) {
    const validate = LaptopLeaseFunctions.checkedValidatedInput(e)
    this.setState({ laptopModel : validate })
  }

  validateInputPrimaryColor (e) {
    const validate = LaptopLeaseFunctions.checkedValidateAlphabet(e)
    this.setState({ primaryColor : validate })
  }

  validateInputSecondaryColor (e) {
    const validate = LaptopLeaseFunctions.checkedValidateAlphabet(e)
    this.setState({ secondaryColor : validate })
  }

  validateYear (e) {
    const currentDate = moment().format('YYYY')
    const validate = LaptopLeaseFunctions.checkedValidateInputNumber(e)
    if(validate > currentDate) {
      this.setState({ yearErrorMessage : 'Future year are not allowed' })
    } else {
      this.setState({ screenSize : validate, yearErrorMessage : '' })
    }
  }

  sendFormData () {
    const {
      carBrand,
      laptopModel,
      screenSize,
      solRC,
      insurancePayment,
      cMUnit,
      primaryColor,
      secondaryColor,
      file,
      leaseMode,
      insuranceId,
      solId,
      carValidate
    } = this.state

    let validateAttachments = false
    file && file.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    const solRCChecked = carValidate.solRC ? carValidate.solRC : solRC
      if (!this.validator(carBrand)) {
          store.dispatch(NotifyActions.addNotify({
              title : 'My Benefits',
              message : 'Car Brand fields are required',
              type: 'warning'
          })
        )
      }
      else if (!this.validator(laptopModel)) {
          store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits',
            message : 'Car Model fields are required',
            type: 'warning'
          })
        )
      }
      else if (!this.validator(screenSize)) {
          store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits',
            message : 'Year fields are required',
            type: 'warning'
          })
        )
      }
      else if (!this.validator(primaryColor)) {
        store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits',
            message : 'Primary Color fields are required',
            type: 'warning'
          })
        )
      } else if (!this.validator(secondaryColor)) {
        store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits',
            message : 'Secondary Color fields are required',
            type: 'warning'
          })
        )
      } else if (!this.validator(insurancePayment)) {
        store.dispatch(NotifyActions.addNotify({
            title : 'My Benefits',
            message : 'Insurance Payment is required',
            type: 'warning'
          })
        )
      } else if (!this.validator(solId)) {
        this.setState({ solIdErrorMessage : 'sol id is required' })
      } else if (validateAttachments) {
        file && file.map(
          (attachment, key) => {
            if(!attachment.file) {
              store.dispatch(NotifyActions.addNotify({
                 title : 'My Benefits' ,
                 message : attachment.name + ' is required',
                 type : 'warning',
                 duration : 2000
               })
             )
            }
          }
        )
       } else {
        this.setState({ showEditMode : true })
      }
  }

  /* Notice Response*/

  noticeOfUndertaking (noticeResponse) {
   this.setState({ showNoticeModal : true, noticeResponse })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse })
  }

  showDeliveryOptions (deliveryData) {
    this.setState({ deliveryData })
  }

  /* Loader*/

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }
  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/')
  }

  formSubmission () {
    const {
      carBrand,
      laptopModel,
      screenSize,
      solRC,
      insurancePayment,
      cMUnit,
      primaryColor,
      secondaryColor,
      file,
      leaseMode,
      insuranceId,
      solId,
      carValidate
    } = this.state

    const solRCChecked = carValidate.solRC ? carValidate.solRC : solRC

    this.presenter.addCarRequest(
      carBrand,
      laptopModel,
      screenSize,
      leaseMode,
      solRCChecked,
      solId,
      insuranceId,
      cMUnit,
      primaryColor,
      secondaryColor,
      file ? file : null)
  }

  render () {
    const {
      showLaptopBrands,
      showQuotation,
      showFileUpload,
      enabledLoader,
      formAttachments,
      showNoticeModal,
      noticeResponse,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      showEnterSolRCModal,
      response,
      carBrand,
      laptopModel,
      screenSize,
      primaryColor,
      secondaryColor,
      file,
      leaseMode,
      loanType,
      carValidate,
      solRC,
      solRCErrorMessage,
      solRCInput,
      insurancePayment,
      insuranceId,
      showInsurancePaymentModal,
      yearErrorMessage,
      showEditMode,
      attachmentsRequired,
      solId,
      solIdErrorMessage,
      showLaptopDeliveryOption,
    } = this.state

    const { history }=this.props

    const insurancePaymentData = [
      {
        id : '1',
        name : 'Salary Deduction',
      }
    ]
    return (
      <div>
        {
          showInsurancePaymentModal &&
          <SingleInputModal
            label = { 'Insurance Payment' }
            inputArray = { insurancePaymentData && insurancePaymentData }
            selectedArray = { (insuranceId, insurancePayment) =>
              this.setState({
                insuranceId,
                insurancePayment,
                showInsurancePaymentModal : false,
              })
            }
            onClose = { () => this.setState({ showInsurancePaymentModal : false }) }
          />
        }
        {
          showEnterSolRCModal &&
          <Modal>
            <center>
              <GenericInput
                value = { solRC }
                text = { 'Enter Sol RC' }
                hint = { 'Please Enter Required Sol RC' }
                onChange = { (e) => this.validateInputNumber(e.target.value) }
                />
              <br/>
              <div className = { 'grid-global' }>
                <GenericButton
                  text = { 'Cancel' }
                  onClick = { () => this.setState({ showEnterSolRCModal : false }) }
                  />
                <GenericButton
                  text = { 'Continue' }
                  onClick = { () => {
                    this.setState({ showEnterSolRCModal : false })
                    }
                  }
                />
              </div>
            </center>
          </Modal>
        }

        {
          showNoticeModal &&
          <NoticeModal
            onClose={ () => this.setState({ showNoticeModal : false })}
            noticeResponse={ noticeResponse }
            benefitId={ '15' }
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
            benefitId={ '15' }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/medical'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }
        {
          showDeliveryOptions &&
          <SingleInputModal
            label = { 'Delivery Options' }
            inputArray = { carValidate && carValidate.brands }
            selectedArray = { (carId, carBrand) =>
              this.setState({
                carId,
                carBrand,
                showDeliveryOptions : false,
                carBrandErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showDeliveryOptions : false }) }
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
            benefitId={ loanType }
            onClose={ () => {
              this.props.history.push('/mybenefits/benefits/education'),
              this.setState({ showBenefitFeedbackModal : false })
            }}
          />
        }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Laptop Lease
          </h2>
        </div>
          {
            enabledLoader ?
             <center className={ 'circular-loader-center' }>
               <CircularLoader show={ this.state.enabledLoader }/>
             </center> :
            <FormComponent
              showEditMode = { showEditMode }
              carBrand = { carBrand }
              laptopModel = { laptopModel }
              screenSize = { screenSize }
              yearErrorMessage = { yearErrorMessage }
              solRC = { solRC }
              solId = { solId }
              solIdErrorMessage = { solIdErrorMessage }
              showQuotation = { showQuotation }
              showFileUpload = { showFileUpload }
              secondaryColor = { secondaryColor }
              primaryColor = { primaryColor }
              solRCDefault = { carValidate.solRC }
              cmUnit = { carValidate.unit }
              attachments = { attachmentsRequired }
              insurancePayment = { insurancePayment }
              onChangeSolRCFunc = { (e) => this.validateSolRC(e) }
              onChangeSolIdFunc = { (e) => this.validateSolId(e) }
              solRCErrorMessage = { solRCErrorMessage }
              getFileArray = { (resp) => this.setFileAttachments(resp) }
              onShowInsurancePaymentFunc = { () => this.setState({ showInsurancePaymentModal : true }) }
              showLaptopDeliveryOption = { () => this.setState({ showLaptopDeliveryOption : true }) }
              onlaptopModelValidateFunc = { (resp) => this.validateInputLaptopModelValue(resp) }
              onValidateyearFunc = { (resp) => this.validateYear(resp) }
              onValidatePrimaryColor = { (resp) => this.validateInputPrimaryColor(resp) }
              onValidateSecondaryColor = { (resp) => this.validateInputSecondaryColor(resp) }
              onValidateSolRC = { (resp) => this.validateInputNumber(resp) }
              onShowEnterSolRCModalFunc = { () => this.setState({ showEnterSolRCModal : true }) }
              onContinue={ () =>
                this.sendFormData()
                }
              onEdit = { () => this.setState({ showEditMode : false })  }
              onSubmit = { () => this.formSubmission()  }
            />
          }
      </div>
    )
  }
}
export default ConnectView(LaptopLeaseFragment, Presenter)
