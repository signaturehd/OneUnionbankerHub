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
      isSelectedDepartment : false
    }
  }


  render () {
    const {
      attend,
      key,
      event,
      check,
      changeCheckDepartment
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
            <Checkbox
              key = { key }
              value = { isSelectedDepartment }
              checked = { isSelectedDepartment !== false ? isSelectedDepartment : check }
              onChange = { e => {
                this.setState({ isSelectedDepartment : isSelectedDepartment !==true ? true : false } )
                try {
                  this.props.onChangeData(isSelectedDepartment !==true ? true : false, key)
                } catch(e) {
                  console.log(e)
                }
              } }
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
                isSelectedDepartment = { isSelectedDepartment }
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

export default EventsBudgetDepartmentComponent
