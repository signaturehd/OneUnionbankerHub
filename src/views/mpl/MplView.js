import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BaseMVPView from '../common/base/BaseMVPView'
import MultiPurposeForm from './components/MultiPurposeForm'

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
          <h4>Multi Purpose Loan</h4>
        </div>
        <MultiPurposeForm/>
      </div>
    )
  }
}
export default MplView
