import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/myTrainingComponentStyle.css'

import {
  Card,
  GenericButton,
  PresentationCard
} from '../../../ub-components'
import moment from 'moment'

class MyTrainingListCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      id,
      venue,
      startDate,
      title,
      startTime,
      endTime,
      status,
      endDate,
      onClick
    } = this.props

    return (
      <PresentationCard
        title = { title }
        venue = { venue }
        onClick = { () => onClick(id) }
        startDate = { moment(startDate).format('LL') }
        endDate = { moment(endDate).format('LL') }
        startTime = { startTime }
        endTime = { endTime }
      />
    )
  }
}

MyTrainingListCardComponent.propTypes = {
  title : PropTypes.string,
  venue : PropTypes.string,
  startDate : PropTypes.string,
  endDate : PropTypes.string,
  endTime : PropTypes.string,
  status : PropTypes.string,
  startTime : PropTypes.string,
  onClick : PropTypes.func,
}

export default MyTrainingListCardComponent
