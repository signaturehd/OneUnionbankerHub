import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  GenericInput,
  GenericButton,
  FileUploader,
  DatePicker,
  ViewMoreButton,
  Line
} from '../../../ub-components/'

import '../styles/mobileStyle.css'

class MobileHeaderComponent extends Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className = { 'mobile-view-header-components' }>
        <div></div>
        <div className = { 'mobile-view-header-grid-detail' }>
          <span className = { 'mobile-view-ubplogo mobile-view-ubplogo-detail' }/>
          <div className = { 'text-align-left mobile-view-grid-row-text' }>
            <div>
              <h4 className = { 'unionbank-white-color' }>One Place,</h4>
            </div>
            <div>
              <h4 className = { 'unionbank-white-color' }>JUST FOR
                <b className = { 'unionbank-color' }> U</b>
              </h4>
            </div>
          </div>
          <div className = { 'text-align-left' }>
            <br/>
            <h4 className = { 'font-weight-lighter unionbank-white-color' }>Download the Premier employee lifestyle </h4>
            <h4 className = { 'font-weight-lighter unionbank-white-color' }>app of the Unionbank of the Philippines</h4>
            <h4 className = { 'font-weight-bold unionbank-white-color' }>Designed with U in mind.</h4>
          </div>
          <span className = { 'mobile-view-googleplay mobile-view-googleplay-detail' }/>
        </div>
        <div></div>
      </div>
    )
  }
}

export default MobileHeaderComponent
