import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  GenericInput,
  GenericButton,
  DatePicker
} from '../../../ub-components/'

import moment from 'moment'

class LoginGuideUnlockProfileFragment extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      idReplace,
      requestUnlockFunc,
      usernameId,
      birthDate,
      onCheckUserName,
      onChageBirthDate
    } = this.props

    return (
      <div>
        <br/>
        <div
          className = { 'text-align-left unionbank-color cursor-pointer' }
          >
          <i
            onClick = { () => idReplace() }
            className = { 'back-arrow' }></i>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <h2 className = { 'font-size-18px text-align-center font-weight-bold' }>
          Unlock Account Activity
        </h2>
        <br/>
        <br/>
        <GenericInput
          value = { usernameId }
          onChange = { e => onCheckUserName(e.target.value) }
          text = { 'Employee ID' }
          type = { 'text' }
          />
        <DatePicker
          text = { 'Birth Date' }
          hint = { '(e.g mm/dd/yyyy)' }
          selected = { birthDate ? moment(birthDate) : '' }
          maxDate = { moment() }
          dateFormat = { 'MM/DD/YYYY' }
          onChange = { (e) => onChageBirthDate(e) }
          />
        <br/>
        <br/>
        <br/>
        <center>
          <GenericButton
            text = { 'Submit' }
            onClick = { () => requestUnlockFunc() }
            />
        </center>
      </div>
    )
  }
}

LoginGuideUnlockProfileFragment.propTypes = {
  requestUnlockPin : PropTypes.func,
  employeeId: PropTypes.string,
}

export default LoginGuideUnlockProfileFragment
