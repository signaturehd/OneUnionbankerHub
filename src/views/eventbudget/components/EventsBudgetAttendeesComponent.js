import React, { Component } from 'react'

import PropTypes from 'prop-types'
import './styles/eventsComponentStyle.css'

class EventsBudgetAttendeesComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedAttendees: false,
      employeeHasRecord: null,
      employeeId: null,
    }
  }

  checkEmployeeCheck (hasRecord) {

    if(hasRecord) {
      return 'check'
    } else {
      return ''
    }
  }

  onChangeData (hasRecord, id) {
    this.props.checkIdIfHasLogin (hasRecord, id)
  }

  render () {
    const {
      selectedAttendees,
      employeeHasRecord,
      employeeId,
      employeeLength,
    } = this.state

    const {
      key2,
      employee,
      checkIdIfHasLogin
    } = this.props

    return (
      <div
        onClick = { () => {
          this.setState({ employeeHasRecord: employeeHasRecord !== true ? true: false })
          this.onChangeData(this.props.employee.hasRecord !== true ? true : false, this.props.employee.id)
        } }
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
          className = { `events-check events-icon-${ this.checkEmployeeCheck(employeeHasRecord) }` }/>
      </div>
    )
  }
}

EventsBudgetAttendeesComponent.propTypes = {
}

EventsBudgetAttendeesComponent.defaultProps = {
}

export default EventsBudgetAttendeesComponent
