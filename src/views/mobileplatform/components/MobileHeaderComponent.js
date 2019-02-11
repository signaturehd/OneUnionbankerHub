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
                  <h4 className = { 'unionbank-white-color mobile-view-title font-weight-bold' }>One Place,</h4>
                </div>
                <div>
                  <h4 className = { 'unionbank-white-color mobile-view-title  font-weight-bold' }>JUST FOR
                    <b className = { 'unionbank-color mobile-view-title font-weight-bold' }> U</b>
                  </h4>
                </div>
              </div>
              <div className = { 'text-align-left' }>
                <br/>
                <br/>
                <h4
                  style = {{
                    color: '#fea3oa !important',
                  }}
                  className = { 'font-weight-bold mobile-view-label-detail-small' }>Download the Premier employee lifestyle </h4>
                <h4
                  style = {{
                    color: '#fea3oa !important',
                  }}
                  className = { 'font-weight-bold mobile-view-label-detail-small' }>app of the Unionbank of the Philippines</h4>
                <h4 className = { 'font-weight-bold unionbank-white-color mobile-view-label-detail-small' }>Designed with U in mind.</h4>
                <br/>
                <br/>
              </div>
              {
                platformUsed === 'android' &&
                <div
                  onClick = { () =>  this.downloadAndroid() }
                  className = { 'cursor-pointer mobile-view-googleplay mobile-view-googleplay-detail' }>
                </div>
              }
              {
                platformUsed === 'ios' &&
                  <div
                    onClick = { () => this.downloadIOS() }
                    className = { 'cursor-pointer mobile-view-appstore mobile-view-appstore-detail' }>
                  </div>
              }
              {
                platformUsed === 'ios' &&
                <div>
                <br/>
                  <h4
                    style ={{
                        textDecoration: 'underline',
                        fontSize: '1.6rem'
                    }}
                    onClick = { () => iosUserGuideFunc(true) }
                    className = { 'mobile-font-size font-weight-lighter unionbank-white-color' }>View Download Instruction.</h4>
                </div>
              }
              <br/>
            </div>
          }
        </div>
        <div></div>
      </div>
    )
  }
}

export default MobileHeaderComponent
