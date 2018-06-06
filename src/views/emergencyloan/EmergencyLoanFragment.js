import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import EmergencyLoanForm from './components/EmergencyLoanForm'

import { CircularLoader } from '../../ub-components/'

class EmergencyLoanFragment extends Component {
  constructor (props) {
    super(props)
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
            Emergency Loan
          </h2>
        </div>
        <EmergencyLoanForm/>
      </div>
    )
  }
}
export default EmergencyLoanFragment
