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
            <h4 className = { 'unionbank-white-color mobile-view-title-steps-detail' }>User Guide</h4>
          </div>
          <div className = { 'text-align-left' }>
            <br/>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-steps-detail' }>Download One UnionBanker Hub</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-steps-detail' }>on an iOS device</h4>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <div>
            <div
              style = {{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
              }}>
              <div>
                <div>
                  <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-title-steps-detail' }>Steps</h4>
                </div>
                <br/>
                <br/>
                <div className = { 'text-align-left' }>
                  <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-steps-detail' }>Step 1: Launch Settings from your home screen</h4>
                  <br/>
                  <br/>
                  <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-steps-detail' }>Step 2: Select General</h4>
                  <br/>
                  <br/>
                  <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-steps-detail' }>Step 3: Scroll down and select Device Management</h4>
                  <br/>
                  <br/>
                  <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-steps-detail' }>Step 4: Select UNIONBANK OF THE PHILIPPINES</h4>
                  <br/>
                  <br/>
                  <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-steps-detail' }>Step 5: Select Trust "UNIONBANK OF THE PHILIPPINES"</h4>
                </div>
                <br/>
                <br/>
                <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-steps-detail' }>As we move further in the development process of One UnionBanker Hub, we understand having this app available on the Apple Store would be more user-friendly option</h4>
                <br/>
                <br/>
                <h4
                  style = {{
                    marginBottom: '10px'
                  }}
                  className = { 'font-weight-lighter unionbank-white-color mobile-view-label-steps-detail' }>Currently we are dedicating the full efforts of our development team towards a release in the Apple Store by August 2018 or sooner. <br/> Thank you for using 1UHub!</h4>
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
          <div>
            <br/>
            <div
              onClick = { () => iosUserGuideFunc(false) }
              style = {{
                display: 'grid',
                gridTemplateColumns: '.08fr auto',
              }}>
              <div>
                <i
                  className = { 'back-arrow' }/>
              </div>
              <h4 className = { 'unionbank-color font-weight-lighter font-size-16px align-items-center' }>Back</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MobileIosUserGuideComponent
