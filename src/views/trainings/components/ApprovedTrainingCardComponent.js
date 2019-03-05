import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/myTrainingComponentStyle.css'

import {
  Card,
  GenericButton,
} from '../../../ub-components'
import moment from 'moment'

class ApprovedTrainingCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      id,
      name,
      title,
    } = this.props

    return (
      <Card>
        <div className = { 'enrolled-list' }>
          <h3>{ name ? name : '(no name)' }</h3>
          <p className={ 'enrolled-title' }>{ title ? title : '(no title)' }</p>
        </div>
      </Card>
    )
  }
}

ApprovedTrainingCardComponent.propTypes = {
  id :  PropTypes.number,
  name : PropTypes.string,
  title : PropTypes.string,
}

export default ApprovedTrainingCardComponent
