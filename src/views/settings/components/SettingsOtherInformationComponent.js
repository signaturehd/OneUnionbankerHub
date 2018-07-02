import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Card, Line } from '../../../ub-components/'

import './styles/profileSettings.css'

class SettingsOtherInformationComponent extends Component {

  constructor (props) {
    super(props)
  }

  render () {
    const {
      profile,
      onClick,
      rank,
      linemanager,
      profileDependent,
      profileImageUrl }=this.props

    return (
      <div className={ 'profile-others-card' }>
        <div className={ 'profile-others-grid' }>
          <div className={ 'profile-information-view-right' }>
            <div>
               <span className={ 'profile-icon-settings employeeWorkClass' }/>
            </div>
            <div>
              <h5 className={ 'profile-margin-label' }>
                { profile.workClass ? profile.workClass : '(Not Yet Provided)'  }
              </h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SettingsOtherInformationComponent.propTypes = {
  onClick : PropTypes.func,
}

export default SettingsOtherInformationComponent
