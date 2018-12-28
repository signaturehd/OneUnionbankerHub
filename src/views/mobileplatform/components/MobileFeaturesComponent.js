import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileFeaturesComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className = { 'mobile-view-header-components' }>
        <div></div>
        <div className = { 'mobile-view-header-grid-detail' }>
          <h4 className = { 'unionbank-white-color mobile-view-title-detail' }>Features:</h4>
          <div>
          </div>
          <div className = { 'text-align-left' }>
            <br/>
            <h4 className = { 'font-weight-lighter unionbank-white-color' }>There's so many things that you can do
              <br/>
              with <b className = { 'font-weight-lighter unionbank-color' }> One UnionBanker Hub!</b>
            </h4>
          </div>
          <div></div>
        </div>
        <div></div>
      </div>
    )
  }
}

export default MobileFeaturesComponent
