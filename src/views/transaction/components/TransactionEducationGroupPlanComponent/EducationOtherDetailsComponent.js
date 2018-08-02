import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class EducationOtherDetailsComponent extends Component {
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
  const amount = TransactionPersonalFunction.checkedAmountFormat(detailsEducation.Grant.Amount)
  const grant = TransactionPersonalFunction.checkedGrant(detailsEducation)

  return (
  <div>
    <div className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <br/>
          <h2 className = { 'font-weight-bolder' }> Education Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-school' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
               { school }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Name of College/ University
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
             Course
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
             Academic Year
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
             Semester
             <br/>
             <br/>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <br/>
          <h2 className = { 'font-weight-bolder' }> Grant Details </h2>
          <br/>
        </div>
        <div
           className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
             { grant }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Type of Grant
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
             &#8369; { amount }
            </h2>
           <h2 className = { 'unionbank-color font-size-12px' }>
              Amount
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

EducationOtherDetailsComponent.propTypes = {
  detailsEducation : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}

export default EducationOtherDetailsComponent
