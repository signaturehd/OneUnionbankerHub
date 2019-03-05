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
          }}>
          <div
            style = {{
              paddingLeft : '50px'
            }}
            className = { 'text-align-left margin-auto' }>
            <h4 className = { 'font-weight-lighter unionbank-color mobile-view-label-detail-small' }>Get discounts</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>by checking out PHENOM,</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>our exclusive corporate</h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color mobile-view-label-detail-small' }>perks program.</h4>
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
