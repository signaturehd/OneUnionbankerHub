import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class StaffAccountCardComponent extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    const { details, backColor, status } = this.props
    return (
      <div className={ 'staff-account-card' }>
        <h1>sample card</h1>
      </div>
    )
  }
}
