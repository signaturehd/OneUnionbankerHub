import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileOnboardingComponents extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div
        style = {{
          padding: '0px 20px 0px 20px',
        }}>
        <div style = {{
          display: 'grid',
          height: 'auto',
          gridTemplateColumns: '1fr 1fr',
          fontSize: '11pt',
          }}>
          <img
            src = { require('../../../images/mobileview/on boarding.png') }
            style = {{
              height: 'inherit',
              width: '100%',
            }}/>
          <div
            className = { 'text-align-right margin-auto' }>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Experience a unique guide</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>digital on-boarding so</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>you're ready to</h4>
            <h4 className = { 'font-weight-lighter unionbank-color mobile-view-label-detail' }>#OwnTheFuture!</h4>
          </div>
        </div>
      </div>
    )
  }
}

export default MobileOnboardingComponents
