import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/LaptopLeasePresenter'
import ConnectView from '../../utils/ConnectView'

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
import CardOptionComponent from './components/LaptopLeaseOptionComponent'
import LaptopLeaseEmpToPurchaseComponent from './components/LaptopLeaseEmpToPurchaseComponent'
import moment from 'moment'
import store from '../../store'
import { NotifyActions } from '../../actions'

import * as controller from './functions/LaptopLeaseFunctions'

import './styles/laptopLeaseStyle.css'

class LaptopLeaseFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      cardOptionComponent : true,
      enabledLoader : false,
      showLaptopModel : false,
      showNoticeModal : false,
      showNoticeResponseModal : false,
      noticeResponse : null,
      showBenefitFeedbackModal : false,
      showEditMode: false,
      laptopModel: '',
      screenSize: '',
      file: [],
      laptopId: null,
      attachmentsRequired : [ {name : 'Dealer Quotations'}]
    }
  }

  /* Life Cycle */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
  }

  /* Display Modal Notice of Undertaking*/

  noticeOfUndertaking (noticeResponse) {
   this.setState({ showNoticeModal : true, noticeResponse })
  }

  noticeResponseResp (noticeResponse) {
    this.setState({ noticeResponse })
  }


  /* Presenter Functions */

  setTerms (terms) {
    this.setState({ terms })
  }

  setAmount (amount) {
    this.setState({ amount })
  }

  setLaptopModel (laptopModel) {
    this.setState({ laptopModel })
  }

  setDeliveryOption (deliveryOption) {
    this.setState({ deliveryOption })
  }

  setFile (file) {
    this.setState({ file })
  }

  setDeliveryOptionList (deliveryOptionList) {
    this.setState({ deliveryOptionList })
  }

  setAttachment (laptopLeaseAttachment) {
    this.setState ({ laptopLeaseAttachment })
  }

  isLaptopLeaseValidate (isValid) {
    if (!isValid) {
      this.props.history.push('/mybenefits/benefits/')
    }
  }

  /* Loader*/
  hideLoading () {
    this.setState({ enabledLoader : false })
  }

  showLoading () {
    this.setState({ enabledLoader : true })
  }

  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/')
  }

  validateInput () {
    this.setState({ showEditMode : true })
  }

  checkNonDigitRegex (word) {
    let nonDigitRegex = /\D+/g
    return word.replace(nonDigitRegex, '')
  }

  checkIfDigitRegex (number) {
    let digitRegex = /^[0-9]+$/
    return number.replace(digitRegex, '')
  }

  setOrDate (orDate) {
    this.setState({ orDate })
  }

  setOrNumber (orNumber) {
    this.setState({ orNumber })
  }

  setVendor (vendor) {
    this.setState({ vendor })
  }

  setcostAquisition (costAquisition) {
    this.setState({ costAquisition })
  }

  setLaptopModelList (laptopModelDetails) {
    this.setState({ laptopModelDetails })
  }

  setLaptopId (laptopId) {
    this.setState({ laptopId })
  }

  resetValue () {
    this.setState({ showEditMode : false })
    this.presenter.resetValue()
  }

  render () {
    const {
      terms,
      amount,
      deliveryOption,
      deliveryOptionList,
      deliveryOptionName,
      file,
      showLaptopModel,
      showDeliveryOptions,
      showNoticeModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      enabledLoader,
      showEditMode,
      laptopLeaseAttachment,
      showTermsSelection,
      termsId,
      termsName,
      noticeResponse,
      laptopModel,
      getCardOptionId,
      cardOptionComponent,
      orNumber,
      orDate,
      vendor,
      costAquisition,
      laptopModelDetails,
      laptopDetailsName,
      selectedLaptopDetails,
      laptopId
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
        {super.render()}
        <div className = { 'laptoplease-container-grid' }>
          <div></div>
          <div>
            {
              showNoticeModal &&
              <NoticeModal
                onClose={ () => this.setState({ showNoticeModal : false })}
                noticeResponse={ noticeResponse }
                benefitId={ '16' }
                onDismiss={ (showNoticeModal, noticeResponse) =>
                  this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
              />
            }

            {
              showNoticeResponseModal &&
              <ResponseModal
                onClose={ () => {
                  this.resetValue()
                  this.setState({ showNoticeResponseModal : false, showBenefitFeedbackModal : true })
                }}
                noticeResponse={ noticeResponse }
              />
            }

            {
              showBenefitFeedbackModal &&
              <BenefitFeedbackModal
                benefitId={ '16' }
                onClose={ () => {
                  this.props.history.push('/mybenefits/benefits/'),
                  this.setState({ showBenefitFeedbackModal : false })
                }}
              />
            }
            {
              showDeliveryOptions &&
              <SingleInputModal
                label = { 'Delivery Options' }
                inputArray = { deliveryOptionList && deliveryOptionList }
                selectedArray = { (deliveryOptionId, deliveryOptionName) => {
                    this.setState({
                      deliveryOptionName,
                      showDeliveryOptions : false,
                    }),
                    this.presenter.setDeliveryOption(deliveryOptionId)
                  }
                }
                onClose = { () => this.setState({ showDeliveryOptions : false }) }
              />
            }
            {
              showLaptopModel &&
              <SingleInputModal
                label = { 'Laptop Model' }
                inputArray = { laptopModelDetails && laptopModelDetails }
                multipleContentArray = { (laptopDetails) => {
                    this.setState({
                      laptopId: laptopDetails.id,
                      laptopDetailsName: laptopDetails.name,
                      selectedLaptopDetails: laptopDetails.details,
                      showLaptopModel : false,
                    })
                    this.presenter.setLaptopId(laptopDetails.id)
                    this.presenter.setAmount(laptopDetails.unitPrice)
                    this.presenter.setLaptopModel(laptopDetails.id)
                  }
                }
                selectedArray = { () => {} }
                onClose = { () => this.setState({ showLaptopModel : false }) }
              />
            }

            {
              showTermsSelection &&
              <SingleInputModal
                label = { 'Terms' }
                inputArray = { [{
                  id: 1,
                  name: '12 Months'
                }, {
                  id: 2,
                  name: '24 Months'
                },{
                  id: 3,
                  name: '36 Months'
                }] }
                selectedArray = { (termsId, termsName) =>
                  {
                    this.setState({
                      termsName,
                      showTermsSelection : false,
                    }),
                    this.presenter.setTerms(termsId)
                  }
                }
                onClose = { () => this.setState({ showTermsSelection : false }) }
              />
            }
            <div>
              {
                !cardOptionComponent &&
                <i
                  className={ 'back-arrow' }
                  onClick = { () => {
                    this.setState({ 
                      cardOptionComponent : true,
                      //bank to purchase
                      laptopDetailsName: '',
                      selectedLaptopDetails: '',
                      termsName: '',
                      deliveryOptionName: '',
                      laptopLeaseAttachment: '',
                      //employee to purchase
                      vendor: '',
                      termsName: '',
                      orDate: '',
                      orNumber: '',
                      amount: '',
                      laptopLeaseAttachment: '',
                    })
                    this.resetValue()
                   }
                  }>
                </i>
              }
              <h2 className={ 'header-margin-default' }>
                Laptop Lease
              </h2>
            </div>
              {
                cardOptionComponent ?
                  <CardOptionComponent
                    getCardOptionIdFunc = { (getCardOptionId) => {
                      this.presenter.validateLaptopLease()
                      this.setState({ getCardOptionId, cardOptionComponent : false })
                    }}
                  />
                :
                <div>
                  {
                    enabledLoader ?
                     <center className={ 'circular-loader-center' }>
                       <CircularLoader
                         validateLoading = { true }
                         show={ enabledLoader }/>
                     </center> :
                     <div>
                       {
                         getCardOptionId === 1 ?
                         <FormComponent
                            selectedLaptopDetails = { selectedLaptopDetails }
                            laptopDetailsName = { laptopDetailsName }
                            getCardOptionId = { getCardOptionId }
                            showEditMode = { showEditMode }
                            setLaptopModel = { () => this.setState({ showLaptopModel : true }) }
                            showLaptopDeliveryOption = { () => this.setState({ showDeliveryOptions: true }) }
                            showTerms = { () => this.setState({ showTermsSelection: true }) }
                            deliveryOptionName = { deliveryOptionName }
                            laptopLeaseAttachment = { laptopLeaseAttachment }
                            amount = { controller.checkedAmount(amount) }
                            terms = { termsName }
                            laptopModel = { laptopModel }
                            setAttachments = { (laptopLeaseAttachment) => { this.setState({ laptopLeaseAttachment }),  this.presenter.setFile(laptopLeaseAttachment) } }
                            onContinue={ () => this.presenter.validateSubmission(getCardOptionId) }
                            onEdit = { () => this.setState({ showEditMode : false })  }
                            onSubmit = { () => this.presenter.addLaptopLease(getCardOptionId)  }
                          />
                         :
                         <LaptopLeaseEmpToPurchaseComponent
                           getCardOptionId = { getCardOptionId }
                           vendor = { vendor }
                           terms = { termsName }
                           showEditMode = { showEditMode }
                           vendorFunc = { (e) => this.presenter.setVendor(e) }
                           orDate = { orDate }
                           showTerms = { () => this.setState({ showTermsSelection: true }) }
                           orDateFunc = { (e) => this.presenter.setOrDate(e) }
                           orNumber = { orNumber }
                           orNumberFunc = { (e) => this.presenter.setOrNumber(e) }
                           costAquisition = { amount }
                           costAquisitionFunc = { (e) => this.presenter.setAmount(controller.checkedAmount(e)) }
                           laptopLeaseAttachment = { laptopLeaseAttachment }
                           setAttachments = { (laptopLeaseAttachment) => { this.setState({ laptopLeaseAttachment }),  this.presenter.setFile(laptopLeaseAttachment) } }
                           onContinue={ () => this.presenter.validateSubmission(getCardOptionId) }
                           onEdit = { () => this.setState({ showEditMode : false })  }
                           onSubmit = { () => this.presenter.addLaptopLease(getCardOptionId)  }
                         />
                       }
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
export default ConnectView(LaptopLeaseFragment, Presenter)
