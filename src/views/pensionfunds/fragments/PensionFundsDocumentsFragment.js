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
    const count = id + 1
    return count
  }

  checkIdActionCompletedReturn (id) {
    let count = id
    if(count > 1) {
      count = id - 1
    }
    return count
  }

  render () {
    const {
      pensionFundsDocumentsData,
      stepperStatus,
      statusCodeFunc,
      statusCodeReturnFunc,
      changeCheckedFunc,
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
          <div className = { `funds-documents-background${ stepperStatus }` }>
            <div>
              <div></div>
              <div className = { 'funds-documents-grid-x3' }>
                <div></div>
                <div>
                  {
                    pensionFundsDocumentsData &&
                    pensionFundsDocumentsData.map((resp) =>
                      resp.id === stepperStatus &&
                      <PensionDocumentsComponent
                        id = { resp.id }
                        title = { resp.name }
                        content = { resp.content }
                        documents = { pensionFundsDocumentsData }
                        stepperStatus = { stepperStatus }
                        isChecked = { resp.isChecked }
                        changeCheckedFunc = { (e, e1) => changeCheckedFunc(e, e1) }
                        statusCodeFunc = { (bool,id) => statusCodeFunc(this.checkIdActionCompleted(stepperStatus),bool,id) }
                        statusCodeReturnFunc = { () => statusCodeReturnFunc(this.checkIdActionCompletedReturn(stepperStatus)) }
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
