import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/myTrainingComponentStyle.css'

import {
  Card,
  GenericButton,
} from '../../../ub-components'
import moment from 'moment'

class EnrolledTrainingCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      id,
      name,
      title,
      date,
    } = this.props

    return (
      <Card>
        <div className = { 'enrolled-list' }>
          <h3>{ name }</h3>
          <p>{ title }</p>
          <p>{ date ? moment(date).format('LL') : 'not available' }</p>
        </div>
      </Card>
    )
  }
}

EnrolledTrainingCardComponent.propTypes = {
  id :  PropTypes.string,
  name : PropTypes.string,
  title : PropTypes.string,
  date : PropTypes.string,
}

export default EnrolledTrainingCardComponent
