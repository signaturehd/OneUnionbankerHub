import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MultiPurposeLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import NoticeModal from '../notice/Notice'
import ResponseModal from '../notice/NoticeResponseModal'

import FormComponent from '../mpl/components/MplFormCardComponent'

class HousingAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      selectedPoa: '',
      formAttachments: [],
      loanType: 1,
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
    this.presenter.getMplFormAttachments()
    this.presenter.getMplPurposeOfAvailment(
      this.state.loanType,
      1,
      1)
  }

  /* Notice Response*/
  noticeOfUndertaking (noticeResponse) {
    // console.log(noticeResponse)
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
      noticeResponse } = this.state
    return (
      <div>
        {
          showNoticeModal &&
          <NoticeModal
            onClose = { () => this.setState({ showNotice : false })}
            noticeResponse = { noticeResponse }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response, showNoticeResponseModal : true })  }
          />
        }

        {
          showNoticeResponseModal &&
          <ResponseModal
            onClose = { () => {
              this.setState({ showNoticeResponseModal : false })
              this.props.history.push('/mybenefits/benefits/medical')
            }}
            noticeResponse = { response }
            onDismiss = { (showNoticeModal, response) =>
              this.setState({ showNoticeModal, response })  }
          />

        }
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Housing Assistance Loan
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
export default ConnectView(HousingAssistanceFragment, Presenter)
