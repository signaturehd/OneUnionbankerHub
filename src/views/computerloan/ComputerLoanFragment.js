import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/ComputerLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import FormComponent from './components/ComputerFormCardComponent'

import store from '../../store'
import { NotifyActions } from '../../actions'
class ComputerLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment : [],
      poaText  : '',
      modeOfLoanId : '',
      amountValue : '',
      termId : '',
      selectedSupplier : '',
      file : [],
      formAttachments : [],
      loanType : 5,
      validateLoanType : [],
      offset : [],
      enabledLoader : false,
      noticeResponse : null, /* notice response*/
      showNoticeResponseModal : false,
      showNoticeModal : false,
      showConfirmation : false,
    }
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

  /* Loader*/

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
    amountValue,
    termId,
    selectedSupplier,
    file) {
      if(
        poaText === null ||
        modeOfLoanId === null ||
        amountValue === 0 ||
        termId === null ||
        selectedSupplier === null ||
        file === null )
      {
        store.dispatch(NotifyActions.addNotify({
            title : 'Error',
            message : 'Please fill all fields',
            type : 'warning',
            duration : 2000
          })
        )
      } else {
        this.presenter.addLoan(
          poaText,
          modeOfLoanId,
          amountValue,
          termId,
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
      amountValue,
      termId,
      selectedSupplier,
      file } = this.state

    return (
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Computer Loan
          </h2>
        </div>
          {
            enabledLoader ?
             <center className = { 'circular-loader-center' }>
               <CircularLoader show = { this.state.enabledLoader }/>
             </center> :
            <FormComponent
              loanType = { loanType }
              purposeOfAvailment = { purposeOfAvailment }
              validateLoanType = { validateLoanType }
              formAttachments = { formAttachments }
              offset = { offset }
              onClick={ () =>
                this.sendFormData(
                  poaText,
                  modeOfLoanId,
                  amountValue,
                  termId,
                  selectedSupplier,
                  file
                  )
                }
              onSubmit={ (
                getPoaTextData,
                getModeOfLoanData,
                getAmountValueData,
                getTermData,
                getSupplierData,
                getFileData) => this.setState({
                  poaText : getPoaTextData,
                  modeOfLoanId : getModeOfLoanData,
                  amountValue : getAmountValueData,
                  termId : getTermData,
                  selectedSupplier : getSupplierData,
                  file : getFileData
                })
              }
            />
          }
      </div>
    )
  }
}
export default ConnectView(ComputerLoanFragment, Presenter)
