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
          padding: '0px 20px 0px 0px',
        }}>
        <img
          src = { require('../../../images/mobileview/my learning.png') }
          style = {{
            height: 'inherit',
            width : '100%'
          }}/>
          <div className = { 'text-align-right margin-auto' }>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Borrow a book?</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Listen to a Podcast?</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Enroll to training?</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>Develop yourself</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>through
              <b className = { 'font-weight-lighter unionbank-color mobile-view-label-detail' }> My Learning.</b>
            </h4>
          </div>
      </div>
    )
  }
}

export default MobileMyLearningComponent
