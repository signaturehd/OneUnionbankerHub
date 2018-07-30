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
  console.log(procedures.length);

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
            <br/>
            <br/>
            </h2>
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
            <br/>
            <br/>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Package Procedures </h2>
          <br/>
        </div>
        {
          procedures && procedures.slice(0, index).map( (resp ,key) => (
            <div className = { 'transaction-icons-details-grid' }>
              <div>
                <h2 className = { 'font-size-13px font-weight-lighter' }>
                  { resp }
                </h2>
              </div>
            </div>
          )
        )
        }
        <div className = { 'grid-global' }>
          <GenericButton
            className = { 'transaction-component-button' }
            text = { 'View Less' }
            onClick = { () =>
              this.setState({
                index : TransactionPersonalFunction.indexDecreased(index)
                })
              }
            />
          <GenericButton
            className = { 'transaction-component-button' }
            text = { 'View More' }
            onClick = { () => {
              if (index < procedures.length)
              this.setState({ index : TransactionPersonalFunction.indexIncreased(index) })
              }

            }
            />
        </div>
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
