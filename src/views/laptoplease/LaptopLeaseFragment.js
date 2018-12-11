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
import moment from 'moment'
import store from '../../store'
import { NotifyActions } from '../../actions'

import * as controller from './functions/LaptopLeaseFunctions'

class LaptopLeaseFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      cardOptionComponent : true,
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

  }

  /* Life Cycle */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    // this.presenter.validateLaptopLease()
  }

  /* Presenter Functions */

  setTerms (terms) {
    this.setState({ terms })
  }

  setAmount (amount) {
    this.setState({ amount })
  }

  setColor (color) {
    this.setState({ color })
  }

  setLaptopBrand (laptopBrand) {
    this.setState({ laptopBrand })
  }

  setLaptopModel (laptopModel) {
    this.setState({ laptopModel })
  }

  setScreenSize (screenSize) {
    this.setState({ screenSize })
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

  validateInput () {
    this.setState({ showEditMode : true })
  }

  checkNonDigitRegex (word) {
    let nonDigitRegex = /\D+/g
    return word.replace(nonDigitRegex, '')
  }

  render () {
    const {
      terms,
      amount,
      color,
      deliveryOption,
      deliveryOptionList,
      file,
      showDeliveryOptions,
      showNoticeModal,
      showNoticeResponseModal,
      showBenefitFeedbackModal,
      enabledLoader,
      showEditMode,
      deliveryOptionName,
      laptopLeaseAttachment,
      showTermsSelection,
      termsId,
      termsName,
      noticeResponse,
      laptopBrand,
      laptopModel,
      screenSize,
      getCardOptionId,
      cardOptionComponent
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
              onClick = { () => this.setState({ cardOptionComponent : true }) }>
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
                  this.setState({ getCardOptionId, cardOptionComponent : false })
                }}
              />
            :
            <div>
              {
                enabledLoader ?
                 <center className={ 'circular-loader-center' }>
                   <CircularLoader show={ this.state.enabledLoader }/>
                 </center> :
                 <FormComponent
                    getCardOptionId = { getCardOptionId }
                    showEditMode = { showEditMode }
                    setAmount = { (resp) => this.presenter.setAmount(controller.checkedAmount(resp)) }
                    setColor = { (resp) =>  this.presenter.setColor(controller.checkedValidateAlphabet(resp)) }
                    setLaptopBrand = { resp => this.presenter.setLaptopBrand(resp) }
                    setLaptopModel = { resp => this.presenter.setLaptopModel(resp) }
                    setScreenSize = { resp => this.presenter.setScreenSize( this.checkNonDigitRegex(resp)) }
                    showLaptopDeliveryOption = { () => this.setState({ showDeliveryOptions: true }) }
                    showTerms = { () => this.setState({ showTermsSelection: true }) }
                    deliveryOptionName = { deliveryOptionName }
                    laptopLeaseAttachment = { laptopLeaseAttachment }
                    amount = { amount }
                    color = { color }
                    terms = { termsName }
                    laptopBrand = { laptopBrand }
                    laptopModel = { laptopModel }
                    screenSize = { screenSize }
                    setAttachments = { (laptopLeaseAttachment) => { this.setState({ laptopLeaseAttachment }),  this.presenter.setFile(laptopLeaseAttachment) } }
                    onContinue={ () => this.presenter.validateSubmission() }
                    onEdit = { () => this.setState({ showEditMode : false })  }
                    onSubmit = { () => this.presenter.addLaptopLease()  }
                  />
              }
            </div>
          }
      </div>
    )
  }
}
export default ConnectView(LaptopLeaseFragment, Presenter)
