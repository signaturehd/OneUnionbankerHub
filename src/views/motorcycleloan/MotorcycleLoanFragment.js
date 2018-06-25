import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MotorcycleLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import FormComponent from './components/MotorcycleLoanCardComponent'

import store from '../../actions'
import { NotifyActions } from '../../actions'

class MotorCycleLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state={
      purposeOfAvailment: [],
      formAttachments: [],
      loanType: 4,
      validateLoanType : [],
      offset : [],
      enabledLoader : false,
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showNoticeModal : false,
      showConfirmation : false,
      poaText : '',
      modeOfLoanId : '',
      termId : '',
      amountValue : '',
      selectedSupplier : '',
      file : ''
    }
    this.sendFormData=this.sendFormData.bind(this)
  }

  componentDidMount () {
    this.props.setSelectedNavigation(1)
    this.presenter.getMplTypes()
    this.presenter.getMplValidate(this.state.loanType)
    this.presenter.getMplPurposeOfAvailment(
      this.state.loanType,
      1,
      1)
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    this.setState({ showNoticeModal : true, noticeResponse })
  }

  /* Implementation*/

  showMPLFormAttachments (formAttachments) {
    this.setState({ formAttachments })
  }

  showOffset (offset) {
    this.setState({ offset })
  }

  showValidate (validateLoanType) {
    this.setState({ validateLoanType })
  }

  showPurposeOfAvailment (purposeOfAvailment) {
    this.setState({ purposeOfAvailment })
  }

  /*Loader*/

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
  }

  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }
  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

  sendFormData (
    poaText,
    modeOfLoanId,
    termId,
    amountValue,
    selectedSupplier,
    file) {
      if(
        poaText === null ||
        modeOfLoanId === null ||
        amountValue === 0 ||
        termId === null ||
        file === '' )
      {
      } else {
          this.presenter.addLoan(
            poaText,
            modeOfLoanId,
            termId,
            amountValue,
            selectedSupplier,
            file)
          }
        }

  render () {
    const {
      purposeOfAvailment,
      loanType,
      validateLoanType,
      offset,
      enabledLoader,
      formAttachments,
      showConfirmation,
      showNoticeModal,
      showNoticeResponseModal,
      noticeResponse,
      response,
      poaText,
      modeOfLoanId,
      termId,
      amountValue,
      selectedSupplier,
      file }=this.state

    return (
      <div>
        { super.render() }
        <div>
          <i
            className={ 'back-arrow' }
            onClick={ this.navigate.bind(this) }>
          </i>
          <h2 className={ 'header-margin-default' }>
            Motorcycle Loan
          </h2>
        </div>
          {
            enabledLoader ?
             <center className={ 'circular-loader-center' }>
               <CircularLoader show={ this.state.enabledLoader }/>
             </center> :
            <FormComponent
              loanType={ loanType }
              purposeOfAvailment={ purposeOfAvailment }
              validateLoanType={ validateLoanType }
              formAttachments={ formAttachments }
              offset={ offset }
              presenter={ this.presenter }
              onClick={
                this.sendFormData(
                  poaText,
                  modeOfLoanId,
                  termId,
                  amountValue,
                  selectedSupplier,
                  file
                  )
                }
              onSubmit={ (
                getPoaTextData,
                getModeOfLoanId,
                getTermIdData,
                getAmountValueData,
                getSelectedSupplierData,
                getFileData) => this.setState({
                  poaText : getPoaTextData,
                  modeOfLoanId : getModeOfLoanId,
                  termId : getTermIdData,
                  amountValue : getAmountValueData,
                  selectedSupplier : getSelectedSupplierData,
                  file : getFileData
                })
              }
            />
          }
      </div>
    )
  }
}
export default ConnectView(MotorCycleLoanFragment, Presenter)
