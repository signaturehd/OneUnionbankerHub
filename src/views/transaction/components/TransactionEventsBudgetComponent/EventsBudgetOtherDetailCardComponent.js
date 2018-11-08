import React, { Component } from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { format } from '../../../../utils/numberUtils'

import { Card, GenericButton } from '../../../../ub-components/'

import * as TransactionPersonalFunction from '../../controller/TransactionPersonalFunction'

class EventsBudgetOtherDetailCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      details
    } = this.props
    const eventDetails = details && details.EventsBudgetDetails

    return (
      <div  className = { 'transaction-component-otherdetails-form' }>
        <div>
          <div>
            <h2 className = { 'font-weight-bolder text-align-center' }> Events Details </h2>
            <br/>
          </div>
          <div >
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { eventDetails.Event }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Event Name
              <br/>
              <br/>
              </h2>
            </div>
          </div>
          <div >
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { eventDetails.Venue }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Venue Name
              <br/>
              <br/>
              </h2>
            </div>
          </div>
          <div >
            <div>
              <h2 className = { 'font-weight-ligter' }>
                { eventDetails.VenueAddress +', '+ eventDetails.VenueCity + ', ' + eventDetails.VenueProvince +', '+ eventDetails.VenueRegion  }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Venue Address
              <br/>
              <br/>
              </h2>
            </div>
          </div>
          <div>
            <div>
              <h2 className = { 'font-weight-ligter' }>
                &#8369; { format(eventDetails.Amount)  }
              </h2>
              <h2 className = { 'unionbank-color font-size-12px' }>
                Amount
              <br/>
              <br/>
              </h2>
            </div>
          </div>
          <br/>
        </div>
        <div>
          <div>
            <h2 className = { 'font-weight-bolder text-align-center' }> List of Attendees </h2>
            <br/>
          </div>
          {
            eventDetails.Attendees.map((resp, key) => {
              return (
                <div
                  key = { key }>
                  <div>
                    <h2 className = { 'font-weight-ligter' }>
                      { resp.FullName ? resp.FullName : 'No Name' }
                    </h2>
                    <h2 className = { 'unionbank-color font-size-12px' }>
                      { resp.UnitAssignment ? resp.UnitAssignment : 'No Unit Assignment' }
                    <br/>
                    <br/>
                    </h2>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

EventsBudgetOtherDetailCardComponent.propTypes = {
}

export default EventsBudgetOtherDetailCardComponent
