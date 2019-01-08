import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import '../styles/fundsStyle.css'

import { format } from '../../../utils/numberUtils'

class PensionFundsDocumentsFragment extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      pensionFundsData
    } = this.props

    return (
      <div className = { 'funds-grid-content-x3' }>
        <div></div>
        <div>
          <h4 className = { 'font-weight-bold font-size-30px letter-spacing-1' }>Retirement Pension Period</h4>
          <br/>
          <h4 className = { 'font-size-16px font-weight-ligther letter-spacing-1' }>Secure your future.</h4>
          <br/>
          <div className = { 'funds-documents-background' }>
            <div>
              <div></div>
              <div className = { 'funds-documents-grid-x3' }>
                <div></div>
                <div  className = { 'funds-documens-card-grid' }>
                  <div></div>
                  <Card className = { 'funds-documents-card' }>
                    <center>
                      <h4>Retirement Pension Fund Risk</h4>
                      <br/>
                      <p>
                      </p>
                    </center>
                  </Card>
                  <div></div>
                </div>
                <div></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    )
  }
}

export default PensionFundsDocumentsFragment
