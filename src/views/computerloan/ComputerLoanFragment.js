import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BaseMVPView from '../common/base/BaseMVPView'
import Presenter from './presenter/MplComputerLoanPresenter'
import ConnectView from '../../utils/ConnectView'

import FormComponent from './components/MplComputerLoanCardComponent'

class ComputerLoanFragment extends BaseMVPView {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount () {
  }

  /* Navigage back to loans Option*/
  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

  render () {
    const {
    } = this.state
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
          <FormComponent
          />
      </div>
    )
  }
}
export default ConnectView(ComputerLoanFragment, Presenter)
