import React, { Component } from 'react'

import PropTypes from 'prop-types'

import {
  Card,
  Line,
  Checkbox
} from '../../../ub-components/'

import './styles/eventsComponentStyle.css'

import EventsBudgetAttendeesComponent from './EventsBudgetAttendeesComponent'

let idList = []

class EventsBudgetDepartmentComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isSelectedDepartment : false,
    }

    this.selectAll = this.selectAll.bind(this)
  }

  selectAll (isSelectedDepartment, attend) {
    const {
      checkIdIfHasLoginFunc,
      existingIds
    } = this.props

    this.setState({ isSelectedDepartment })
    if (isSelectedDepartment) {
      for (let i = 0; i < attend.length; i++) {
        idList.push(attend[i].id)
        // checkIdIfHasLoginFunc(isSelectedDepartment, attendies.id)
      }
    } else {
      idList = []
    }
    checkIdIfHasLoginFunc(isSelectedDepartment, idList)
  }

  render () {
    const {
      attend,
      key,
      event,
      check,
      checkIdIfHasLoginFunc,
      existingIds,
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
          <div
            onClick = { () => {} }
            className = { 'events-employees-column-3 cursor-pointer' }>
            <div></div>
            <h2 className = { 'text-align-self unionbank-color font-weight-bold font-size-16px text-align-center' }>
              { attend.department }
            </h2>
            <br/>
            {
             //  attend.employees.length > 1 &&
             //  <Checkbox
             //    value = { true }
             //    checked = { isSelectedDepartment }
             //    onChange = { e => this.selectAll(!isSelectedDepartment, attend.employees) }
             // />
            }
          </div>
          <Line/>
        </div>
        <div>
          {
            attend &&
            <EventsBudgetAttendeesComponent
              attendies = { attend }
              isSelectedDepartment = { isSelectedDepartment }
              checkIdIfHasLogin = { (e, e1) => {
                 checkIdIfHasLoginFunc(e, e1)
              } }
              existingIds = { existingIds }
            />
          }
        </div>
      </Card>
    )
  }
}

EventsBudgetDepartmentComponent.propTypes = {
}

export default EventsBudgetDepartmentComponent
