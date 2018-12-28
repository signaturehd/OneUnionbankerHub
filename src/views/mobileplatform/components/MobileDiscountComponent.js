import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../styles/mobileStyle.css'

class MobileDiscountComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div
        style = {{
          padding: '0px 0px 0px 20px',
        }}>
        <div style = {{
          display: 'grid',
          height: 'auto',
          gridTemplateColumns: '1fr 1fr',
          fontSize: '11pt',
          }}>
          <div
            className = { 'text-align-left margin-auto' }>
            <h4 className = { 'font-weight-lighter unionbank-color mobile-view-label-detail' }>Get discounts</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>by checking our PHENOM,</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>our expensive corporate</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail' }>perks program.</h4>
          </div>
          <img
            src = { require('../../../images/mobileview/phenom.png') }
            style = {{
              height: 'inherit',
              width: '100%',
            }}/>
        </div>
      </div>
    )
  }
}

export default MobileDiscountComponent
