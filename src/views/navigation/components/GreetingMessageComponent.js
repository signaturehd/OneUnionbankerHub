import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { SkeletalLoader } from '../../../ub-components/'

import moment from 'moment'
let greetingsMessage = ''


class GreetingMessageComponent extends Component {

  constructor (props) {
    super(props)
  }

  getCheckGreetingsStatus () {
    let morning = 'Good Morning'
    let afternoon = 'Good Afternoon'
    let evening = 'Good Evening'
    const dateNow = moment().format('H')
    if(dateNow <= 11) {
      return morning
    } else if (dateNow <= 17) {
      return afternoon
    } else if (dateNow <= 23) {
      return  evening
    }
  }

  render () {
    const {
      greetingsMessage,
      firstName
    } = this.props

    return (
      <center className = { 'unionbank-white-color' }>
        <br/>
        <h2 className = { 'font-weight-normal font-size-15px' }>
          { this.getCheckGreetingsStatus()+', ' } <b>{firstName ? firstName+'!' : 'UnionBanker' }</b>
        </h2>
        <h4 className = { 'font-size-23px font-weight-bold' }>
          What can I help you with?
        </h4>
      </center>
    )
  }
}

GreetingMessageComponent.propTypes = {
}

export default GreetingMessageComponent
