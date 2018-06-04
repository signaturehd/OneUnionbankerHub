import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import MultiPurposeForm from './components/MultiPurposeFormComponent'

import { CircularLoader } from '../../ub-components/'

class MplView extends Component{
  constructor(props) {
    super(props)
  }

  navigate () {
    this.props.history.push('/mybenefits/benefits/loans')
  }

  render() {
    return(
      <div>
        <div>
          <i
            className = { 'back-arrow' }
            onClick = { this.navigate.bind(this) }>
          </i>
          <h2 className = { 'header-margin-default' }>Multi Purpose Loan</h2>
        </div>
        <MultiPurposeForm/>
      </div>
    )
  }
}
export default MplView
