import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class MedicalSchedulingOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = { index : 4 }
  }

  render () {
  const { detailsMedicalScheduling } = this.props

  const { index } = this.state

  const hospital = detailsMedicalScheduling.MedicalScheduleDetails.HospitalPackage.Clinic.Hospital
  const packages = detailsMedicalScheduling.MedicalScheduleDetails.HospitalPackage.Package
  const procedures = detailsMedicalScheduling.MedicalScheduleDetails.HospitalPackage.Procedures
  const preferredDate = TransactionPersonalFunction.checkedMDYDate(
    detailsMedicalScheduling &&
    detailsMedicalScheduling.MedicalScheduleDetails &&
    detailsMedicalScheduling.MedicalScheduleDetails.HospitalPackage &&
    detailsMedicalScheduling.MedicalScheduleDetails.HospitalPackage.PreferredDate)

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Clinic Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { hospital }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Hospital
            </h2>
            <br/>
            <br/>
          </div>
        </div>
        <br/>
        <div>
          <h2 className = { 'font-weight-bolder' }> Package Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { packages }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Package
            </h2>
            <br/>
            <br/>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { preferredDate }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Preferred Date
            </h2>
            <br/>
            <br/>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Package Procedures </h2>
          <br/>
        </div>
        {
          procedures && procedures.map((resp ,key) => (
            <div key = {key}>
              <div>
                <h2 className = { 'font-size-13px font-weight-lighter' } >
                  { resp.Procedure }
                </h2>
              </div>
            </div>
          )
        )
        }
        <br/>
        <br/>
      </div>
    </div>
    )
  }
}

MedicalSchedulingOtherDetailCardComponent.propTypes = {
  detailsMedicalScheduling : PropTypes.object,
}

export default MedicalSchedulingOtherDetailCardComponent
