import { Progress } from 'react-sweet-progress'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Modal,
  GenericButton,
  CircularLoader,
  Card,
}  from '../../../ub-components/'

class NewEmployeeHireVideosComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      neoData
    } = this.props

    return (
      <div>
        <br/>
        <h4>Recommended Videos</h4>
        <br/>
        <div className = { 'neo-details-grid-video' }>
        {
          neoData.map((resp, key) =>
            <Card
              key = { key }>
              <video 
                  height = { '100%' }
                  width= { '100%' } 
                  controls>
                  <source src={ 'http://techslides.com/demos/sample-videos/small.mp4' } type="video/mp4" />
                  <source src={ 'http://techslides.com/demos/sample-videos/small.mp4' } type="video/ogg" />
                  No Selected Video
                </video>
              <h4>{resp.description}</h4>
            </Card>
          )
        }
        </div>
      </div>
    )
  }
}

export default NewEmployeeHireVideosComponent
