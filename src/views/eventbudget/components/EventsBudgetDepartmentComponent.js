import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Card,
  Line,
} from '../../../ub-components/'

import './styles/eventsComponentStyle.css'

import EventsBudgetAttendeesComponent from './EventsBudgetAttendeesComponent'

class EventsBudgetDepartmentComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelectedDepartment : null
    }
  }

  // componentWillReceiveProps () {
  //   const {
  //     eventBudgetData
  //   } = this.props
  //
  //   eventBudgetData.attendees.map((resp) => {
  //     let employeesLength = resp.employees.length
  //     let attendeesCount = 0
  //
  //     resp.employees.map((resp2) => {
  //       if(resp2.hasRecord === true) {
  //         attendeesCount += 1
  //       }
  //     })
  //
  //     if(attendeesCount === employeesLength) {
  //       this.setState({ isSelectedDepartment: true })
  //     }
  //   })
  // }

  render () {
    const {
      attend,
      key,
      event
    } = this.props

    const {
      isSelectedDepartment,
    } = this.state

    return (
      <Card
        className={ 'events-grid-rows-2' }
        onClick={ () => {}
        }
        key = { key } >
        <div>
          <div className = { 'events-employees-column-3' }>
            <div></div>
            <h2 className = { 'unionbank-color font-weight-bold font-size-16px text-align-center' }>
              { attend.department }
            </h2>
            <span
              onClick = { () => this.checkIsSelectedDepartment() }
              className = { `events-check events-icon-${ isSelectedDepartment === true ? 'check' : '' }`  }
            />
          </div>
          <Line/>
        </div>
        <div>
          <br/>
          {
            attend && attend.employees.map((employee, key2) =>
              <EventsBudgetAttendeesComponent
                employee = { employee }
                key2 = { key2 }
              />
            )
          }
        </div>
      </Card>
    )
  }
}

EventsBudgetDepartmentComponent.propTypes = {
}

EventsBudgetDepartmentComponent.defaultProps = {
}

export default EventsBudgetDepartmentComponent
