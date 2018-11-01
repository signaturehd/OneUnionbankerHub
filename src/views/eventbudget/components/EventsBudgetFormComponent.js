import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card,
  GenericButton,
  DatePicker,
  Line,
} from '../../../ub-components/'

import './styles/eventsComponentStyle.css'

import Attendees from '../components/EventsFormComponentAttendeesComponent'

import moment from 'moment'
import { format } from '../../../utils/numberUtils'

class EventsBudgetFormComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      checkIdIfHasLoginFunc,
      celebrationText,
      celebrationTextFunc,
      venueText,
      venueTextFunc,
      addressText,
      addressTextFunc,
      regionText,
      regionTextFunc,
      provinceText,
      provinceTextFunc,
      cityText,
      cityTextFunc,
      amountTextFunc,
      amountText,
      index,
      viewMoreText,
      viewMore,
      viewLess,
      eventBudgetData,
      events,
      venue,
      submitPresenter,
      preferredDate,
      dateFunc,
      dateErrorMessage,
      endDate,
      startDate
    } = this.props


    return (
      <div className = { 'events-container' }>
        <div className = { 'events-grid-column-2' }>
        <div></div>
        <div>
          <h2>Events Budget Form</h2>
          <br/>
          <Line/>
          <br/>
          <GenericInput
            text = { 'Celebration' }
            onChange = { (e) => celebrationTextFunc(e.target.value) }
            value = { celebrationText }
            readOnly
          />
          <GenericInput
            text = { 'Venue Name' }
            onChange = { (e) => venueTextFunc(e.target.value) }
            value = { venueText }
          />
          <GenericInput
            text = { 'Address' }
            onChange = { (e) => addressTextFunc(e.target.value) }
            value = { addressText }
          />
          <GenericInput
            text = { 'Region' }
            onChange = { (e) => regionTextFunc(e.target.value) }
            value = { regionText }
          />
          <GenericInput
            text = { 'Province' }
            onChange = { (e) => provinceTextFunc(e.target.value) }
            value = { provinceText }
          />
          <GenericInput
            text = { 'City' }
            onChange = { (e) => cityTextFunc(e.target.value) }
            value = { cityText }
          />
          <GenericInput
            text = { 'Amount' }
            onChange = { (e) => amountTextFunc(e.target.value) }
            value = { amountText ? amountText : format(events && events.amount)  }
          />
        <div className = { 'grid-global' }>

        </div>
          <div className = { 'grid-global' }>
            <DatePicker
              selected = { events && events.startDate ? moment(events.startDate) : startDate }
              maxDate = { moment() }
              readOnly
              disabled = { true }
              dateFormat = { 'MM/DD/YYYY' }
              text = { 'From Date' }
              />
            <DatePicker
              selected = { events && events.endDate ? moment(events.endDate) : endDate }
              maxDate = { moment() }
              readOnly
              disabled = { true }
              dateFormat = { 'MM/DD/YYYY' }
              text = { 'To Date' }
              />
          </div>
          <DatePicker
            selected = { venue && venue.targetDate ? moment(venue.targetDate) : moment(preferredDate) }
            onChange = { (e) => dateFunc(e) }
            minDate = { moment() }
            readOnly
            dateFormat = { 'MM/DD/YYYY' }
            text = { 'Events Date' }
            errorMessage = { dateErrorMessage }
            />
          <br/>

          <Attendees
            index = { index }
            viewMoreText = { viewMoreText }
            viewMore = { viewMore }
            viewLess = { viewLess }
            eventBudgetData = { eventBudgetData }
            checkIdIfHasLogin = { (e, e1) => checkIdIfHasLoginFunc(e, e1) }
          />

          <br/>
          <div className = { 'grid-global' }>
            <GenericButton
              text = { 'Continue' }
              onClick = { () => submitPresenter() }
            />
            <GenericButton
              text = { 'Edit' }
              onClick = { () => this.presenter.addEventsBudget() }
            />
          </div>
        </div>
        <div></div>
        </div>
      </div>
    )
  }
}

EventsBudgetFormComponent.propTypes = {
  celebrationText : PropTypes.string,
  celebrationTextFunc: PropTypes.func,
}

EventsBudgetFormComponent.defaultProps = {
}

export default EventsBudgetFormComponent
