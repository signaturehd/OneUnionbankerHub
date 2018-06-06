import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from '../mpl/presenter/MPLPresenter'
import ConnectPartial from '../../utils/ConnectPartial'

import { CircularLoader } from '../../ub-components/'
import HousingLoanFormComponent from './components/HousingLoanFormComponent'
import MPLPurposeOfAvailmentModal from '../mpl/modals/MPLPurposeOfAvailmentModal'

class HousingAssistanceFragment extends BaseMVPView {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.presenter.getMPLTypes()
    this.presenter.getMPLPurposeOfAvailment()
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

  render () {
    return (
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>
            Multi Purpose Form
          </h2>
        </div>
        <HousingLoanFormComponent/>
      </div>
    )
  }
}
export default ConnectPartial(HousingAssistanceFragment, Presenter)
