import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/ComputerLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'


import FormComponent from './components/ComputerFormCardComponent'

class ComputerLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      selectedPoa: '',
      formAttachments: [],
      loanType: 3,
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
      response } = this.state
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
              presenter = { this.presenter }
            />
          }
      </div>
    )
  }
}
export default ConnectView(ComputerLoanFragment, Presenter)
