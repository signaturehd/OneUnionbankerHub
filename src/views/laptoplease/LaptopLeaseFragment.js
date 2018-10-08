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

  }

  /* Life Cycle */

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.validateLaptopLease()
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
      laptopLeaseAttachment
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
            inputArray = { deliveryOptionList && deliveryOptionList }
            selectedArray = { (deliveryOptionId, deliveryOptionName) =>
              this.setState({
                deliveryOptionName,
                showDeliveryOptions : false,
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
              setAmount = { (resp) => this.presenter.setAmount(resp) }
              setColor = { (resp) =>  this.presenter.setColor(resp) }
              setTerms = { resp => this.presenter.setTerms(resp) }
              setFile = { (resp) => this.presenter.setFile(resp) }
              showLaptopDeliveryOption = { () => this.setState({ showDeliveryOptions: true }) }
              deliveryOptionName = { deliveryOptionName }
              laptopLeaseAttachment = { laptopLeaseAttachment }
              amount = { amount }
              color = { color }
              terms = { terms }
              file = { file }
              setAttachments = { (laptopLeaseAttachment) => this.setState({ laptopLeaseAttachment }) }
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
