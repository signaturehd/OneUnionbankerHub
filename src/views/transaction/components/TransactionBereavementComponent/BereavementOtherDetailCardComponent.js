import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class BereavementOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
  const {
    detailsBereavement,
  } = this.props

  const funeralDetails = detailsBereavement.BereavementDetails.FuneralDetails
  const memorialDetails = detailsBereavement.BereavementDetails.MemorialDetails

  const dateOfDeath = TransactionPersonalFunction.checkedMDYDate(detailsBereavement.BereavementDetails.DateOfDeath)
  const dateOfWake = TransactionPersonalFunction.checkedMDYDate(detailsBereavement.BereavementDetails.DateOfWake)
  const dateOfInternment = TransactionPersonalFunction.checkedMDYDate(detailsBereavement.BereavementDetails.InternmentDate)
  const deceasedDependent = TransactionPersonalFunction.checkedDependent(detailsBereavement)
  const relationship = TransactionPersonalFunction.checkedRelationship(detailsBereavement)
  const funeralHome = TransactionPersonalFunction.checkedHome(memorialDetails.FuneralHome)
  const memorialHome = TransactionPersonalFunction.checkedHome(memorialDetails.MemorialHome)
  const memorialAddress = TransactionPersonalFunction.checkedAddress(memorialDetails.MemorialAddress)
  const funeralAddress = TransactionPersonalFunction.checkedAddress(funeralDetails.FuneralAddress)
  const memorialRegion = TransactionPersonalFunction.checkRegion(memorialDetails.MemorialRegion)
  const funeralRegion = TransactionPersonalFunction.checkRegion(funeralDetails.FuneralRegion)
  const memorialCity = TransactionPersonalFunction.checkCity(memorialDetails.MemorialCity)
  const funeralCity = TransactionPersonalFunction.checkCity(funeralDetails.FuneralCity)
  const memorialProvince = TransactionPersonalFunction.checkProvince(memorialDetails.MemorialProvince)
  const funeralProvince = TransactionPersonalFunction.checkProvince(funeralDetails.FuneralProvince)

  return (
    <div  className = { 'transaction-component-otherdetails-form' }>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Deceased Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-deceased' }></span>
          <div className = { 'trasaction-details-grid-row-x3' }>
            <h2 className = { 'font-weight-ligter' }>
            </h2>
            <div>
              <div>{ deceasedDependent }</div>
              <div>
                <h2 className = { 'font-size-13px font-weight-lighter' }>
                  Death Date { dateOfDeath }
                </h2>
              </div>
              <h2 className = { 'font-size-12px' }>
                { relationship }
              </h2>
            </div>
          </div>
        </div>
        <br/>
        <div>
          <h2 className = { 'font-weight-bolder' }> Funeral Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-funeral' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { funeralHome }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Funeral Home
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { dateOfWake }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Wake Date
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { funeralAddress }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Address
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { funeralRegion }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Region
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { funeralCity }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              City
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { funeralProvince }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Province
            <br/>
            <br/>
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Interment Details </h2>
          <br/>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span className = { ' transaction-card-icon-settings global-icons-memorial' }></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { memorialHome }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Memorial Home
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { dateOfInternment }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Interment Date
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { memorialAddress }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Address
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { memorialRegion }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Region
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { memorialCity }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              City
            <br/>
            <br/>
            </h2>
          </div>
        </div>
        <div className = { 'transaction-icons-details-grid' }>
          <span></span>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { memorialProvince }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Province
            <br/>
            <br/>
            </h2>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

BereavementOtherDetailCardComponent.propTypes = {
  detailsBereavement : PropTypes.object,
}

export default BereavementOtherDetailCardComponent
