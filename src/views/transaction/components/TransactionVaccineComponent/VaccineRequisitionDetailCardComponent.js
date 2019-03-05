import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class VaccineRequisitionDetailCardComponent extends Component {
  constructor (props) {
    super(props)
    this.state = { index : 4 }
  }

  render () {
  const { detailsVaccine } = this.props
  return (
    <div  className = { 'transaction-component-details-form' }>
      <div>
        <div>
          <h2 className = { 'font-weight-bolder' }> Vaccine Details </h2>
          <br/>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.Location }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Location
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.EventTitle }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Event
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.ThingsToBring }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Things to Bring
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.AdministrationStart }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Administration Start
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.AdministrationEnd }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Administration End
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.OrderingStart }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Ordering Start
            </h2>
            <br/>
          </div>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-ligter' }>
              { detailsVaccine.OrderingEnd }
            </h2>
            <h2 className = { 'unionbank-color font-size-12px' }>
              Ordering End
            </h2>
            <br/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

VaccineRequisitionDetailCardComponent.propTypes = {
  details : PropTypes.object,
}

export default VaccineRequisitionDetailCardComponent
