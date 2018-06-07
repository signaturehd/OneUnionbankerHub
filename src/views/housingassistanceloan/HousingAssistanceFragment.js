import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MPLPresenter'
import ConnectPartial from '../../utils/ConnectPartial'

import { CircularLoader } from '../../ub-components/'
import MPLFormComponent from '../mpl/components/MPLFormComponent'
import MPLPurposeOfAvailmentModal from '../mpl/modals/MPLPurposeOfAvailmentModal'

class HousingAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
      purposeOfAvailment: [],
      termOfLoan: '',
      formAttachments: '',
      loanType: []
    }
  }

  componentDidMount () {
    this.presenter.getMPLTypes()
    this.presenter.getMPLPurposeOfAvailment()
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
export default ConnectPartial(HousingAssistanceFragment, Presenter)
