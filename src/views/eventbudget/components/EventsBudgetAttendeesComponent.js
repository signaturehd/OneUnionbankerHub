import React, { Component } from 'react'

import PropTypes from 'prop-types'
import './styles/eventsComponentStyle.css'

class EventsBudgetAttendeesComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedAttendees: false,
    }
  }

  checkEmployeeCheck (hasRecord) {
    if(hasRecord === true) {
      return 'check'
    } else {
      return ''
    }
  }

  render () {
    const {
      selectedAttendees
    } = this.state

    const {
      key2,
      employee,
      isSelectedDepartment
    } = this.props
    console.log(isSelectedDepartment)
    return (
      <div
        onClick = { () => this.setState({ selectedAttendees: employee.hasRecord !== false ? true: false }) }
        key2 = { key2 }
        className = { 'events-employees-column-3 cursor-pointer' }>
        <span className = { 'events-icon events-user-icon' }/>
        <div className = { 'employees-content' }>
          <h2 className = { 'text-align-left font-weight-bold font-size-14px' }>
            { employee.name ? employee.name : 'No Information Provided' }
          </h2>
          <h2 className = { 'text-align-left font-weight-normal font-size-12px' }>
            { employee.rank }
          </h2>
          <br/>
        </div>
        <span
          className = { `events-check events-icon-${ isSelectedDepartment ? 'check' : this.checkEmployeeCheck(employee.hasRecord) }` }/>
      </div>
    )
  }
}

EventsBudgetAttendeesComponent.propTypes = {
}

EventsBudgetAttendeesComponent.defaultProps = {
}

export default EventsBudgetAttendeesComponent
