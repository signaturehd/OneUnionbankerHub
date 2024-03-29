import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileMyLearningComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div
        style = {{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          padding: '0px 20px 0px 20px',
        }}>
        <img
          src = { require('../../../images/mobileview/my learning.png') }
          style = {{
            height: 'inherit',
            width : '100%'
          }}/>
          <div
            style = {{
              paddingRight: '50px',
            }}
            className = { 'text-align-right margin-auto' }>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>Borrow a book?</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>Listen to a Podcast?</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>Enroll to training?</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>Develop yourself</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>through
              <b className = { 'font-weight-lighter unionbank-color mobile-view-label-detail-small' }> My Learning.</b>
            </h4>
          </div>
      </div>
    )
  }
}

export default MobileMyLearningComponent
