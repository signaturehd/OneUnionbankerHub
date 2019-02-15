import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Card,
  GenericButton,
}  from '../../../ub-components/'

class NewEmployeeHireNextVideosComponent extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    const {
      description,
      title,
    } = this.props

    return (
      <Card style = {{
          color : '#fff',
          backgroundColor: 'rgb(70,70,70)',
          borderRadius: '0px',
        }}>
        <video
          height = { 'unset' }
          width= { '100%' }
          controls>
          <source src={ 'http://techslides.com/demos/sample-videos/small.mp4' } type="video/mp4" />
          <source src={ 'http://techslides.com/demos/sample-videos/small.mp4' } type="video/ogg" />
          No Selected Video
        </video>
        <br/>
        <br/>
        <div
          style = {{
            paddingRight: '20px',
            paddingLeft: '20px',
            display: 'grid',
            gridTemplateColumns: '1fr 0.1fr 0.1fr',
            lineHeight: 'normal',
          }}>
          <h4 className = { 'font-weight-lighter font-size-25px' }>Learn to own your future by knowing more about unionbank</h4>
          <span className = { 'neo-heart-details neo-heart-message text-align-right' }/>
          <span className = { 'neo-heart-details neo-heart-active text-align-right' }/>
        </div>
        <br/>
        <div
          style = {{
            paddingRight: '20px',
            paddingLeft: '20px',
            paddingBottom: '20px',
            backgroundColor: '#fff',
            height: '195px',
        }}>
          <br/>
          <p className = { 'unionbank-color-grey font-size-12px' }>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <br/>
          <center>
            <GenericButton
              className = { 'global-button cursor-pointer profile-buttom-medium' }
              text = { 'TAKE THE ASSESSMENT' }
              onClick = { () => {}}
              />
          </center>
        </div>
      </Card>
    )
  }
}

export default NewEmployeeHireNextVideosComponent
