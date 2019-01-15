import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileIosUserGuideComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    const {
      iosUserGuideFunc
    } = this.props

    return (
      <div className = { 'mobile-view-header-grid-detail' }>
        <span className = { 'mobile-view-ubplogo mobile-view-ubplogo-detail' }/>
        <div className = { 'text-align-left mobile-view-grid-row-text' }>
          <div>
            <br/>
            <h4 className = { 'unionbank-white-color mobile-view-title-detail' }>User Guide</h4>
          </div>
          <div className = { 'text-align-left' }>
            <br/>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail font-size-14px' }>Download One UnionBanker Hub</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail font-size-14px' }>on an iOS device</h4>
          </div>
          <br/>
          <div>
            <div
              style = {{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
              }}>
              <div>
                <div>
                  <h4 className = { 'font-weight-bold unionbank-white-color font-size-30px mobile-view-label-detail' }>Steps</h4>
                </div>
                <br/>
                <div className = { 'text-align-left' }>
                  <h4 className = { 'font-weight-bold unionbank-white-color font-size-9px' }>Step 1: Launch Settings from your home screen</h4>
                  <h4 className = { 'font-weight-bold unionbank-white-color font-size-9px' }>Step 2: Select General</h4>
                  <h4 className = { 'font-weight-bold unionbank-white-color font-size-9px' }>Step 3: Scroll down and select Device Management</h4>
                  <h4 className = { 'font-weight-bold unionbank-white-color font-size-9px' }>Step 4: Select UNIONBANK OF THE PHILIPPINES</h4>
                  <h4 className = { 'font-weight-bold unionbank-white-color font-size-9px' }>Step 5: Select Trust "UNIONBANK OF THE PHILIPPINES"</h4>
                </div>
                <br/>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>As we move further in the development process of One</h4>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>UnionBanker Hub, we understand that having this app</h4>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>available on Apple Store would be the more</h4>
                <br/>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>Currently we are dedicating the full efforts of our</h4>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>development team towards a release in the Apple Store</h4>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>by August 2018 or sooner.</h4>
                <h4 className = { 'font-weight-lighter unionbank-white-color font-size-8px' }>Thank you for using 1UHub!</h4>
              </div>
              <div>
                <img
                  src = { require('../../../images/mobileview/user guide.png') }
                  style = {{
                    height: '100%',
                    width : '100%'
                  }}/>
              </div>
            </div>
          </div>
          <center>
            <br/>
            <br/>
            <i
              onClick = { () => iosUserGuideFunc(false) }
              className = { 'back-arrow' }/> <h4 className = { 'unionbank-white-color font-weight-lighter' }>Back</h4>
          </center>
        </div>
      </div>
    )
  }
}

export default MobileIosUserGuideComponent
