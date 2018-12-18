import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SkeletalLoader } from '../../../ub-components/'

class HomeGreetingsComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      greetingsMessage,
      employeeName
    } = this.props

    return (
      <center>
        <br/>
        <h2 className = { 'font-weight-lighter font-size-14px' }>
          { greetingsMessage+', ' } <b>{employeeName ? employeeName+'!' : '' }</b>
        </h2>
        <h4 className = { 'font-size-25px font-weight-bold home-margin-top' }>
          What can I help you with?
        </h4>
      </center>
    )
  }
}

HomeGreetingsComponent.propTypes = {
}

export default HomeGreetingsComponent
