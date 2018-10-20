import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  GenericInput,
  MultipleFileUploader,
  Card,
  GenericButton,
  Line,
} from '../../../ub-components/'

import './styles/eventsComponentStyle.css'

import Attendees from '../components/EventsFormComponentAttendeesComponent'

import { format } from '../../../utils/numberUtils'

class EventsBudgetFormComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
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
            value = { events && events.name ? events.name : celebrationText }
          />
          <GenericInput
            text = { 'Venue' }
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
            value = { events && events.amount ? format(events.amount) : format(amountText) }
          />
          <br/>

          <Attendees
            index = { index }
            viewMoreText = { viewMoreText }
            viewMore = { viewMore }
            viewLess = { viewLess }
            eventBudgetData = { eventBudgetData }
          />

          <br/>
          <div className = { 'grid-global' }>
            <GenericButton
              text = { 'Continue' }
              onClick = { () => this.presenter.addEventsBudget() }
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
