import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card } from '../../../ub-components/'

import './styles.css'

class SettingsCardComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { profile, onClick } = this.props
    return (
        <Card className = { 'profile-info-secondary' }>
          <div>{ profile.id }</div>
          <div className = {'profile-body'}>
            <h3>{ profile.id }</h3>
          </div>
          <div className = {'card-footer'}>
          </div>
        </Card>
    )
  }
}

SettingsCardComponent.propTypes = {
  onClick : PropTypes.func
}

export default SettingsCardComponent
