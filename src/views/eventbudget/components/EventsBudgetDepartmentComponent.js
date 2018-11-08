import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Card,
  Line,
  Checkbox
} from '../../../ub-components/'

import './styles/eventsComponentStyle.css'

import EventsBudgetAttendeesComponent from './EventsBudgetAttendeesComponent'

class EventsBudgetDepartmentComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelectedDepartment : null,
      attendeesLength : null,
      selectedId : [],
    }
  }

  render () {
    const {
      attend,
      key,
      event,
      check,
      checkIdIfHasLoginFunc,
    } = this.props

    const {
      isSelectedDepartment,
      attendeesLength,
      selectedId,
    } = this.state

    return (
      <Card
        className={ 'events-grid-rows-2' }
        onClick={ () => {}
        }
        key = { key } >
        <div>
          <div
            onClick = { () => {} }
            className = { 'events-employees-column-3 cursor-pointer' }>
            <div></div>
            <h2 className = { 'text-align-self unionbank-color font-weight-bold font-size-16px text-align-center' }>
              { attend.department }
            </h2>
            <Checkbox
              value = { true }
              checked = { true }
              onChange = { e => {
                this.setState({ isSelectedDepartment : isSelectedDepartment !==true ? true : false } )
              } }
           />
          </div>
          <Line/>
        </div>
        <div>
          <br/>
          {
            attend && attend.employees.map((employee, key2) =>
            {
              return (
                <EventsBudgetAttendeesComponent
                  employee = { employee }
                  employeeLength = { attend.employees.length }
                  key2 = { key2 }
                  checkIdIfHasLogin = { (e, e1) => {
                     checkIdIfHasLoginFunc(e, e1)
                  } }
                />
              )
            }
            )
          }
        </div>
      </Card>
    )
  }
}

EventsBudgetDepartmentComponent.propTypes = {
}

export default EventsBudgetDepartmentComponent
