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
  GenericButton
} from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'
import CarDealerQuotation from './modals/CarDealerQuotationModal'

import FormComponent from './components/CarLeaseNewFormComponent'

import store from '../../store'
import { NotifyActions } from '../../actions'

class CarLeaseNewFragment extends BaseMVPView {

  constructor (props) {
    super(props)
    this.state = {
      enabledLoader : false,
      showNoticeModal : false,
      showFileUpload: false,
      showQuotation: true,
      noticeResponse : null,
      showNoticeResponseModal : false,
      showBenefitFeedbackModal : false,
      showCarBrands: false,
      showEnterSolRCModal: false,
      carValidate: [],
      loanType: 15,
      leaseMode: 1,
      carBrand: '',
      carId: '',
      carModel: '',
      makeYear: '',
      primaryColor: '',
      secondaryColor: '',
      file: '',
      solRC: '',
      solRCInput: ''
    }
    this.sendFormData = this.sendFormData.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.props.presenter.getCarValidate()
  }

  showCarValidated (carValidate) {
    this.setState({ carValidate })
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

  validateInputNumber (e) {
    const validate = CarLeaseFunctions.checkedValidateInputNumber(e)
    this.setState({ solRC : validate })
  }

  validateYear (e) {
    const validate = CarLeaseFunctions.checkedValidateInputNumber(e)
    this.setState({ makeYear : validate })
  }

  sendFormData (
    carBrand,
    carModel,
    makeYear,
    leaseMode,
    primaryColor,
    secondaryColor,
    file) {
      if (carBrand === null) {
          store.dispatch(NotifyActions.addNotify({
              title : 'Car Lease (New)',
              message : 'Car Brand fields are required',
              type: 'warning'
          })
        )
      }
      else if (carModel === null) {
          store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Car Model fields are required',
            type: 'warning'
          })
        )
      }
      else if (makeYear === null) {
          store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Year fields are required',
            type: 'warning'
          })
        )
      }
      else if (primaryColor === null) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Primary Color fields are required',
            type: 'warning'
          })
        )
      }
      else if (secondaryColor === null) {
        store.dispatch(NotifyActions.addNotify({
            title : 'Car Lease (New)',
            message : 'Secondary Color fields are required',
            type: 'warning'
          })
        )
      }
      else {
        this.presenter.addCarRequest(
          carBrand,
          carModel,
          makeYear,
          leaseMode,
          primaryColor,
          secondaryColor,
          file ? file : null)
      }
  }

  /* Notice Response*/

  noticeOfUndertaking (noticeResponse) {
  this.setState({ showNoticeModal : true, showConfirmation: false, noticeResponse })
  }

  noticeResponse (noticeResponse) {
    this.setState({showConfirmation: false, noticeResponse })
  }

  /* Implementation*/

  showMPLFormAttachments (formAttachments) {
    this.setState({ formAttachments })
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
      solRCInput
    } = this.state

    const { onSubmit, history }=this.props
    return (
      <div>
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
            benefitId={ loanType }
            onDismiss={ (showNoticeModal, noticeResponse) =>
              this.setState({ showNoticeModal, noticeResponse, showNoticeResponseModal : true })  }
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
              history = { history }
              carBrand = { carBrand }
              carModel = { carModel }
              makeYear = { makeYear }
              showQuotation = { showQuotation }
              showFileUpload = { showFileUpload }
              secondaryColor = { secondaryColor }
              primaryColor = { primaryColor }
              solRC = { solRC }
              solRCDefault = { carValidate.solRC }
              cmUnit = { carValidate.unit }
              onGetCarBrandsFunc = { () => this.setState({ showCarBrands : true }) }
              onCarModelValidateFunc = { (resp) => this.validateInputCarModelValue(resp) }
              onValidateyearFunc = { (resp) => this.validateYear(resp) }
              onValidatePrimaryColor = { (resp) => this.validateInputPrimaryColor(resp) }
              onValidateSecondaryColor = { (resp) => this.validateInputSecondaryColor(resp) }
              onValidateSolRC = { (resp) => this.validateInputNumber(resp) }
              onShowEnterSolRCModalFunc = { () => this.setState({ showEnterSolRCModal : true }) }
              onSubmit={ (
                carBrand,
                carModel,
                makeYear,
                primaryColor,
                secondaryColor,
                file) =>
                this.sendFormData(
                  carBrand,
                  carModel,
                  makeYear,
                  leaseMode,
                  primaryColor,
                  secondaryColor,
                  file
                  )
                }
            />
          }
      </div>
    )
  }
}
export default ConnectView(CarLeaseNewFragment, Presenter)
