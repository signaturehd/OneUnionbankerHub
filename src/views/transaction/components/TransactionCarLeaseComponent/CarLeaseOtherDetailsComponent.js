import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class CarLeaseOtherDetailsComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    detailsEducation
  } = this.props

  const school = TransactionPersonalFunction.checkedCollege(detailsEducation)
  const course = TransactionPersonalFunction.checkedCourse(detailsEducation)
  const academicYear = TransactionPersonalFunction.checkedAcademicyear(detailsEducation)
  const semester = TransactionPersonalFunction.checkedSemester(detailsEducation)
  const reimbursableAmount = TransactionPersonalFunction.checkedAmountFormat(detailsEducation.TotalReimbursableAmount)
  const registrationFee = TransactionPersonalFunction.checkedAmountFormat(detailsEducation.RegistrationFee)
  const tuitionFee = TransactionPersonalFunction.checkedAmountFormat(detailsEducation.TuitionFee)

  return (
  <div>
    <div className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <br/>
          <h2 className = { 'font-weight-bolder' }> Car Leases Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-school' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               { school }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div
           className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             { course }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
             <br/>
             <br/>
            </h2>
          </div>
        </div>
        <div
           className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             { academicYear }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
             <br/>
             <br/>
            </h2>
          </div>
        </div>
        <div
           className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             { semester }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
             <br/>
             <br/>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <br/>
          <h2 className = { 'font-weight-bolder' }></h2>
          <br/>
        </div>
        <div
           className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             { registrationFee }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Registration Fee
             <br/>
             <br/>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
  }
}

CarLeaseOtherDetailsComponent.propTypes = {
  detailsEducation : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default CarLeaseOtherDetailsComponent
