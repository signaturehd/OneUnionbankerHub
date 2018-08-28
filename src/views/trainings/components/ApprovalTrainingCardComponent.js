import PropTypes from 'prop-types'
import React, { Component } from 'react'

import './styles/myTrainingComponentStyle.css'

import {
  Card,
  GenericButton,
} from '../../../ub-components'
import moment from 'moment'

class ApprovalTrainingCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      id,
      name,
      title,
      status,
      onClick,
    } = this.props

    return (
      <Card className={ 'clickable-card' } onClick = { () => onClick(id) }>
        <div className = { 'enrolled-list' }>
          <h3>{ name ? name : '(no name)' }</h3>
          <p className={ 'enrolled-title' }>{ title ? title : '(no title)' }</p>
          <p className={ 'enrolled-date' }>{ status }</p>
        </div>
      </Card>
    )
  }
}

ApprovalTrainingCardComponent.propTypes = {
  id :  PropTypes.number,
  name : PropTypes.string,
  title : PropTypes.string,
  date : PropTypes.string,
}

export default ApprovalTrainingCardComponent
