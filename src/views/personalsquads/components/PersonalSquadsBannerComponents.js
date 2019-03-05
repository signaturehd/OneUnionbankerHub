
import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { Card, GenericLoader, GenericButton, Line } from '../../../ub-components'

import moment from 'moment'

import { convertInitial } from '../../../utils/initialUtils'

class SquadBannerComponents extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      profile
    } = this.props

    const initial = profile && profile.fullname
    const position = profile && profile.position
    const newInitial = convertInitial(initial)

    return (
      <Card className = { 'squad-workforce-banner' }>
        <div className = { 'squads-grid-row' }>
          <div className = { 'squad-workforce-banner-grid' }>
            <div className = { 'squads-picture squadsPircture' }>
              <h2 className = { 'squads-initial-text' }>{ newInitial }</h2>
              <small className = { 'squadsPictureLabel' }></small>
            </div>
            <div className = { 'squad-workfirce-banner-grid-row' }>
              <h4 className = { 'unionbank-white-color font-weight-bold font-size-20px' }>{ profile && profile.fullname }</h4>
              <h4 className = { 'unionbank-white-color font-weight-bold font-size-16px' }>Position: { position }</h4>
            </div>
          </div>
          <div className = { 'squads-grid-resume' }>
            <div></div>
            <div className = { 'grid-global' }>
              {
                // <GenericButton
                //   text = { 'View your resume' }
                //   onClick =  { () => {} }
                //   className = { 'cursor-pointer global-button profile-button-medium' }
                //   />
                // <GenericButton
                //   text = { 'Update your resume' }
                //   onClick =  { () => {} }
                //   className = { 'cursor-pointer global-button profile-button-medium' }
                //   />
              }
            </div>
          </div>
        </div>
      </Card>
    )
  }
}

SquadBannerComponents.propTypes = {
}

SquadBannerComponents.defaultProps = {
}

export default SquadBannerComponents
