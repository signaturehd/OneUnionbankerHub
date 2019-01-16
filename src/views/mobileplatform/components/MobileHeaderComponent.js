import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

import MobileIosUserGuideComponent from './MobileIosUserGuideComponent'

class MobileHeaderComponent extends Component {
  constructor (props) {
    super (props)
  }

  downloadIOS () {
    window.location.href = 'itms-services://?action=download-manifest&amp;url=https://oneunionbankerhub.com/download/manifest.plist'
  }

  downloadAndroid () {
    window.open('https://play.google.com/store/apps/details?id=com.unionbankph.oneuhub')
  }

  render () {
    const {
      platformUsed,
      iosUserGuide,
      iosUserGuideFunc,
    } = this.props

    return (
      <div className = { `${ iosUserGuide ? 'mobile-view-ios-components' : 'mobile-view-header-components' }` }>
        <div></div>
        <div>
          {
            iosUserGuide ?
            <MobileIosUserGuideComponent iosUserGuideFunc = { (bool) => iosUserGuideFunc(bool) }/>
            :
            <div className = { 'mobile-view-header-grid-detail' }>
              <span className = { 'mobile-view-ubplogo mobile-view-ubplogo-detail' }/>
              <div className = { 'text-align-left mobile-view-grid-row-text' }>
                <div>
                  <h4 className = { 'unionbank-white-color mobile-view-title-detail' }>One Place,</h4>
                </div>
                <div>
                  <h4 className = { 'unionbank-white-color mobile-view-title-detail' }>JUST FOR
                    <b className = { 'unionbank-color mobile-view-title-detail' }> U</b>
                  </h4>
                </div>
              </div>
              <div className = { 'text-align-left' }>
                <br/>
                <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Download the Premier employee lifestyle </h4>
                <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>app of the Unionbank of the Philippines</h4>
                <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-detail' }>Designed with U in mind.</h4>
              </div>
              {
                platformUsed === 'android' &&
                <span
                  onClick = { () =>  this.downloadAndroid() }
                  className = { 'cursor-pointer mobile-view-googleplay mobile-view-googleplay-detail' }/>
              }
              {
                platformUsed === 'ios' &&
                  <span
                    onClick = { () => this.downloadIOS() }
                    className = { 'cursor-pointer mobile-view-appstore mobile-view-appstore-detail' }/>
              }
              {
                platformUsed === 'ios' &&
                <div>
                  <h4
                    style ={{
                        textDecoration: 'underline',
                    }}
                    onClick = { () => iosUserGuideFunc(true) }
                    className = { 'font-size-10px font-weight-lighter unionbank-white-color mobile-view-label-detail' }>View Download Instruction.</h4>
                </div>
              }
            </div>
          }
        </div>
        <div></div>
      </div>
    )
  }
}

export default MobileHeaderComponent
