import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Card,
  GenericButton,
  Line,
} from '../../../ub-components/'

import EventsBudgetDepartmentComponent from '../components/EventsBudgetDepartmentComponent'

import './styles/eventsComponentStyle.css'

class EventsFormComponentAttendeesComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      eventBudgetData,
      viewMoreText,
      viewMore,
      viewLess,
      index,
      isSelected ,
      isDepartmentSelected,
      departmentSelectedFunc,
    } = this.props

    const isVisible = (eventBudgetData && eventBudgetData.attendees && eventBudgetData.attendees.length > 4) ? '' : 'hide'

    return (
      <div className = { 'events-container' }>
        <div>
        <div></div>
        <div>
          <h2 className = { 'font-weight-bold font-size-20px unionbank-color' }>Attendees</h2>
          <br/>
          <h2 className = { 'font-size-14px font-weight-lighter' }>Employees that are "checked" are included in the said event, while those who are marked "unchecked" are excluded. Please click/tap the employee to change the status.</h2>
          <br/>
          <br/>
          <Line/>
          <br/>
        </div>
        <div>
          <br/>
          {
            eventBudgetData &&
            eventBudgetData.attendees &&
            eventBudgetData.attendees.slice(0, index).map((attend, key) =>
              <EventsBudgetDepartmentComponent
                attend = { attend }
                key = { key }
            />
            )
          }
        </div>
        <br/>
        <button
          type = { 'button' }
          className = { `viewmore tooltip ${ isVisible }` }
          onClick = {
            () => {
              if(index === eventBudgetData.attendees.length)
                viewLess()
              else
                viewMore()
            }
          }>
          <img src={ require('../../../images/icons/horizontal.png') } />
          <span className={ 'tooltiptext' }>{ viewMoreText }</span>
        </button>
        </div>
      </div>
    )
  }
}

EventsFormComponentAttendeesComponent.propTypes = {
}

EventsFormComponentAttendeesComponent.defaultProps = {
}

export default EventsFormComponentAttendeesComponent
