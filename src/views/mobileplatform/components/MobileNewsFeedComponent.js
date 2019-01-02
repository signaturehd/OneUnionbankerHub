import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileNewsFeedComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div
        style = {{
          margin: 'auto',
          textAlign: 'center',
        }}>
        <img
          src = { require('../../../images/mobileview/news feed.png') }
          style = {{
            height: '100%',
            width : '100%'
          }}/>
          <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Stay connected with the latest about UnionBank</h4>
          <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>through our
            <b className = { 'font-weight-lighter unionbank-color mobile-view-label-detail' }> dynamic newsfeed</b>
          </h4>
      </div>
    )
  }
}

export default MobileNewsFeedComponent
