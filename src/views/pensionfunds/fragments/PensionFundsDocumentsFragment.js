import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Line,
  Card,
} from '../../../ub-components/'

import '../styles/fundsStyle.css'

import { format } from '../../../utils/numberUtils'

import PensionDocumentsComponent from '../components/PensionDocumentsComponent'

class PensionFundsDocumentsFragment extends Component {
  constructor (props) {
    super(props)
  }

  checkIdActionCompleted (id) {

  }

  render () {
    const {
      pensionFundsDocumentsData,
      stepperStatus,
    } = this.props

    return (
      <div className = { 'funds-grid-content-x3' }>
        <div></div>
        <div className = { 'funds-grid-header-content' }>
          <div>
            <h4 className = { 'font-weight-bold font-size-30px letter-spacing-1' }>Retirement Pension Period</h4>
            <br/>
            <h4 className = { 'font-size-16px font-weight-ligther letter-spacing-1' }>Secure your future.</h4>
            <br/>
          </div>
          <div className = { 'funds-documents-background' }>
            <div>
              <div></div>
              <div className = { 'funds-documents-grid-x3' }>
                <div></div>
                <div>
                  {
                    pensionFundsDocumentsData &&
                    pensionFundsDocumentsData.forms.map((resp) =>
                      resp.id === stepperStatus &&
                      <PensionDocumentsComponent
                        id = { resp.id }
                        title = { resp.name }
                        content = { resp.content }
                        documents = { pensionFundsDocumentsData }
                        stepperStatus = { stepperStatus }
                      />
                    )
                  }
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
