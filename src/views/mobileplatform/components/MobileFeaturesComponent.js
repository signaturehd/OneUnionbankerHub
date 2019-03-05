import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileFeaturesComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div>
        <div className = { 'mobile-view-header-components' }>
          <div></div>
          <div className = { 'mobile-view-header-grid-detail' }>
            <h4 className = { 'unionbank-white-color mobile-view-title-steps-detail' }>Features:</h4>
            <div>
            </div>
            <div className = { 'text-align-left' }>
              <br/>
              <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small'  }>There's so many things that you can do
              </h4>
              <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-detail-small'  }>
                with <b className = { 'font-weight-bold unionbank-color mobile-view-label-detail-small' }> One UnionBanker Hub!</b>
              </h4>
            </div>
            <div></div>
          </div>
          <div></div>
        </div>
        <img
          src = { require('../../../images/mobileview/Benefits.png') }
          className = { 'image-feature' }
        />
          <div
            style = {{
              paddingRight: '100px',
              marginTop: '-120px'
            }}
            className = { 'text-align-right' }>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>HR Services right at your fingerprints!</h4>
            <h4 className = { 'font-weight-lighter unionbank-color mobile-view-label-detail-small' }>Use the My Benefits Module today!</h4>
          </div>
      </div>
    )
  }
}

export default MobileFeaturesComponent
