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
        <Card>
          <div>awdawda</div>
          <div className = {'news-body'}>
            <h3>{profile.fullName}</h3>
          </div>
          <div className = {'card-footer'}>
          </div>
        </Card>
    )
  }
}

SettingsCardComponent.propTypes = {
  profile : PropTypes.array,
  onClick : PropTypes.func
}

SettingsCardComponent.defaultProps = {

}

export default SettingsCardComponent
