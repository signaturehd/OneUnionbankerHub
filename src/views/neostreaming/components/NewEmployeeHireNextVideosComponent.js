import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  Line,
  SingleAvatar
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
        <SingleAvatar
          width = { '40px' }
          height = { '40px' }
          fontSize = { '30' }
          backgroundColor = { 'Test Sa' }
          />
      <h4 className = { 'font-weight-bold font-size-20px padding-10px unionbank-color-grey' }>Up Next:</h4>
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
                    borderRadius: '3px',
                    backgroundPosition: 'center center',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    margin: 'auto',
                  }}/>
                <div
                  style = {{
                    padding : '0px 5px 5px 0px',
                    letterSpacing: '.5px',
                   }}>
                   <h4 className = { 'font-weight-900 font-size-13px' }>Employee Engagement</h4>
                   <h4 className = { 'font-weight-lighter unionbank-color-grey font-size-11px' }>{resp.description}</h4>
                   <br/>
                 <div style = {{
                     display : 'inline-flex'
                   }}>
                 </div>
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
