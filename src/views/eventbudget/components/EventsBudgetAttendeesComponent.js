import React, { Component } from 'react'

import PropTypes from 'prop-types'
import './styles/eventsComponentStyle.css'

import store from '../../../store'
import { NotifyActions } from '../../../actions'

class EventsBudgetAttendeesComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      checkIdIfHasLogin,
      attendies,
      existingIds,
      isSelectedDepartment,
      showEditSubmitButton
    } = this.props

    let existingIdsArray = existingIds.map((item) => item)

    return (
      <div>
        {
          attendies &&
          attendies.employees &&
          attendies.employees.map((employee, key) => (
            <div>
              {
                !employee.hasRecord &&
                <div
                  onClick = { () => {
                    if(!showEditSubmitButton) {
                      checkIdIfHasLogin(!employee.hasRecord, employee.id)
                    } else {
                      store.dispatch(NotifyActions.addNotify({
                          title: 'Events Budget',
                          message : 'Please click "Edit" to add attendees',
                          type : 'warning',
                          duration : 2000
                        })
                      )
                    }
                  } }
                  key = { key }
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
                    className = { `events-check events-icon-${ existingIdsArray.includes(employee.id) && 'check' }` }/>
                </div>
              }
            </div>
          ))
        }
      </div>
    )
  }
}

export default EventsBudgetAttendeesComponent
