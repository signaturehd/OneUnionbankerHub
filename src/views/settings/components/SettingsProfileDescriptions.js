import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../ub-components/'

import './styles/profileSettings.css'

class SettingsProfileDescriptions extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profileDescriptions }=this.props

    return (
      <div className={ 'profile-others-card' }>
        <div className={ 'profile-padding' }>
          <h2 className={ 'unionbank-color font-weight-normal' }>
            Descriptions
          </h2>
          <br/>
          <div className={ 'font-size-14px' }>
            {
              profileDescriptions ? profileDescriptions :
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            }
          </div>
        </div>
      </div>
    )
  }
}

SettingsProfileDescriptions.propTypes = {
  profile : PropTypes.object,
}

export default SettingsProfileDescriptions
