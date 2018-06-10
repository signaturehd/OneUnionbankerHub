import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MultiPurposeLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import FormComponent from '../mpl/components/MplFormCardComponent'

class HousingAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      termOfLoan: '',
      formAttachments: '',
      loanType: 3,
      validateLoanType : [],
      offset : [],
    }
  }

  componentDidMount () {
    this.presenter.getMPLTypes()
    this.presenter.getMPLValidate(this.state.loanType)
    this.presenter.getMPLTermAndRates(this.state.loanType)
    this.presenter.getMPLPurposeOfAvailment()
    this.presenter.getMPLFormAttachments()
  }

  /* Implementation*/

  showTermAndRates (termOfLoan) {
    this.setState({ termOfLoan })
  }

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

  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

  render () {
    const {
      purposeOfAvailment,
      termOfLoan,
      loanType,
      validateLoanType,
      offset } = this.state
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
          <FormComponent
            loanType = { loanType }
            purposeOfAvailment = { purposeOfAvailment }
            validateLoanType = { validateLoanType }
            presenter = { this.presenter }
            offset = { offset }
          />
      </div>
    )
  }
}
export default ConnectView(HousingAssistanceFragment, Presenter)
