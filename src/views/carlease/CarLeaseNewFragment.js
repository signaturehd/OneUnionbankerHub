import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/CarLeasePresenter'
import ConnectView from '../../utils/ConnectView'

import * as CarLeaseFunctions from './functions/CarLeaseFunctions'

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
import CarDealerQuotation from './modals/CarDealerQuotationModal'

import FormComponent from './components/CarLeaseNewFormComponent'
import moment from 'moment'
import store from '../../store'
import { NotifyActions } from '../../actions'

class CarLeaseNewFragment extends BaseMVPView {

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
      showCarBrands: false,
      showEnterSolRCModal: false,
      showInsurancePaymentModal: false,
      showEditMode: false,
      carValidate: [],
      loanType: 15,
      leaseMode: 1,
      carBrand: '',
      carId: '',
      carModel: '',
      makeYear: '',
      primaryColor: '',
      secondaryColor: '',
      file: [],
      solRC: '',
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
    this.props.presenter.getCarValidate()
  }

  validator (input) {
   return new RequiredValidation().isValid(input)
  }

  showCarValidated (carValidate) {
    this.setState({ carValidate })
  }

  setFileAttachments (file) {
    this.setState({ file })
  }

  validateSolRC (e) {
    const validate = CarLeaseFunctions.checkedValidateInputNumber(e)
    this.setState({ solRC : validate, solRCErrorMessage : '' })
  }

  validateInputCarModelValue (e) {
    const validate = CarLeaseFunctions.checkedValidatedInput(e)
    this.setState({ carModel : validate })
  }

  validateInputPrimaryColor (e) {
    const validate = CarLeaseFunctions.checkedValidateAlphabet(e)
    this.setState({ primaryColor : validate })
  }

  validateInputSecondaryColor (e) {
    const validate = CarLeaseFunctions.checkedValidateAlphabet(e)
    this.setState({ secondaryColor : validate })
  }

  validateYear (e) {
    const currentDate = moment().format('YYYY')
    const validate = CarLeaseFunctions.checkedValidateInputNumber(e)
    if(validate > currentDate) {
      this.setState({ yearErrorMessage : 'Future year are not allowed' })
    } else {
      this.setState({ makeYear : validate, yearErrorMessage : '' })
    }
  }

  sendFormData () {
    const {
      carBrand,
      carModel,
      makeYear,
      solRCDefault,
      solRC,
      insurancePayment,
      cMUnit,
      primaryColor,
      secondaryColor,
      file,
      leaseMode,
      insuranceId
    } = this.state


    let validateAttachments = false
    file && file.map(
      (attachment, key) => {
        if(!attachment.file) {
          validateAttachments = true
        }
      }
    )

    const solRCChecked = solRCDefault ? solRCDefault : solRC

      if (!this.validator(carBrand)) {
          store.dispatch(NotifyActions.addNotify({
              title : 'Car Lease (New)',
              message : 'Car Brand fields are required',
              type: 'warning'
          })
        )
      }
      else if (!this.validator(carModel)) {
          store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Car Model fields are required',
            type: 'warning'
          })
        )
      }
      else if (!this.validator(makeYear)) {
          store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Year fields are required',
            type: 'warning'
          })
        )
      }
      else if (!this.validator(primaryColor)) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Primary Color fields are required',
            type: 'warning'
          })
        )
      } else if (!this.validator(secondaryColor)) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Secondary Color fields are required',
            type: 'warning'
          })
        )
      } else if (!this.validator(insurancePayment)) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Insurance Payment is required',
            type: 'warning'
          })
        )
      } else if (!this.validator(solRCChecked)) {
        this.setState({ solRCErrorMessage : 'sol rc is required' })
      } else if (validateAttachments) {
        file && file.map(
          (attachment, key) => {
            if(!attachment.file) {
              store.dispatch(NotifyActions.addNotify({
                 title : 'Warning' ,
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

  /* Loader*/

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }
  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/carlease')
  }

  formSubmission () {
    const {
      carBrand,
      carModel,
      makeYear,
      solRCDefault,
      solRC,
      insurancePayment,
      cMUnit,
      primaryColor,
      secondaryColor,
      file,
      leaseMode,
      insuranceId
    } = this.state

    const solRCChecked = solRCDefault ? solRCDefault : solRC
    this.presenter.addCarRequest(
      carBrand,
      carModel,
      makeYear,
      leaseMode,
      solRCChecked,
      insuranceId,
      cMUnit,
      primaryColor,
      secondaryColor,
      file ? file : null)
  }

  render () {
    const {
      showCarBrands,
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
      carModel,
      makeYear,
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
      attachmentsRequired
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
          showQuotation &&
          <CarDealerQuotation
            history = { history }
            backToBenefits = { this.navigate.bind(this) }
            onUserConfirmation = { (showQuotation, showFileUpload) =>
              this.setState({ showQuotation, showFileUpload })
           }
            onClose = { () =>
              this.setState({ showQuotation: false })  }
            />
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
          showCarBrands &&
          <SingleInputModal
            label = { 'Brands' }
            inputArray = { carValidate && carValidate.brands }
            selectedArray = { (carId, carBrand) =>
              this.setState({
                carId,
                carBrand,
                showCarBrands : false,
                carBrandErrorMessage : ''
              })
            }
            onClose = { () => this.setState({ showCarBrands : false }) }
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
            Car Lease Brand New
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
              carModel = { carModel }
              makeYear = { makeYear }
              yearErrorMessage = { yearErrorMessage }
              solRC = { solRC }
              showQuotation = { showQuotation }
              showFileUpload = { showFileUpload }
              secondaryColor = { secondaryColor }
              primaryColor = { primaryColor }
              solRCDefault = { carValidate.solRC }
              cmUnit = { carValidate.unit }
              attachments = { attachmentsRequired }
              insurancePayment = { insurancePayment }
              onChangeSolRCFunc = { (e) => this.validateSolRC(e) }
              solRCErrorMessage = { solRCErrorMessage }
              getFileArray = { (resp) => this.setFileAttachments(resp) }
              onShowInsurancePaymentFunc = { () => this.setState({ showInsurancePaymentModal : true }) }
              onGetCarBrandsFunc = { () => this.setState({ showCarBrands : true }) }
              onCarModelValidateFunc = { (resp) => this.validateInputCarModelValue(resp) }
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
export default ConnectView(CarLeaseNewFragment, Presenter)
