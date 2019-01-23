import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileTeamGoalsComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div
        style = {{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          padding: '0px 0px 0px 25px',
        }}>
        <div
          style = {{
            marginTop: '50px',
          }}
          className = { 'text-align-left' }>
          <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>A transparent goals and</h4>
          <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>performance module</h4>
          <h4 className = { 'font-weight-lighter unionbank-color mobile-view-label-detail' }>Just For U.</h4>
        </div>
        <div className = { 'text-align-right' }>
          <img
            src = { require('../../../images/mobileview/team goals.png') }
            style = {{
              height: '100%',
              width : '100%'
            }}/>
        </div>
      </div>
    )
  }
}

export default MobileTeamGoalsComponent
