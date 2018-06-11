import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MultiPurposeLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import { CircularLoader } from '../../ub-components/'

import FormComponent from '../mpl/components/MplFormCardComponent'

class HousingAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      formAttachments: '',
      loanType: 3,
      validateLoanType : [],
      offset : [],
      enabledLoader : false,
    }
  }

  componentDidMount () {
    this.presenter.getMPLTypes()
    this.presenter.getMPLValidate(this.state.loanType)
    this.presenter.getMPLPurposeOfAvailment()
    this.presenter.getMPLFormAttachments()
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
  showCircularLoader () {
    this.setState({ enabledLoader : true })
  }

  hideCircularLoader () {
    this.setState({ enabledLoader : false })
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
      enabledLoader } = this.state
    return (
      <div>
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
              <CircularLoader show = {this.state.enabledLoader}/>
             </center> :
            <FormComponent
              loanType = { loanType }
              purposeOfAvailment = { purposeOfAvailment }
              validateLoanType = { validateLoanType }
              presenter = { this.presenter }
              offset = { offset }
            />
          }
      </div>
    )
  }
}
export default ConnectView(HousingAssistanceFragment, Presenter)
