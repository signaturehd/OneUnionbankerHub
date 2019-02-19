import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Line
}  from '../../../ub-components/'

import staticIcon from '../../../images/onboarding/thumbnail.jpg'

class NewEmployeeHireNextVideosComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      neoData,
      selectedVideoFunc,
      selectedVideo
    } = this.props

    return (
      <div>
      <br/>
      <h4 className = { 'font-weight-lighter font-size-20px padding-10px' }>Up Next</h4>
      <Line />
      <br/>
        <div style = {{
            overflow: 'auto',
            height: 'auto'
          }}>
          {
            neoData.map((resp, key) =>
              <div
                style = {{
                  marginBottom: '20px',
                }}
                onClick = { () => selectedVideoFunc(resp) }
                className = { 'neo-details-upnext-video cursor-pointer' }
                key = { key }>
                <span
                  style = {{
                    backgroundImage : `url(${staticIcon})`,
                    objectFit: 'contain',
                    backgroundSize: 'cover',
                    height: '100%',
                    borderRadius: '10px',
                    backgroundPosition: 'center center',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    margin: 'auto',
                  }}/>
                <div
                  style = {{
                    padding : '5px',
                    letterSpacing: '.5px',
                   }}>
                   <h4>Employee Engagement</h4>
                   <h4 className = { 'font-weight-lighter font-size-12px' }>{resp.description}</h4>
                   <br/>
                </div>
              </div>
            )
          }
        </div>
        <Line />
      </div>
    )
  }
}

export default NewEmployeeHireNextVideosComponent
