import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MPLPresenter'
import ConnectView from '../../utils/ConnectView'

import MPLFormComponent from '../mpl/components/MPLFormComponent'
import MPLPurposeOfAvailmentModal from '../mpl/modals/MPLPurposeOfAvailmentModal'

class HousingAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      termOfLoan: [],
      formAttachments: '',
      loanType: 3,
    }
  }

  componentDidMount () {
    this.presenter.getMPLTypes()
    this.presenter.getMPLValidate()
    this.presenter.getMPLTermAndRates()
    this.presenter.getMPLPurposeOfAvailment()
    this.presenter.getMPLFormAttachments()
  }

  showPurposeOfAvailment (purposeOfAvailment) {
    this.setState({ purposeOfAvailment })
  }

  showTermAndRates (termOfLoan) {
    this.setState({ termOfLoan })
  }

  showMPLFormAttachments (formAttachments) {
    this.setState({ formAttachments })
  }

  showTypes (loanType) {
    this.setState({ loanType })
  }

  showTermAndRates (termOfLoan) {
    this.setState({ termOfLoan })
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

  render () {
    const { purposeOfAvailment, termOfLoan, loanType } = this.state
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
          <MPLFormComponent
            types = { loanType }
            purposeOfAvailment = { purposeOfAvailment }
          />
      </div>
    )
  }
}
export default ConnectView(HousingAssistanceFragment, Presenter)
