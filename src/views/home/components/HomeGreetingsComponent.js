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
        <div className = { '' }>
          <br/>
          <h2 className = { 'font-weight-lighter font-size-14px' }>
            { greetingsMessage } <b>{', ' + employeeName ? employeeName+'!' : '' }</b>
          </h2>
          <h4 className = { 'font-size-25px font-weight-bold home-margin-top' }>
            What do you want to do today?
          </h4>
        </div>
      </center>
    )
  }
}

HomeGreetingsComponent.propTypes = {
}

export default HomeGreetingsComponent
