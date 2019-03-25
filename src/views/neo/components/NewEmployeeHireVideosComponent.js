import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

import imagesTest from '../../../images/onboarding/thumbnail.jpg'

class NewEmployeeHireVideosComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      neoData,
      selectedVideoFunc,
    } = this.props

    return (
      <div className = { `neo-details-grid-video` }>
      {
        neoData.map((resp, key) =>
          <Card
            onClick = { () => selectedVideoFunc(resp) }
            className = { 'neo-card-details cursor-pointer' }
            key = { key }>
            <div
              style = {{
                width : '100%',
                height : '200px',
                textAlign: 'center',
                justifyContent: 'center',
                display: 'flex',
                margin: 'auto',
                backgroundSize: 'cover',
                backgroundImage:  `url(${imagesTest})`,
              }}
              >
              <div className = { 'margin-auto' }>
                <img
                  width = { 'auto' }
                  height = { 'auto' }
                  src={ require('../../../images/icons/foreground_play_image.png') }/>
              </div>
            </div>
            <div
              style = {{
                 height : '150px',
                 padding: '25px',
                 letterSpacing: '.5px',
               }}>
               <h4 className = { 'font-weight-lighter font-size-15px' }>{resp.description}</h4>
               <br/>
               <h4 className = { 'font-size-13px font-weight-bold' }>13.04 mins</h4>
            </div>
          </Card>
        )
      }
      </div>
    )
  }
}

export default NewEmployeeHireVideosComponent
